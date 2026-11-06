TRUETORQUE WEBSITE: QUICK NOTES
================================

Open index.html in a browser to view the site. Keep all files together.

ADD PHOTOS TO THE GALLERY
  1. Put the image in  assets/gallery/
  2. Open gallery-data.js and add one line for it (instructions are at the top of that file).
  Filter buttons are created automatically from the categories you use.

SET THE EXACT LOCATION ON GOOGLE MAPS
  Open contact.html and find the comment above the map (search for "TO SET THE EXACT LOCATION").
  In Google Maps: Share > Embed a map > Copy HTML, then paste the address inside src="..." over the existing one.
  Do the same for the "Open in Google Maps" button (Share > Copy link).

CHANGE THE HERO / FLEET PHOTOS
  Replace  assets/hero-workshop.jpg  (home hero) and  assets/fleet-trucks.jpg  (fleet section)
  with new files of the same name. Larger originals will look sharper.

SERVICES PAGE PHOTOS
  Each service card on services.html shows  assets/services/<name>.jpg  if it exists, otherwise a branded placeholder.
  Add a photo by saving it in assets/services/ with the service's name (landscape, about 1600 x 1000 px):
  servicing, oil-service, brakes, tyres, alignment, suspension, batteries, repairs, spare-parts, fleet
  Already in place: servicing, alignment, fleet. The other seven show the placeholder until you add photos.

VEHICLE LISTS (Oil, Brakes, Suspension, Batteries, Wipers)
  The make/model list is at the top of vehicle.js.

Note: the page files (*.html) were generated; edit text directly in them, or ask for changes to be regenerated.
