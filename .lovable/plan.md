# Giotas Country House — Build Plan

## Experience
- Build one smooth-scrolling bilingual page with a full-bleed pool arrival, understated sticky navigation, progress indicator, and mobile booking bar.
- Follow the supplied Mediterranean palette and typography exactly: warm off-white, Aegean blue, terracotta, olive, elegant serif headings, clean sans-serif text.
- Use spacious editorial sections, rounded photography, subtle horizon dividers, restrained parallax, reveals, hover zooms, and accessible reduced-motion fallbacks.

## Content and interactions
- Centralize English/Greek copy, links, contact placeholders, optional price, and every image reference in editable data files.
- Add browser-language detection and an EN/ΕΛ toggle covering all visible copy.
- Implement all requested sections in order: hero, highlights and facts, story and hosts, sleeping spaces, pool and garden, amenities, filtered gallery/lightbox, location, reviews, events, booking/enquiry, FAQ, and footer.
- Add working tabs/cards, expandable amenities, gallery filters, keyboard/swipe lightbox, review carousel, counters, date and guest controls, smooth anchor navigation, loading treatment, validation, and enquiry success state.

## Enquiries
- Store direct enquiries securely in Lovable Cloud with a narrowly scoped public submission policy.
- Validate submitted details on both the page and server, with no nightly price hard-coded.

## Technical details
- Use the existing TanStack Start, React, TypeScript, Tailwind, and shadcn setup; add Motion for React for restrained animation.
- Keep imagery locally managed and lazy-loaded outside the first view, while exposing all paths from one media configuration.
- Add route-level title, description, Open Graph and Twitter metadata, canonical URL, plus LodgingBusiness/VacationRental JSON-LD with the supplied rating and registry number.
- Verify rendering and interactions at desktop and mobile sizes, including keyboard access, focus states, overflow, console errors, and enquiry submission behavior.
