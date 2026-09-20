CREATE TABLE public.enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 100),
  email text NOT NULL CHECK (char_length(email) BETWEEN 5 AND 254),
  phone text CHECK (phone IS NULL OR char_length(phone) <= 40),
  check_in date NOT NULL,
  check_out date NOT NULL,
  guests integer NOT NULL CHECK (guests BETWEEN 1 AND 6),
  message text CHECK (message IS NULL OR char_length(message) <= 2000),
  locale text NOT NULL DEFAULT 'en' CHECK (locale IN ('en', 'el')),
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT enquiries_valid_dates CHECK (check_out > check_in)
);
GRANT INSERT ON public.enquiries TO anon, authenticated;
GRANT ALL ON public.enquiries TO service_role;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can submit enquiries"
ON public.enquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(name) BETWEEN 2 AND 100
  AND char_length(email) BETWEEN 5 AND 254
  AND guests BETWEEN 1 AND 6
  AND check_out > check_in
  AND locale IN ('en', 'el')
);