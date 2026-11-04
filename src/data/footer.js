// Footer Section Data
const footer = {
  brand: "SIVA.",
  tagline: "PHOTO / VIDEO / VISUAL STORYTELLING",
  statement: "VISUALS WITH INTENTION.",

  // Navigation matching main navbar exactly
  navigation: [
    { label: "Home", href: "#home" },
    { label: "Photo Editing", href: "#photo-editing" },
    { label: "Before & After", href: "#before-after" },
    { label: "Video Editing", href: "#video" },
    { label: "Process", href: "#process" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" }
  ],

  // Connect channels (Instagram, WhatsApp, Email)
  connect: [
    {
      id: "instagram",
      label: "Instagram",
      url: import.meta.env.VITE_INSTAGRAM_URL || "https://www.instagram.com/siva_.official___/",
      icon: "instagram"
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      url: import.meta.env.VITE_WHATSAPP_URL || "https://wa.me/918778523190?text=Hi%20Siva!%20I%20visited%20your%20portfolio%20and%20I'm%20interested%20in%20discussing%20a%20project%20with%20you.",
      icon: "whatsapp"
    },
    {
      id: "email",
      label: "Email",
      url: "mailto:msdsiva762@gmail.com",
      icon: "email"
    }
  ],

  availability: "Available for Freelance Projects",
  location: "Coimbatore, Tamil Nadu, India",

  copyright: "© 2026 SIVA. ALL RIGHTS RESERVED."
};

export default footer;
