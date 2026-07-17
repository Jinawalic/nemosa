'use client';
import { Button } from './ui/Button';
import { CheckCircle, ArrowRight } from 'lucide-react';

export const Hero = ({ onRegisterClick }: { onRegisterClick: () => void }) => {
  return (
    <section className="bg-white py-5 md:py-8 overflow-hidden relative">
      {/* Mobile-only Background Image and Overlay */}
      <div className="absolute inset-0 md:hidden z-0">
        <img
          src="/images/hero-bg.png"
          alt="Alumni celebrating at a reunion event background"
          className="w-full h-full object-cover"
        />
        {/* Soft, dark green tint overlay for rich mobile readability */}
        <div className="absolute inset-0 bg-slate-950/65"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Text content */}
        <div className="space-y-3 text-center md:text-left">
          {/* text-white on mobile, text-emerald-950 on desktop */}
          <h1 className="text-4xl sm:text-5xl lg:text-4xl font-bold text-white md:text-emerald-950">
            Connecting Our <span className="text-emerald-400 md:text-emerald-600">Past</span> to Inspire Our Future
          </h1>
          {/* text-emerald-100 on mobile, text-emerald-800 on desktop */}
          <p className="text-emerald-100 md:text-emerald-800 text-lg sm:text-xl max-w-2xl mx-auto md:mx-0">
            Join the global network of outstanding alumni. Reconnect with old classmates, share your milestones, and contribute to upcoming community impact initiatives.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center md:justify-start gap-5">
            <Button
              onClick={onRegisterClick}
              className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-emerald-200 flex items-center justify-center gap-2"
            >
              Join the Association
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-emerald-400 text-emerald-400 hover:bg-white/10 md:border-emerald-600 md:text-emerald-700 md:hover:bg-emerald-50 flex items-center justify-center gap-2"
            >
              View Our Projects
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Right Image content - Corrected wrapping and explicit z-index layering */}
        <div className="relative hidden md:flex justify-center md:justify-end items-center w-full min-h-[450px] lg:min-h-[500px] z-10">
          <img
            src="/images/hero-image.png"
            alt="Alumni celebrating at a reunion event"
            className="w-full max-w-md lg:max-w-lg h-auto object-contain relative z-20"
          />
          {/* Decorative Element - Set to z-0 so it sits perfectly behind the z-20 image but remains above the main section background */}
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-100 rounded-full z-0 opacity-60"></div>
        </div>
      </div>
    </section>
  );
};