/**
 * CHAMBERS — Supabase connection
 * -----------------------------------------------------------------
 * This file connects the website and admin dashboard to the Supabase
 * database. The key below is the "anon public" key — it is SAFE to
 * have in public website code (it cannot delete your project or see
 * secret data), so there's no risk in this file being visible.
 * -----------------------------------------------------------------
 */
const SUPABASE_URL = "https://ymbnmfkohuwvkvqypzbc.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltYm5tZmtvaHV3dmt2cXlwemJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkyMDExMTAsImV4cCI6MjEwNDc3NzExMH0.7BKl6A_HsQ4gYqIpBmfXfS7DehIl1-SfSiyZjisLc1U";

const chambersDB = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
