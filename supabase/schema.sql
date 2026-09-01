-- ==============================================================================
-- LEGALCURE.IN — SUPABASE DATABASE SCHEMA (PHASE 2)
-- Bihar Land & Property Professional Marketplace
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS
DO $$ BEGIN
  CREATE TYPE user_role_enum AS ENUM ('customer', 'professional', 'admin');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE professional_type_enum AS ENUM ('amin', 'deed_writer');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE verification_status_enum AS ENUM ('pending', 'under_review', 'verified', 'rejected', 'suspended');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE document_type_enum AS ENUM ('identity', 'license', 'supporting', 'photo');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- 3. PROFILES TABLE (Linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  user_code VARCHAR(32) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  mobile VARCHAR(20) NOT NULL,
  whatsapp VARCHAR(20),
  email VARCHAR(255),
  role user_role_enum DEFAULT 'customer' NOT NULL,
  avatar_url TEXT,
  district_name VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 4. DISTRICTS TABLE
CREATE TABLE IF NOT EXISTS public.districts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) UNIQUE NOT NULL,
  name_hi VARCHAR(100) NOT NULL,
  division VARCHAR(100),
  active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 5. SUB-REGISTRY OFFICES TABLE
CREATE TABLE IF NOT EXISTS public.sub_registry_offices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  district_id UUID NOT NULL REFERENCES public.districts(id) ON DELETE CASCADE,
  name VARCHAR(150) NOT NULL,
  name_hi VARCHAR(150),
  address TEXT,
  active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  CONSTRAINT unique_sro_per_district UNIQUE(district_id, name)
);

-- 6. REVENUE BLOCKS TABLE
CREATE TABLE IF NOT EXISTS public.blocks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  district_id UUID NOT NULL REFERENCES public.districts(id) ON DELETE CASCADE,
  name VARCHAR(150) NOT NULL,
  name_hi VARCHAR(150),
  active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  CONSTRAINT unique_block_per_district UNIQUE(district_id, name)
);

-- 7. PROFESSIONALS TABLE
CREATE TABLE IF NOT EXISTS public.professionals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  professional_id VARCHAR(32) UNIQUE NOT NULL,
  professional_type professional_type_enum NOT NULL,
  district_id UUID NOT NULL REFERENCES public.districts(id),
  sub_registry_office_id UUID REFERENCES public.sub_registry_offices(id),
  block_id UUID REFERENCES public.blocks(id),
  years_experience INT DEFAULT 1 NOT NULL,
  license_number VARCHAR(100),
  license_authority VARCHAR(150),
  chamber_address TEXT,
  consultation_fee NUMERIC(10, 2) DEFAULT 500.00 NOT NULL,
  token_fee NUMERIC(10, 2) DEFAULT 100.00 NOT NULL,
  about TEXT,
  about_hi TEXT,
  verification_status verification_status_enum DEFAULT 'pending' NOT NULL,
  active BOOLEAN DEFAULT FALSE NOT NULL,
  rating NUMERIC(3, 2) DEFAULT 5.00,
  review_count INT DEFAULT 0,
  total_cases INT DEFAULT 0,
  profile_photo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  -- STRICT LOCATION VALIDATION CONSTRAINT:
  -- Deed Writer must have sub_registry_office_id and NOT block_id
  -- Amin must have block_id and NOT sub_registry_office_id
  CONSTRAINT check_pro_location_exclusivity CHECK (
    (professional_type = 'deed_writer' AND sub_registry_office_id IS NOT NULL AND block_id IS NULL)
    OR
    (professional_type = 'amin' AND block_id IS NOT NULL AND sub_registry_office_id IS NULL)
  )
);

-- 8. SERVICES CATALOG
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(50) UNIQUE NOT NULL,
  name_en VARCHAR(200) NOT NULL,
  name_hi VARCHAR(200) NOT NULL,
  professional_type professional_type_enum NOT NULL,
  description TEXT,
  active BOOLEAN DEFAULT TRUE NOT NULL
);

-- 9. PROFESSIONAL SERVICES JUNCTION
CREATE TABLE IF NOT EXISTS public.professional_services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  professional_id UUID NOT NULL REFERENCES public.professionals(id) ON DELETE CASCADE,
  service_name VARCHAR(200) NOT NULL,
  service_name_hi VARCHAR(200),
  custom_fee NUMERIC(10, 2),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 10. LANGUAGES CATALOG
