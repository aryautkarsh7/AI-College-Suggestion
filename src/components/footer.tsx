export function Footer() {
  return (
    <footer className="w-full border-t border-[#E5E7EB] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="text-center sm:text-left">
            <div className="text-lg font-semibold text-[#111111]">
              <span className="text-[#4F46E5]">College</span>AI
            </div>
            <p className="mt-1 text-sm text-[#6B7280]">
              AI-powered college discovery for students.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a
              href="#"
              className="text-sm text-[#6B7280] transition-colors hover:text-[#111111]"
            >
              About
            </a>
            <a
              href="#explore"
              className="text-sm text-[#6B7280] transition-colors hover:text-[#111111]"
            >
              Explore
            </a>
            <a
              href="#"
              className="text-sm text-[#6B7280] transition-colors hover:text-[#111111]"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm text-[#6B7280] transition-colors hover:text-[#111111]"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-sm text-[#6B7280] transition-colors hover:text-[#111111]"
            >
              GitHub
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-[#E5E7EB] pt-6 text-center">
          <p className="text-xs text-[#9CA3AF]">© 2026 CollegeAI</p>
        </div>
      </div>
    </footer>
  );
}
