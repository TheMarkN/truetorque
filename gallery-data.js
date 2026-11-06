/*
  TRUETORQUE GALLERY: HOW TO ADD PHOTOS
  --------------------------------------------------------------
  1. Put the image file in the  assets/gallery/  folder
     (JPG or WebP, around 1600px on the long side is plenty).
  2. Add one line to the list below, for example:

       { src: "assets/gallery/new-brake-service.jpg",
         title: "Brake service in progress",
         category: "Brakes" },

  3. Save. It appears on the Gallery page straight away, and a
     filter button for its category is created automatically.

  Tips
  - "category" can be anything: Workshop, Tyres, Brakes, Fleet, Team...
    Photos with the same category are grouped under one filter button.
  - Newest photos can go at the top of the list to show first.
  - Keep "alt" short and descriptive; it helps accessibility and Google.
*/
window.GALLERY = [
  {
    src: "assets/alignment-lift.jpg",
    title: "Wheel alignment on the lift",
    category: "Workshop",
    alt: "A vehicle raised on a two-post lift in the TrueTorque workshop for wheel alignment"
  },
  {
    src: "assets/fleet-trucks.jpg",
    title: "Fleet solutions",
    category: "Fleet",
    alt: "A line of white trucks parked in a container yard"
  }
  // Add new photos below this line, separated by commas.
];
