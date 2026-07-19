'use client';

import { useState } from 'react';
import { Users, ShieldAlert, Settings, LogOut, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerComingSoon: (title: string) => void;
}

export const Sidebar = ({ isOpen, onClose, onTriggerComingSoon }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navItems = [
    {
      name: 'Dashboard',
      href: '/admin/',
      icon: Users,
      type: 'link' as const,
    },
    {
      name: 'Post Projects',
      href: '#',
      icon: ShieldAlert,
      type: 'modal' as const,
    },
    {
      name: 'System Settings',
      href: '#',
      icon: Settings,
      type: 'modal' as const,
    },
  ];

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      const response = await fetch('/api/admin/auth/logout', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Unable to log out. Please try again.');
      }

      toast.success('Logged out successfully.');
      onClose();
      router.replace('/admin/login');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to log out. Please try again.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-900/40 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-300 ease-in-out
        lg:static lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex h-16 items-center justify-between px-6 border-b border-gray-100">
          <div className="flex items-center gap-2 font-bold text-gray-900 text-lg tracking-tight">
            <img src="/images/logo.png" alt="NEMOSA" className="h-8 w-8" />
            <span>NEMOSA Admin</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-md hover:bg-gray-100 text-gray-500 lg:hidden cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-4 py-4 overflow-y-auto">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            if (item.type === 'modal') {
              return (
                <button
                  key={idx}
                  onClick={() => {
                    onTriggerComingSoon(item.name);
                    onClose();
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors cursor-pointer"
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span>{item.name}</span>
                </button>
              );
            }

            return (
              <Link
                key={idx}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                  isActive 
                    ? 'bg-emerald-50 text-emerald-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-gray-100 p-4">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
          >
            <LogOut className="h-5 w-5" />
            <span>{isLoggingOut ? 'Signing Out...' : 'Sign Out'}</span>
          </button>
        </div>
      </aside>
    </>
  );
};
