export type CollegeTier = "elite" | "premier" | "emerging";
export type OwnershipType = "Government" | "Private" | "Deemed";

export interface IndiaCollegeRaw {
  id: string;
  name: string;
  city: string;
  state: string;
  type: OwnershipType;
  courses: string[]; // degree ids from india-degrees.ts
  examsAccepted: string[]; // exam ids from india-exams.ts
  feeRange: string; // illustrative, approximate
  tier: CollegeTier;
  blurb: string;
}

// A curated, hand-picked set of real, well-known Indian institutions per
// course. This is NOT an exhaustive live scrape of every university and
// college in the country — that isn't something that can be reliably
// produced or verified in one sitting. It's a solid, extensible seed dataset
// that the backend serves through real API routes; swap or extend it with a
// verified data source whenever you're ready to go further.
export const INDIA_COLLEGES: IndiaCollegeRaw[] = [
  // ── Engineering (B.Tech) ──
  { id: "iit-bombay", name: "IIT Bombay", city: "Mumbai", state: "Maharashtra", type: "Government", courses: ["btech"], examsAccepted: ["jee-advanced"], feeRange: "₹2L – ₹2.5L / year", tier: "elite", blurb: "India's most sought-after engineering institute, strong across every branch." },
  { id: "iit-delhi", name: "IIT Delhi", city: "New Delhi", state: "Delhi", type: "Government", courses: ["btech"], examsAccepted: ["jee-advanced"], feeRange: "₹2L – ₹2.5L / year", tier: "elite", blurb: "Top-tier IIT with excellent CS, EE and startup ecosystem." },
  { id: "iit-madras", name: "IIT Madras", city: "Chennai", state: "Tamil Nadu", type: "Government", courses: ["btech"], examsAccepted: ["jee-advanced"], feeRange: "₹2L – ₹2.5L / year", tier: "elite", blurb: "Renowned for research output and its data science program." },
  { id: "iit-kanpur", name: "IIT Kanpur", city: "Kanpur", state: "Uttar Pradesh", type: "Government", courses: ["btech"], examsAccepted: ["jee-advanced"], feeRange: "₹2L – ₹2.5L / year", tier: "elite", blurb: "Strong core engineering and aerospace programs." },
  { id: "iit-kharagpur", name: "IIT Kharagpur", city: "Kharagpur", state: "West Bengal", type: "Government", courses: ["btech"], examsAccepted: ["jee-advanced"], feeRange: "₹2L – ₹2.5L / year", tier: "elite", blurb: "India's oldest IIT with the widest range of departments." },
  { id: "iit-roorkee", name: "IIT Roorkee", city: "Roorkee", state: "Uttarakhand", type: "Government", courses: ["btech", "barch"], examsAccepted: ["jee-advanced"], feeRange: "₹2L – ₹2.5L / year", tier: "elite", blurb: "Strong civil, architecture and core engineering legacy." },
  { id: "nit-trichy", name: "NIT Tiruchirappalli", city: "Tiruchirappalli", state: "Tamil Nadu", type: "Government", courses: ["btech"], examsAccepted: ["jee-main"], feeRange: "₹1.5L – ₹1.8L / year", tier: "premier", blurb: "Consistently the top-ranked NIT with strong placements." },
  { id: "nit-surathkal", name: "NIT Karnataka, Surathkal", city: "Surathkal", state: "Karnataka", type: "Government", courses: ["btech"], examsAccepted: ["jee-main"], feeRange: "₹1.5L – ₹1.8L / year", tier: "premier", blurb: "Coastal campus with strong CS and IT placements." },
  { id: "nit-warangal", name: "NIT Warangal", city: "Warangal", state: "Telangana", type: "Government", courses: ["btech"], examsAccepted: ["jee-main"], feeRange: "₹1.5L – ₹1.8L / year", tier: "premier", blurb: "One of the oldest and most respected NITs." },
  { id: "bits-pilani", name: "BITS Pilani", city: "Pilani", state: "Rajasthan", type: "Private", courses: ["btech"], examsAccepted: ["bitsat"], feeRange: "₹5L – ₹6L / year", tier: "premier", blurb: "Flexible curriculum, strong industry connect, no reservation-based admission." },
  { id: "vit-vellore", name: "VIT Vellore", city: "Vellore", state: "Tamil Nadu", type: "Private", courses: ["btech"], examsAccepted: ["viteee"], feeRange: "₹2L – ₹2.5L / year", tier: "premier", blurb: "Large private university known for placements and global exchange programs." },
  { id: "srm-chennai", name: "SRM Institute of Science and Technology", city: "Chennai", state: "Tamil Nadu", type: "Private", courses: ["btech"], examsAccepted: ["srmjeee"], feeRange: "₹2L – ₹3L / year", tier: "premier", blurb: "Well-resourced private campus with a wide range of specializations." },
  { id: "rvce-bangalore", name: "RV College of Engineering", city: "Bangalore", state: "Karnataka", type: "Private", courses: ["btech"], examsAccepted: ["comedk", "kcet"], feeRange: "₹2L – ₹2.5L / year", tier: "premier", blurb: "One of Karnataka's most reputed engineering colleges." },
  { id: "bmsce-bangalore", name: "BMS College of Engineering", city: "Bangalore", state: "Karnataka", type: "Private", courses: ["btech"], examsAccepted: ["comedk", "kcet"], feeRange: "₹1.8L – ₹2.2L / year", tier: "premier", blurb: "Long-standing, well-regarded engineering college in Bangalore." },
  { id: "pes-university", name: "PES University", city: "Bangalore", state: "Karnataka", type: "Private", courses: ["btech"], examsAccepted: ["comedk"], feeRange: "₹4L – ₹5L / year", tier: "premier", blurb: "Modern campus popular for CS and strong internship culture." },
  { id: "manipal-institute", name: "Manipal Institute of Technology", city: "Manipal", state: "Karnataka", type: "Private", courses: ["btech"], examsAccepted: ["comedk"], feeRange: "₹4.5L – ₹5.5L / year", tier: "premier", blurb: "Large residential campus with strong international exposure." },
  { id: "thapar-institute", name: "Thapar Institute of Engineering and Technology", city: "Patiala", state: "Punjab", type: "Private", courses: ["btech"], examsAccepted: ["jee-main"], feeRange: "₹3.5L – ₹4.5L / year", tier: "premier", blurb: "North India's leading private engineering institute." },
  { id: "coep-pune", name: "College of Engineering, Pune (COEP)", city: "Pune", state: "Maharashtra", type: "Government", courses: ["btech"], examsAccepted: ["mhtcet", "jee-main"], feeRange: "₹1L – ₹1.5L / year", tier: "premier", blurb: "One of Asia's oldest engineering institutes." },
  { id: "vjti-mumbai", name: "VJTI Mumbai", city: "Mumbai", state: "Maharashtra", type: "Government", courses: ["btech"], examsAccepted: ["mhtcet", "jee-main"], feeRange: "₹1L – ₹1.3L / year", tier: "premier", blurb: "Highly regarded government engineering college in Mumbai." },
  { id: "dtu-delhi", name: "Delhi Technological University", city: "New Delhi", state: "Delhi", type: "Government", courses: ["btech"], examsAccepted: ["jee-main"], feeRange: "₹1.5L – ₹2L / year", tier: "premier", blurb: "Delhi's top state-run engineering university." },
  { id: "nsut-delhi", name: "Netaji Subhas University of Technology", city: "New Delhi", state: "Delhi", type: "Government", courses: ["btech"], examsAccepted: ["jee-main"], feeRange: "₹1.5L – ₹2L / year", tier: "premier", blurb: "Strong placements, centrally located Delhi state university." },
  { id: "jain-university", name: "Jain (Deemed-to-be University)", city: "Bangalore", state: "Karnataka", type: "Deemed", courses: ["btech", "bba", "bcom", "bca"], examsAccepted: ["comedk", "cuet"], feeRange: "₹1.5L – ₹3L / year", tier: "emerging", blurb: "Multi-disciplinary campus with a broad range of programs." },
  { id: "lpu-punjab", name: "Lovely Professional University", city: "Phagwara", state: "Punjab", type: "Private", courses: ["btech", "bba", "bcom", "law", "bca"], examsAccepted: ["cuet"], feeRange: "₹1.5L – ₹2.5L / year", tier: "emerging", blurb: "One of India's largest private universities with wide course variety." },

  // ── Medical (MBBS / BDS / B.Pharm) ──
  { id: "aiims-delhi", name: "AIIMS Delhi", city: "New Delhi", state: "Delhi", type: "Government", courses: ["mbbs"], examsAccepted: ["neet-ug"], feeRange: "₹1,600 / year", tier: "elite", blurb: "India's most prestigious medical institute." },
  { id: "jipmer", name: "JIPMER Puducherry", city: "Puducherry", state: "Puducherry", type: "Government", courses: ["mbbs"], examsAccepted: ["neet-ug"], feeRange: "₹5k – ₹10k / year", tier: "elite", blurb: "Top-ranked medical institute and hospital in South India." },
  { id: "mamc-delhi", name: "Maulana Azad Medical College", city: "New Delhi", state: "Delhi", type: "Government", courses: ["mbbs"], examsAccepted: ["neet-ug"], feeRange: "₹15k – ₹25k / year", tier: "premier", blurb: "One of Delhi's leading government medical colleges." },
  { id: "cmc-vellore", name: "Christian Medical College, Vellore", city: "Vellore", state: "Tamil Nadu", type: "Private", courses: ["mbbs"], examsAccepted: ["neet-ug"], feeRange: "₹50k – ₹1.5L / year", tier: "elite", blurb: "Historic, highly respected private medical college and hospital." },
  { id: "kmc-manipal", name: "Kasturba Medical College, Manipal", city: "Manipal", state: "Karnataka", type: "Private", courses: ["mbbs", "bds"], examsAccepted: ["neet-ug"], feeRange: "₹20L – ₹25L / year", tier: "premier", blurb: "Well-established private medical college under MAHE." },
  { id: "kgmu-lucknow", name: "King George's Medical University", city: "Lucknow", state: "Uttar Pradesh", type: "Government", courses: ["mbbs", "bds"], examsAccepted: ["neet-ug"], feeRange: "₹15k – ₹25k / year", tier: "premier", blurb: "Large, long-established government medical university." },
  { id: "bmc-bangalore", name: "Bangalore Medical College and Research Institute", city: "Bangalore", state: "Karnataka", type: "Government", courses: ["mbbs"], examsAccepted: ["neet-ug"], feeRange: "₹10k – ₹20k / year", tier: "premier", blurb: "Leading government medical college in Karnataka." },
  { id: "ict-mumbai", name: "Institute of Chemical Technology", city: "Mumbai", state: "Maharashtra", type: "Government", courses: ["bpharm"], examsAccepted: ["mhtcet"], feeRange: "₹1L – ₹1.5L / year", tier: "elite", blurb: "India's leading institute for pharmacy and chemical technology." },
  { id: "manipal-pharma", name: "Manipal College of Pharmaceutical Sciences", city: "Manipal", state: "Karnataka", type: "Private", courses: ["bpharm"], examsAccepted: ["comedk"], feeRange: "₹2L – ₹3L / year", tier: "premier", blurb: "Reputed pharmacy college under the Manipal umbrella." },

  // ── Architecture & Design ──
  { id: "spa-delhi", name: "School of Planning and Architecture, Delhi", city: "New Delhi", state: "Delhi", type: "Government", courses: ["barch"], examsAccepted: ["jee-paper2", "nata"], feeRange: "₹40k – ₹60k / year", tier: "elite", blurb: "India's foremost planning and architecture institute." },
  { id: "jj-college-architecture", name: "Sir J.J. College of Architecture", city: "Mumbai", state: "Maharashtra", type: "Government", courses: ["barch"], examsAccepted: ["nata"], feeRange: "₹30k – ₹50k / year", tier: "premier", blurb: "One of India's oldest architecture colleges." },
  { id: "cept-ahmedabad", name: "CEPT University", city: "Ahmedabad", state: "Gujarat", type: "Private", courses: ["barch", "bdes"], examsAccepted: ["nata", "uceed"], feeRange: "₹2.5L – ₹3.5L / year", tier: "elite", blurb: "Specialist design, architecture and planning university." },
  { id: "nid-ahmedabad", name: "National Institute of Design, Ahmedabad", city: "Ahmedabad", state: "Gujarat", type: "Government", courses: ["bdes"], examsAccepted: ["nid-dat", "uceed"], feeRange: "₹4L – ₹5L / year", tier: "elite", blurb: "India's flagship design institute." },
  { id: "nift-delhi", name: "NIFT Delhi", city: "New Delhi", state: "Delhi", type: "Government", courses: ["bdes"], examsAccepted: ["nift-ee"], feeRange: "₹2L – ₹3L / year", tier: "premier", blurb: "Top fashion and design institute under the Ministry of Textiles." },
  { id: "iit-bombay-idc", name: "IDC School of Design, IIT Bombay", city: "Mumbai", state: "Maharashtra", type: "Government", courses: ["bdes"], examsAccepted: ["uceed"], feeRange: "₹2L – ₹2.5L / year", tier: "elite", blurb: "Design school inside IIT Bombay with strong industrial design focus." },
  { id: "srishti-bangalore", name: "Srishti Manipal Institute of Art, Design and Technology", city: "Bangalore", state: "Karnataka", type: "Private", courses: ["bdes"], examsAccepted: ["uceed"], feeRange: "₹3.5L – ₹4.5L / year", tier: "premier", blurb: "Creative-focused design institute with an interdisciplinary approach." },

  // ── Law ──
  { id: "nlsiu-bangalore", name: "National Law School of India University", city: "Bangalore", state: "Karnataka", type: "Government", courses: ["law"], examsAccepted: ["clat"], feeRange: "₹2.5L – ₹3L / year", tier: "elite", blurb: "India's top-ranked national law university." },
  { id: "nalsar-hyderabad", name: "NALSAR University of Law", city: "Hyderabad", state: "Telangana", type: "Government", courses: ["law"], examsAccepted: ["clat"], feeRange: "₹2.2L – ₹2.8L / year", tier: "elite", blurb: "Consistently ranked among the top national law universities." },
  { id: "nlu-delhi", name: "National Law University, Delhi", city: "New Delhi", state: "Delhi", type: "Government", courses: ["law"], examsAccepted: ["ailet"], feeRange: "₹2L – ₹2.5L / year", tier: "elite", blurb: "Admits via its own AILET exam rather than CLAT." },
  { id: "symbiosis-law-pune", name: "Symbiosis Law School, Pune", city: "Pune", state: "Maharashtra", type: "Private", courses: ["law"], examsAccepted: ["set", "clat"], feeRange: "₹2.5L – ₹3.5L / year", tier: "premier", blurb: "Well-regarded private law school with strong placement record." },
  { id: "jgls-sonipat", name: "Jindal Global Law School", city: "Sonipat", state: "Haryana", type: "Private", courses: ["law"], examsAccepted: ["clat", "lsat-india"], feeRange: "₹8L – ₹10L / year", tier: "premier", blurb: "India's highest-ranked private law school, strong global exposure." },

  // ── Commerce & Management ──
  { id: "srcc-delhi", name: "Shri Ram College of Commerce", city: "New Delhi", state: "Delhi", type: "Government", courses: ["bcom", "bba"], examsAccepted: ["cuet"], feeRange: "₹20k – ₹30k / year", tier: "elite", blurb: "India's most sought-after commerce college." },
  { id: "nmims-mumbai", name: "NMIMS Mumbai", city: "Mumbai", state: "Maharashtra", type: "Deemed", courses: ["bba", "bcom"], examsAccepted: ["set", "cuet"], feeRange: "₹4L – ₹5L / year", tier: "premier", blurb: "Popular private deemed university for management studies." },
  { id: "christ-university", name: "Christ University", city: "Bangalore", state: "Karnataka", type: "Deemed", courses: ["bba", "bcom", "bca", "ba", "bsc"], examsAccepted: ["cuet"], feeRange: "₹1.5L – ₹2.5L / year", tier: "premier", blurb: "Popular multi-disciplinary deemed university in Bangalore." },
  { id: "scms-pune", name: "Symbiosis Centre for Management Studies, Pune", city: "Pune", state: "Maharashtra", type: "Private", courses: ["bba"], examsAccepted: ["set"], feeRange: "₹3L – ₹4L / year", tier: "premier", blurb: "Well-regarded Symbiosis management college." },
  { id: "lsr-delhi", name: "Lady Shri Ram College for Women", city: "New Delhi", state: "Delhi", type: "Government", courses: ["bcom", "ba", "bsc"], examsAccepted: ["cuet"], feeRange: "₹20k – ₹30k / year", tier: "elite", blurb: "Top women's college for commerce, arts and sciences." },
  { id: "iim-indore-ipm", name: "IIM Indore (5-year IPM)", city: "Indore", state: "Madhya Pradesh", type: "Government", courses: ["bba"], examsAccepted: ["ipmat"], feeRange: "₹4L – ₹5L / year", tier: "elite", blurb: "Integrated management program straight after Class 12, run by an IIM." },

  // ── Science, Arts & Computer Applications ──
  { id: "st-stephens-delhi", name: "St. Stephen's College", city: "New Delhi", state: "Delhi", type: "Government", courses: ["ba", "bsc"], examsAccepted: ["cuet"], feeRange: "₹20k – ₹30k / year", tier: "elite", blurb: "One of India's oldest and most prestigious liberal arts colleges." },
  { id: "miranda-house-delhi", name: "Miranda House", city: "New Delhi", state: "Delhi", type: "Government", courses: ["ba", "bsc"], examsAccepted: ["cuet"], feeRange: "₹20k – ₹30k / year", tier: "elite", blurb: "Top-ranked women's college for arts and sciences." },
  { id: "loyola-chennai", name: "Loyola College", city: "Chennai", state: "Tamil Nadu", type: "Government", courses: ["ba", "bsc", "bcom"], examsAccepted: ["cuet"], feeRange: "₹30k – ₹50k / year", tier: "premier", blurb: "Highly respected autonomous college in Chennai." },
  { id: "fergusson-pune", name: "Fergusson College", city: "Pune", state: "Maharashtra", type: "Government", courses: ["ba", "bsc", "bcom"], examsAccepted: ["cuet"], feeRange: "₹20k – ₹40k / year", tier: "premier", blurb: "Historic, well-regarded autonomous college in Pune." },
  { id: "christ-bca", name: "Christ University (BCA)", city: "Bangalore", state: "Karnataka", type: "Deemed", courses: ["bca"], examsAccepted: ["cuet"], feeRange: "₹1.5L – ₹2L / year", tier: "premier", blurb: "Popular computer applications program with strong industry tie-ups." },
];

export function getIndiaCollegeById(id: string): IndiaCollegeRaw | undefined {
  return INDIA_COLLEGES.find((c) => c.id === id);
}
