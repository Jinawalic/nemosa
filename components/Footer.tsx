export const Footer = () => {
  return (
    <footer className="bg-emerald-900 text-white py-12 border-t border-emerald-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="text-xl font-bold mb-3 tracking-wider">NEMOSA</h4>
            <p className="text-emerald-100/80 text-sm leading-relaxed">Reconnecting past generations, empowering future leaders, and building a community that lasts a lifetime.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
            <div className="space-y-2 text-sm text-emerald-100/70">
              <a href="#" className="block hover:text-white transition-colors">Back to Top</a>
              <a href="#members" className="block hover:text-white transition-colors">Alumni Directory</a>
              <a href="#projects" className="block hover:text-white transition-colors">Impact & Projects</a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3">Contact</h4>
            <p className="text-sm text-emerald-100/70">info@nemosa.org</p>
            <p className="text-sm text-emerald-100/70">Abuja, Nigeria</p>
          </div>
        </div>
        <div className="border-t border-emerald-800 pt-6 text-center text-xs text-emerald-100/50">
          &copy; {new Date().getFullYear()} NEMOSA Old Students Association. All rights reserved.
        </div>
      </div>
    </footer>
  );
};