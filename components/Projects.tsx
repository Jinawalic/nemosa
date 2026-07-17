const projects = [
  { id: 1, title: 'E-Library Complex Renovation', year: '2024', desc: 'Upgraded the primary study library with contemporary digital learning tools, reliable solar micro-grids, and high-speed fiber internet.' },
  { id: 2, title: 'Annual Alumni Scholarship Fund', year: '2025', desc: 'Sponsored educational tuition packages, standard study items, and dynamic living stipends for top performing and underprivileged students.' },
  { id: 3, title: 'STEM Innovation Hub Lab', year: '2026', desc: 'Configured a high-efficiency computational workstation complex explicitly curated to teach modern engineering and AI mechanics.' }
];

export const Projects = () => {
  return (
    <section id="projects" className="py-6 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-extrabold text-gray-900">Completed Projects</h2>
          <p className="text-gray-500 mt-2">See how our collective contributions are building sustainable legacies.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((proj) => (
            <div key={proj.id} className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md overflow-hidden flex flex-col transition-all duration-300 hover:border-emerald-200">
              <div className="p-6 flex-1">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full">Completed • {proj.year}</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{proj.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{proj.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};