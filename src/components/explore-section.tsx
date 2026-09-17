import { GraduationCap, Globe, BookOpen, Wallet } from "lucide-react";

const exploreItems = [
  {
    icon: GraduationCap,
    title: "Study in India",
    description: "Explore universities across Indian states.",
  },
  {
    icon: Globe,
    title: "Study Abroad",
    description: "Discover universities around the world.",
  },
  {
    icon: BookOpen,
    title: "By Course",
    description: "Find universities for your field.",
  },
  {
    icon: Wallet,
    title: "By Budget",
    description: "Discover options based on your budget.",
  },
];

export function ExploreSection() {
  return (
    <section id="explore" className="w-full max-w-4xl mx-auto px-4">
      <h2 className="text-2xl font-semibold text-[#111111] text-center mb-8 sm:text-3xl">
        Explore possibilities
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {exploreItems.map((item) => (
          <button
            key={item.title}
            className="group flex items-start gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-6 text-left shadow-sm transition-all hover:border-[#4F46E5]/20 hover:shadow-md"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#4F46E5] transition-colors group-hover:bg-[#4F46E5] group-hover:text-white">
              <item.icon size={20} />
            </div>
            <div>
              <h3 className="font-medium text-[#111111]">{item.title}</h3>
              <p className="mt-1 text-sm text-[#6B7280]">{item.description}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
