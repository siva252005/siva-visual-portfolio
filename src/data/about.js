// About Section Data
const about = {
  eyebrow: "ABOUT ME",
  titlePart1: "CREATIVE EYE,",
  titleAccent1: "VISUAL",
  titleAccent2: "STORYTELLER.",
  titleAccent: "VISUAL STORYTELLER.",
  introduction:
    "I’m Siva, a photographer and photo/video editor based in Coimbatore. For 4+ years, I’ve turned raw footage into Instagram reels, wedding films, brand promos, and cinematic edits, with strong color grading, trending reel styles, and emotional storytelling.",

  // Clean 3-column stats row
  stats: [
    {
      id: "experience",
      value: "4+",
      label: "Years of Experience"
    },
    {
      id: "videos",
      value: "200+",
      label: "Videos Delivered"
    },
    {
      id: "turnaround",
      value: "Fast",
      label: "Quick Turnaround"
    }
  ],

  // Inline services tags
  servicesLabel: "SERVICES",
  services: [
    {
      id: "photography",
      title: "Photography",
      icon: "camera"
    },
    {
      id: "photo-editing",
      title: "Photo Editing",
      icon: "image"
    },
    {
      id: "video-editing",
      title: "Video Editing",
      icon: "video"
    }
  ],

  // Tools panel
  toolsHeading: "TOOLS I USE",
  tools: [
    { id: "lightroom", name: "Lightroom" },
    { id: "photoshop", name: "Photoshop" },
    { id: "premiere", name: "Premiere Pro" },
    { id: "davinci", name: "DaVinci Resolve" },
    { id: "capcut", name: "CapCut" }
  ],

  // Compact bottom status bar
  metaBar: {
    location: "Coimbatore, Tamil Nadu, India",
    focus: "Photo + Video",
    status: "Available for Freelance Projects"
  },

  // Retain legacy fields for backward compatibility
  location: "Coimbatore, Tamil Nadu, India",
  availability: "Available for Freelance Projects",

  // Image assets (optimized multi-format responsive delivery: AVIF, WebP, progressive JPEG)
  image: "/assets/images/profile/1757828030248-optimized.jpeg",
  imageWebp: "/assets/images/profile/1757828030248-680w.webp",
  imageAvifSrcSet: "/assets/images/profile/1757828030248-340w.avif 340w, /assets/images/profile/1757828030248-680w.avif 680w, /assets/images/profile/1757828030248-1020w.avif 1020w",
  imageSrcSet: "/assets/images/profile/1757828030248-340w.webp 340w, /assets/images/profile/1757828030248-680w.webp 680w, /assets/images/profile/1757828030248-1020w.webp 1020w",
  imageSizes: "(max-width: 480px) 250px, (max-width: 768px) 290px, 340px",

  // Overlapping secondary portrait thumbnail (lightweight dedicated assets)
  overlapImage: "/assets/images/profile/1757828030248-overlap-280w.webp",
  overlapAvifSrcSet: "/assets/images/profile/1757828030248-overlap-140w.avif 140w, /assets/images/profile/1757828030248-overlap-280w.avif 280w",
  overlapSrcSet: "/assets/images/profile/1757828030248-overlap-140w.webp 140w, /assets/images/profile/1757828030248-overlap-280w.webp 280w",
  overlapSizes: "(max-width: 480px) 88px, (max-width: 768px) 105px, 125px"
};

export default about;
