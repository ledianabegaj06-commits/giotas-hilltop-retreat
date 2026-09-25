# Giota's Hilltop Haven

Build a modern, elegant, high-converting single-page website (with smooth anchor navigation) for a private holiday guesthouse called "Giotas Country House" (Εξοχικό σπίτι Giotas), located in Varnavas, Attica, Greece, about 30 km from Athens. The site should feel like a boutique hospitality brand: warm, calm, premium, and personal, not like a generic template.

## Tech and quality

- React + TypeScript + Tailwind + shadcn/ui, with Framer Motion for subtle scroll-reveal animations.

- Mobile-first and fully responsive. Fast loading, lazy-loaded images, accessible (proper contrast, alt text, keyboard navigation, visible focus states).

- Bilingual: English and Greek with a language toggle in the nav (EN | ΕΛ). Auto-detect the browser language, fall back to English. Put all copy in a simple i18n dictionary so it's easy to edit.

- SEO: proper title and meta description, Open Graph tags, and JSON-LD structured data (VacationRental/LodgingBusiness) with the rating 4.99 from 100 reviews.

- Support light mode only. Keep the design clean and uncluttered.

## Design direction

- Mood: sun-drenched Mediterranean hilltop retreat with a sea view. Quiet luxury, natural materials, lots of white space.

