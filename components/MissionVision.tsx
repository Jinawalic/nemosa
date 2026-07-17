import { Target, Eye } from 'lucide-react';

export const MissionVision = () => {
  return (
    <section id="mission" className="py-6 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Mission Card */}
          <div className="bg-gradient-to-br from-emerald-700 to-emerald-800 text-white p-8 md:p-12 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 group">
            <div className="flex gap-2">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold">Our Mission</h3>
            </div>
            <p className="text-emerald-50/90 leading-relaxed text-sm sm:text-base">
              To build an enduring community that reunites alumni, supports active network synergy, protects institutional legacies, and invests dynamically in structural development and academic opportunities for current students.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-100 text-gray-800 p-8 md:p-12 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 group">
            <div className="flex gap-2">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-emerald-800">Our Vision</h3>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              To be an internationally recognized alumni foundation characterized by mutual growth, global professional empowerment, and continuous educational advancement, shaping standard models of social change.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};