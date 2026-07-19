'use client';

import { X, Construction } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export const ComingSoonModal = ({ isOpen, onClose, title }: ComingSoonModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Hull container */}
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex flex-col items-center text-center mt-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 mb-4">
            <Construction className="h-6 w-6" />
          </div>
          
          <h3 className="text-lg font-bold text-gray-900 tracking-tight">
            {title} Coming Soon
          </h3>
          
          <p className="mt-2 text-sm text-gray-500 leading-relaxed">
            We are actively building the modules for this viewport section. Stay tuned for structural management capabilities!
          </p>

          <Button 
            onClick={onClose}
            className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-sm"
          >
            Understood
          </Button>
        </div>
      </div>
    </div>
  );
};