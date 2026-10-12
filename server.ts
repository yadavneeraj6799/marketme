/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// In-memory rate limiting / duplicate submission buffer (5 minutes)
interface RecentSubmission {
  phone: string;
  email?: string;
  timestamp: number;
}
const recentSubmissions: RecentSubmission[] = [];
const DUPLICATE_WINDOW_MS = 5 * 60 * 1000; // 5 minutes

// Ensure data directory exists
const DATA_DIR = path.resolve(__dirname, 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(LEADS_FILE)) {
  fs.writeFileSync(LEADS_FILE, JSON.stringify([], null, 2), 'utf-8');
}

// Phone validator: must contain at least 8 digits and match telephone character formats
function isValidPhone(phone: string): boolean {
  if (!phone || typeof phone !== 'string') return false;
  const digitsOnly = phone.replace(/\D/g, '');
  if (digitsOnly.length < 8 || digitsOnly.length > 15) return false;
  return /^[+]?[0-9\s\-().]{8,20}$/.test(phone.trim());
}

// POST /api/leads - Real server submission endpoint
app.post('/api/leads', (req: Request, res: Response): void => {
  const {
    name,
    businessName,
    email,
    phone,
    website,
    businessType,
    objective,
    currentChannels,
    businessProblem,
    selectedService,
    budgetRange,
    notes,
    source,
    utmSource,
    utmMedium,
    utmCampaign,
  } = req.body;

  // 1. Mandatory Field Validation
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    res.status(400).json({
      success: false,
      error: 'Please provide your name.',
      field: 'name',
    });
    return;
  }

  if (!phone || !isValidPhone(phone)) {
    res.status(400).json({
      success: false,
      error: 'Please provide a valid contact number (at least 8-10 digits).',
      field: 'phone',
    });
    return;
  }

  // Optional email format check
  if (email && typeof email === 'string' && email.trim().length > 0) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.',
        field: 'email',
      });
      return;
    }
  }

  const cleanPhone = phone.replace(/\D/g, '');
  const cleanEmail = (email || '').trim().toLowerCase();
  const now = Date.now();

  // 2. Duplicate Submission Check
  // Clean expired submissions
  const activeSubmissions = recentSubmissions.filter(
    (item) => now - item.timestamp < DUPLICATE_WINDOW_MS
  );
  recentSubmissions.length = 0;
  recentSubmissions.push(...activeSubmissions);

  const isDuplicate = recentSubmissions.some((item) => {
    const phoneMatch = item.phone === cleanPhone;
    const emailMatch = cleanEmail && item.email && item.email === cleanEmail;
    return phoneMatch || emailMatch;
  });

  if (isDuplicate) {
    res.status(429).json({
      success: false,
      error: 'We have already received an audit request with this contact details in the last 5 minutes. Our team is already on it!',
      duplicate: true,
    });
    return;
  }

  // Record submission for rate limiting
  recentSubmissions.push({
    phone: cleanPhone,
    email: cleanEmail || undefined,
    timestamp: now,
  });

  // 3. Create Clean Lead Record (Never storing unselected/invented defaults)
  const leadId = `lead_${now}_${Math.random().toString(36).substring(2, 7)}`;
  const createdAt = new Date().toISOString();

  const newLead = {
    leadId,
    name: name.trim(),
    businessName: (businessName || '').trim() || undefined,
    email: cleanEmail || undefined,
    phone: phone.trim(),
    website: (website || '').trim() || undefined,
    businessType: businessType || undefined,
    objective: objective || undefined,
    currentChannels: Array.isArray(currentChannels) ? currentChannels : undefined,
    businessProblem: businessProblem || undefined,
    selectedService: selectedService || undefined,
    budgetRange: budgetRange || undefined, // Only store if user explicitly provided
    notes: (notes || '').trim() || undefined,
    source: source || 'website',
    utmSource: utmSource || undefined,
    utmMedium: utmMedium || undefined,
    utmCampaign: utmCampaign || undefined,
    createdAt,
  };

  // 4. Save to Persistent Local Store
  try {
    let existingLeads: unknown[] = [];
    if (fs.existsSync(LEADS_FILE)) {
      const content = fs.readFileSync(LEADS_FILE, 'utf-8');
      existingLeads = JSON.parse(content || '[]');
    }
    existingLeads.push(newLead);
    fs.writeFileSync(LEADS_FILE, JSON.stringify(existingLeads, null, 2), 'utf-8');
  } catch (err) {
    console.error('[Server] Failed to write lead to leads.json:', err);
    // Still proceed as lead was received
  }

  console.log(`[Server] Lead ${leadId} accepted from ${newLead.name} (${newLead.phone}) for ${newLead.selectedService || 'General Audit'}`);

  res.status(201).json({
    success: true,
    lead: newLead,
    message: 'Your marketing audit request has been confirmed and logged.',
  });
});

// GET /api/health - Endpoint to check server status
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'MarketMe Backend',
    timestamp: new Date().toISOString(),
  });
});

// Start Express Server with Vite Dev Server in development or Static in production
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`[MarketMe] Server running on http://localhost:${PORT}`);
  });
}

startServer();
