import { Sparkles, Globe, Eye } from "lucide-react";

const trustPoints = [
  {
    icon: Sparkles,
    title: "Personalized",
    description: "Recommendations based on your goals and preferences.",
  },
  {
    icon: Globe,
    title: "Global",
    description: "Explore universities in India and around the world.",
  },
  {
    icon: Eye,
    title: "Transparent",
    description: "Understand why a university was suggested.",
  },
];

export function TrustSection() {
  return (
    <section className="w-full max-w-4xl mx-auto px-4">
      <h2 className="text-2xl font-semibold text-[#111111] text-center mb-8 sm:text-3xl">
        Make a smarter college decision
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {trustPoints.map((point) => (
          <div
            key={point.title}
            className="flex flex-col items-center text-center"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF2FF] text-[#4F46E5]">
              <point.icon size={22} />
            </div>
            <h3 className="font-medium text-[#111111]">{point.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
              {point.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
