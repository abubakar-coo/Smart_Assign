-- Supabase Database Setup for Smart Assign
-- Run these commands in your Supabase SQL editor

-- 1. Create job_applications table
CREATE TABLE IF NOT EXISTS job_applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    position VARCHAR(255) NOT NULL,
    country VARCHAR(100),
    experience TEXT,
    skills TEXT,
    cover_letter TEXT,
    cv_file_url TEXT,
    cv_file_name VARCHAR(255),
    payment_screenshot_url TEXT,
    payment_screenshot_name VARCHAR(255),
    payment_method VARCHAR(100),
    wallet_address TEXT,
    network VARCHAR(50),
    coin VARCHAR(50),
    transaction_id VARCHAR(255),
    source VARCHAR(50) NOT NULL DEFAULT 'careers-page',
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'accepted', 'rejected', 'confirmed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create contact_inquiries table
CREATE TABLE IF NOT EXISTS contact_inquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    source VARCHAR(50) NOT NULL DEFAULT 'contact-form',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create email_subscriptions table
CREATE TABLE IF NOT EXISTS email_subscriptions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_job_applications_email ON job_applications(email);
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON job_applications(status);
CREATE INDEX IF NOT EXISTS idx_job_applications_applied_at ON job_applications(applied_at);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_email ON contact_inquiries(email);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_submitted_at ON contact_inquiries(submitted_at);
CREATE INDEX IF NOT EXISTS idx_email_subscriptions_email ON email_subscriptions(email);

-- 5. Enable Row Level Security (RLS)
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_subscriptions ENABLE ROW LEVEL SECURITY;

-- 6. Create policies for public access (adjust as needed for your security requirements)
CREATE POLICY "Allow public insert on job_applications" ON job_applications
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public insert on contact_inquiries" ON contact_inquiries
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public insert on email_subscriptions" ON email_subscriptions
    FOR INSERT WITH CHECK (true);

-- 7. Create storage bucket for CV files
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types) 
VALUES ('cv-files', 'cv-files', true, 52428800, ARRAY['application/pdf', 'image/jpeg', 'image/png', 'image/gif', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'])
ON CONFLICT (id) DO NOTHING;

-- 8. Create storage policies for file uploads
CREATE POLICY "Allow public uploads to cv-files bucket" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'cv-files');

CREATE POLICY "Allow public access to cv-files bucket" ON storage.objects
    FOR SELECT USING (bucket_id = 'cv-files');

CREATE POLICY "Allow public updates to cv-files bucket" ON storage.objects
    FOR UPDATE USING (bucket_id = 'cv-files');

CREATE POLICY "Allow public deletes to cv-files bucket" ON storage.objects
    FOR DELETE USING (bucket_id = 'cv-files');

-- 9. Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 10. Create trigger for job_applications table
CREATE TRIGGER update_job_applications_updated_at 
    BEFORE UPDATE ON job_applications 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 11. Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
