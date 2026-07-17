import { Button } from './ui/Button';

export const CTA = ({ onRegisterClick }: { onRegisterClick: () => void }) => {
  return (
    <section className="bg-emerald-800 py-16 md:py-10 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.2),transparent)] pointer-events-none" />
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Ready to Make an Impact?</h2>
        <p className="text-emerald-100 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          Your journey did not end at graduation. Join the alumni community portal today to access professional networks and stay updated.
        </p>
        <div className="pt-4">
          <Button variant="secondary" onClick={onRegisterClick} className="px-8 py-3.5 text-emerald-800 font-bold hover:bg-white">
            Register As An Alumnus Now
          </Button>
        </div>
      </div>
    </section>
  );
};