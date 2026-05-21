-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create audits table
CREATE TABLE IF NOT EXISTS audits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    team_size INTEGER NOT NULL,
    company_name TEXT,
    email TEXT,
    tools_data JSONB NOT NULL,
    savings_data JSONB,
    ai_summary TEXT
);

-- Enable Row Level Security
ALTER TABLE audits ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert an audit request
CREATE POLICY "Allow anonymous inserts to audits"
ON audits
FOR INSERT
TO anon
WITH CHECK (true);

-- Policy: Allow anyone to read an audit by ID
CREATE POLICY "Allow public read of audits by id"
ON audits
FOR SELECT
TO anon
USING (true);
