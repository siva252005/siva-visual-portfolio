// Contact Section Data
const contact = {
  eyebrow: "START A PROJECT",
  title: "LET'S CREATE SOMETHING WORTH REMEMBERING.",
  description:
    "Have a photo, video or visual story that needs the right treatment? Tell me what you're working on and what you want the final result to feel like.",

  availability: "Available for Freelance Projects",
  responseTime: "RESPONSE WITHIN 24–48 HOURS",

  // Supporting specialization line
  servicesSummary: "Reels · Wedding Films · Brand Promos",

  // Direct contact channels (WhatsApp, Instagram, Email)
  directChannels: [
    {
      id: "whatsapp",
      label: "WhatsApp",
      sublabel: "Quick Chat",
      url: import.meta.env.VITE_WHATSAPP_URL || "https://wa.me/918778523190?text=Hi%20Siva!%20I%20visited%20your%20portfolio%20and%20I'm%20interested%20in%20discussing%20a%20project%20with%20you.",
      icon: "whatsapp"
    },
    {
      id: "instagram",
      label: "Instagram",
      sublabel: "DM & Follow",
      url: import.meta.env.VITE_INSTAGRAM_URL || "https://www.instagram.com/",
      icon: "instagram"
    },
    {
      id: "email",
      label: "Email",
      sublabel: "msdsiva762@gmail.com",
      url: "mailto:msdsiva762@gmail.com",
      icon: "email"
    }
  ],

  // Project Type Dropdown Options (default is placeholder "Select Project Type")
  projectTypes: [
    "Instagram Reel",
    "Wedding Film",
    "Brand Promo",
    "Photo Editing",
    "Event Highlights",
    "Other"
  ],

  // Optional selectable budget ranges in INR
  budgetRanges: [
    "Below ₹500",
    "₹500 – ₹1,000",
    "₹1,000 – ₹2,000",
    "Above ₹2,000"
  ],

  // Optional selectable project durations
  projectDurations: [
    "1–2 Days",
    "3–5 Days",
    "1 Week",
    "2 Weeks",
    "Flexible / Not Sure"
  ]
};

export default contact;
