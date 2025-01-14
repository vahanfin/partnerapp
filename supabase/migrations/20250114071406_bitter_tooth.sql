/*
  # Initial Schema Setup for Challan Bidding System

  1. New Tables
    - users: Store user information
    - partners: Store partner information
    - challans: Store challan details
    - bids: Store bidding information
    - transactions: Store payment transactions
    - notifications: Store user notifications

  2. Security
    - Enable RLS on all tables
    - Add policies for data access
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  phone TEXT UNIQUE,
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Partners table
CREATE TABLE IF NOT EXISTS partners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  phone TEXT UNIQUE,
  company_name TEXT NOT NULL,
  states TEXT[] NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Challans table
CREATE TABLE IF NOT EXISTS challans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  challan_number TEXT UNIQUE NOT NULL,
  vehicle_number TEXT NOT NULL,
  state TEXT NOT NULL,
  amount DECIMAL NOT NULL,
  violation_date TIMESTAMPTZ NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Bids table
CREATE TABLE IF NOT EXISTS bids (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  challan_id UUID REFERENCES challans(id),
  partner_id UUID REFERENCES partners(id),
  bid_amount DECIMAL NOT NULL,
  service_charge DECIMAL NOT NULL,
  total_amount DECIMAL NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bid_id UUID REFERENCES bids(id),
  user_id UUID REFERENCES users(id),
  amount DECIMAL NOT NULL,
  payment_method TEXT NOT NULL,
  razorpay_payment_id TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE challans ENABLE ROW LEVEL SECURITY;
ALTER TABLE bids ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Partners can view own data" ON partners
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Partners can view challans in their states" ON challans
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM partners
      WHERE partners.id = auth.uid()
      AND state = ANY(partners.states)
    )
  );

CREATE POLICY "Partners can create bids" ON bids
  FOR INSERT WITH CHECK (
    partner_id = auth.uid()
  );

CREATE POLICY "Users can view their transactions" ON transactions
  FOR SELECT USING (
    user_id = auth.uid()
  );

CREATE POLICY "Users can view their notifications" ON notifications
  FOR SELECT USING (
    user_id = auth.uid()
  );