- Palette: warm sand/off-white background (#FAF6F0), deep Aegean blue (#1F4E6B) as the primary color, terracotta/sunset accent (#C8734A), olive green as a secondary accent, soft charcoal text.

- Typography: an elegant serif for headings (Fraunces or Cormorant Garamond) paired with a clean sans-serif for body text (Inter or DM Sans).

- Details: large rounded image corners, soft shadows, a glass-blur sticky navbar that appears after scrolling past the hero, subtle parallax on the hero, image hover zooms, and a tasteful wave/horizon divider motif between sections.

- Use placeholder image slots with tasteful Unsplash-style Mediterranean/pool/garden/sea-view stock photos for now, structured so I can easily swap in my own photos later (put all image URLs in one config file).

## Sections (in order)

1. **Hero**: full-bleed image of the pool with a view of the Evian Gulf. Headline: "Your private hilltop escape, 30 km from Athens". Subheadline: "A quiet guesthouse with your own private pool, a sprawling garden, and sea views over the Evian Gulf." Primary CTA "Check availability" (scrolls to the booking section), secondary CTA "See the space". Add a floating badge: "★ 4.99 · 100 reviews · Guest Favourite on Airbnb (top 10% of homes)".

2. **Quick facts strip**: icon row with: Up to 6 guests · 2 bedrooms · Private pool · Sea view · Pet-friendly · Free parking · Wi-Fi · Air conditioning.

3. **The Story / About**: short, warm copy. Ideal for a family with up to 3 children. A quiet, safe setting. Large private pool exclusively for guests. Big garden. Hosted by a friendly couple, Tony (Antonis) and Giota, who live in the house above the guesthouse, so privacy and friendliness are both guaranteed. Include a small hosts card with a friendly portrait placeholder and "Speaks Greek & English · Replies within an hour".

4. **The Space / Where you'll sleep**: an interactive, visual layout. Use three cards or a tabbed view:

   - Main bedroom: double bed, air conditioning, TV, handmade modern chest of drawers.

   - Living room: a double bed and a sofa that converts into a double bed, plus a fully equipped kitchen.

   - Separate outdoor room: a double bed.

   Also mention: 1 bathroom, HDTV 32", fully equipped kitchen. Each card has an image placeholder and a bed icon.

5. **Pool & Garden** (highlight section, large imagery): the private outdoor pool is a long lap-style pool suitable for swimming and pool games, available seasonally and accessible 24 hours a day. The garden and the area in front of the guesthouse are exclusively for guests. Mention the garden foosball table and the sea view. Include a small, honest safety note: "The pool is not fenced or locked and there is a play/climbing structure on the property. Please supervise children at all times."

6. **Amenities**: a clean icon grid grouped into categories (Outdoors, Inside, Comfort, Safety). Include: garden view, bay/sea view, kitchen, Wi-Fi, free on-site parking, private outdoor pool, pets allowed, HDTV, air conditioning, outdoor security cameras on the property, pool toys/games, play structure. Add a "Show all amenities" expandable.

7. **Gallery**: a masonry grid with a fullscreen lightbox (keyboard and swipe navigation), with filter chips: All / Pool / Garden / Interior / Views.

8. **Location & Around**: stylised map card (embed a Google Map or OpenStreetMap iframe centered on Varnavas, Attica, with a note that the exact address is shared after booking). The house sits on a hilltop with views of the Evian Gulf and Euboea. Nearby highlights: Varnavas beach about 15 minutes by car, scenic hiking trails close to the house, about 30 km from Athens. Add a small "distance from the house" list. Add a line: "Our hosts happily recommend their favourite local restaurants and hidden spots."

9. **Guest Reviews**: overall 4.99/5 from 100 reviews with a rating distribution bar chart (5★ 99%, 4★ 1%), and category scores: Cleanliness 5.0, Accuracy 5.0, Check-in 5.0, Communication 5.0, Location 5.0, Value 4.9. Add "What guests mention most" chips: Hospitality, Pool, Views, Location, Cleanliness, Family. Include an auto-scrolling/swipeable testimonial carousel with these real guest quotes (translate to English, keep the guest first names, and label them "via Airbnb"):

   - Catherine (Aug 2026): Tony and Giota were incredibly friendly and recommended wonderful places and restaurants. The house was amazing, the pool was used daily, and the view was incredible. "We created some truly magical memories."

   - Marc (Aug 2026): Exceptional hospitality, warm and attentive hosts, decorated with great attention to detail, fantastic view and excellent pool.

   - Joanna (Aug 2026): Absolutely wonderful hosts from start to finish, made us feel completely at home.

   - Styliani (Aug 2025): Everything was flawless. "It's no accident you can't easily find a booking." The garden with the pool and foosball table were the highlight.

   - Myrto (Sep 2024): Hosted her daughter's birthday party and everyone left thrilled; the hosts had thought of everything.

   Add a "Read all 100 reviews on Airbnb" link button.

10. **Events**: a small section: "Celebrate with us." Small day events (birthdays, gatherings) can be arranged by agreement for an additional cost for the extra guests. CTA: "Ask about an event."

11. **Booking / Availability**: a clean card with a date-range picker (check-in / check-out), a guest selector (max 6), and two actions: (a) a primary "Book on Airbnb" button linking to [AIRBNB_LISTING_URL], and (b) a "Send a direct enquiry" form (name, email, phone, dates, number of guests, message) with validation and a success state. Wire the form to Lovable Cloud/Supabase to store enquiries, with a placeholder to email them to [HOST_EMAIL]. Show the house essentials next to it: Check-in 15:00–21:00, check-out before 12:00, max 6 guests, flexible cancellation with free cancellation on many dates (see the booking terms), pets allowed. Do NOT hard-code nightly prices. Add an optional config constant for a "from €X / night" line that stays hidden until I set it.

12. **FAQ** (accordion): How far is it from Athens? Is the pool private? Is it suitable for young children? Are pets allowed? Can we host a small event? What time is check-in and check-out? Is parking available? How do I book?

13. **Footer**: logo/wordmark, short tagline, quick links, language toggle, contact placeholders ([PHONE], [HOST_EMAIL]), Instagram placeholder, and the legal line "Registration number (Greek short-term rental registry): 00002419157". Add a "Listed on Airbnb" link.

## Extra polish

- A sticky bottom "Check availability" button on mobile.

- A subtle animated stat counter for the rating and review count.

- A "Why guests love it" 3-card highlight row right after the hero (Private pool · Sea views · Hosts who care).

- Smooth-scroll, a scroll-progress bar, and a tasteful loading state.

- Keep all editable content (text, image URLs, links, contact details) centralized in config/data files so non-developers can update the site easily.

Write polished, natural copy in both English and Greek (not literal machine translation), and keep the tone warm, welcoming, and understated.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a4e80026-f197-4c0b-abcb-3043aefd5227).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