CREATE TABLE IF NOT EXISTS public.languages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(10) UNIQUE NOT NULL,
  name_en VARCHAR(50) NOT NULL,
  name_hi VARCHAR(50) NOT NULL
);

-- 11. PROFESSIONAL LANGUAGES JUNCTION
CREATE TABLE IF NOT EXISTS public.professional_languages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  professional_id UUID NOT NULL REFERENCES public.professionals(id) ON DELETE CASCADE,
  language_name VARCHAR(50) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 12. PROFESSIONAL AVAILABILITY TABLE
CREATE TABLE IF NOT EXISTS public.professional_availability (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  professional_id UUID NOT NULL REFERENCES public.professionals(id) ON DELETE CASCADE,
  day_of_week VARCHAR(20) NOT NULL,
  start_time VARCHAR(10) NOT NULL,
  end_time VARCHAR(10) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL
);

-- 13. PROFESSIONAL DOCUMENTS TABLE (Private Storage References)
CREATE TABLE IF NOT EXISTS public.professional_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  professional_id UUID NOT NULL REFERENCES public.professionals(id) ON DELETE CASCADE,
  document_type document_type_enum NOT NULL,
  file_path TEXT NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_size BIGINT,
  mime_type VARCHAR(100),
  verification_status verification_status_enum DEFAULT 'pending' NOT NULL,
  uploaded_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 14. BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_number VARCHAR(50) UNIQUE NOT NULL,
  professional_id UUID NOT NULL REFERENCES public.professionals(id),
  customer_id UUID REFERENCES public.profiles(id),
  client_name VARCHAR(255) NOT NULL,
  client_phone VARCHAR(20) NOT NULL,
  client_email VARCHAR(255),
  service_selected VARCHAR(200) NOT NULL,
  district VARCHAR(100) NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time VARCHAR(20) NOT NULL,
  khata_number VARCHAR(50),
  khesra_number VARCHAR(50),
  mauza VARCHAR(100),
  professional_fee NUMERIC(10, 2) NOT NULL,
  token_paid NUMERIC(10, 2) DEFAULT 100.00 NOT NULL,
  remaining_at_office NUMERIC(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'PENDING_PROFESSIONAL' NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.districts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sub_registry_offices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professional_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professional_languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professional_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professional_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- 1. Districts, SROs, Blocks, Services, Languages (Public read)
CREATE POLICY "Public read active districts" ON public.districts FOR SELECT USING (active = true);
CREATE POLICY "Public read active sro" ON public.sub_registry_offices FOR SELECT USING (active = true);
CREATE POLICY "Public read active blocks" ON public.blocks FOR SELECT USING (active = true);
CREATE POLICY "Public read active services" ON public.services FOR SELECT USING (active = true);
CREATE POLICY "Public read languages" ON public.languages FOR SELECT USING (true);

-- 2. Profiles: Users can select/insert/update only their own profile
CREATE POLICY "Users view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 3. Professionals:
-- Public can view ONLY verified & active professionals
CREATE POLICY "Public view verified active pros" ON public.professionals 
  FOR SELECT USING (verification_status = 'verified' AND active = true);

-- Professional owner can view & update their own record
CREATE POLICY "Pros view own record" ON public.professionals 
  FOR SELECT USING (auth.uid() = profile_id);
CREATE POLICY "Pros insert own record" ON public.professionals 
  FOR INSERT WITH CHECK (auth.uid() = profile_id);
CREATE POLICY "Pros update own record" ON public.professionals 
  FOR UPDATE USING (auth.uid() = profile_id);

-- 4. Professional Documents: Private to owner only
CREATE POLICY "Pros view own documents" ON public.professional_documents 
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.professionals p WHERE p.id = professional_documents.professional_id AND p.profile_id = auth.uid())
  );
CREATE POLICY "Pros insert own documents" ON public.professional_documents 
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.professionals p WHERE p.id = professional_documents.professional_id AND p.profile_id = auth.uid())
  );

-- 5. Bookings:
CREATE POLICY "Users view own bookings" ON public.bookings 
  FOR SELECT USING (customer_id = auth.uid() OR EXISTS (
    SELECT 1 FROM public.professionals p WHERE p.id = bookings.professional_id AND p.profile_id = auth.uid()
  ));
CREATE POLICY "Public create booking" ON public.bookings FOR INSERT WITH CHECK (true);
