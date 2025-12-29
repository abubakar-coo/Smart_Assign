import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://chxrllkuzxyuzpnxixsg.supabase.co'
// Using anon key for client-side operations
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNoeHJsbGt1enh5dXpwbnhpeHNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzMDk5ODgsImV4cCI6MjA3Mzg4NTk4OH0.nilTaGYifwid5FIsvmBadLXTOpCHCPZdsSHbTnj2ffE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database configuration
export const DB_CONFIG = {
  url: 'postgresql://postgres:83e-J29StR*vFpH@db.chxrllkuzxyuzpnxixsg.supabase.co:5432/postgres',
  password: '83e-J29StR*vFpH',
  bucket: 'cv-files'
}

// S3/Supabase Storage configuration
export const STORAGE_CONFIG = {
  bucket: 'cv-files',
  folder: 'applications'
}
