'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  AlertTriangle,
  ArrowUpDown,
  Cake,
  Loader2,
  Menu,
  Search,
  ShieldAlert,
  Trash2,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Sidebar } from '@/components/admin/Sidebar';
import { ComingSoonModal } from '@/components/admin/ComingSoonModal';
import type { RegistrationView } from '@/lib/registration-types';

type AdminDashboardMetrics = {
  registeredMembers: number;
  totalProjects: number;
  birthdaysThisMonth: number;
};

type AdminDashboardResponse = {
  members: RegistrationView[];
  metrics: AdminDashboardMetrics;
};

const BIRTHDAY_TIME_ZONE = 'Africa/Lagos';

function getCurrentMonthInLagos() {
  return Number(
    new Intl.DateTimeFormat('en-US', {
      timeZone: BIRTHDAY_TIME_ZONE,
      month: 'numeric',
    }).format(new Date()),
  );
}

function countBirthdaysThisMonth(members: RegistrationView[]) {
  const currentMonth = getCurrentMonthInLagos();

  return members.filter((member) => {
    const birthdayMonth = Number(
      new Intl.DateTimeFormat('en-US', {
        timeZone: BIRTHDAY_TIME_ZONE,
        month: 'numeric',
      }).format(new Date(member.dateOfBirth)),
    );

    return birthdayMonth === currentMonth;
  }).length;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [members, setMembers] = useState<RegistrationView[]>([]);
  const [dashboardMetrics, setDashboardMetrics] = useState<AdminDashboardMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [modalTitle, setModalTitle] = useState('');
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);

  const handleOpenComingSoon = (title: string) => {
    setModalTitle(title);
    setIsComingSoonOpen(true);
  };

  useEffect(() => {
    let isMounted = true;

    const loadDashboard = async () => {
      try {
        setIsLoading(true);
        setLoadingError(null);

        const response = await fetch('/api/admin/registrations', {
          cache: 'no-store',
        });

        if (response.status === 401) {
          router.replace('/admin/login');
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to load admin dashboard data.');
        }

        const data = (await response.json()) as AdminDashboardResponse;

        if (!isMounted) return;

        setMembers(data.members);
        setDashboardMetrics(data.metrics);
      } catch (error) {
        if (!isMounted) return;
        setLoadingError(error instanceof Error ? error.message : 'Failed to load dashboard data.');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadDashboard();

    return () => {
      isMounted = false;
    };
  }, [router]);

  const filteredMembers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return members;

    return members.filter((member) => {
      return [member.fullName, member.email, member.profession, member.phone]
        .some((value) => value.toLowerCase().includes(query));
    });
  }, [members, searchQuery]);

  const stats = [
    {
      name: 'Registered Members',
      value: dashboardMetrics ? dashboardMetrics.registeredMembers.toString() : '...',
      icon: Users,
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      name: 'Total Projects',
      value: dashboardMetrics ? dashboardMetrics.totalProjects.toString() : '...',
      icon: ShieldAlert,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      name: 'Birthdays This Month',
      value: dashboardMetrics ? dashboardMetrics.birthdaysThisMonth.toString() : '...',
      icon: Cake,
      color: 'text-amber-600 bg-amber-50',
    },
  ];

  const updateMetricsAfterDelete = (nextMembers: RegistrationView[]) => {
    setDashboardMetrics((current) => {
      if (!current) return current;

      return {
        ...current,
        registeredMembers: nextMembers.length,
        birthdaysThisMonth: countBirthdaysThisMonth(nextMembers),
      };
    });
  };

  const handleDeleteMember = async (member: RegistrationView, toastId: string) => {
    toast.dismiss(toastId);
    setDeletingId(member.id);

    try {
      const response = await fetch(`/api/admin/registrations/${member.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(errorData?.error || 'Failed to delete registration.');
      }

      const nextMembers = members.filter((item) => item.id !== member.id);
      setMembers(nextMembers);
      updateMetricsAfterDelete(nextMembers);
      toast.success(`${member.fullName} deleted successfully.`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete registration.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteClick = (member: RegistrationView) => {
    toast.custom(
      (t) => (
        <div
          className={`w-[92vw] max-w-sm rounded-2xl border border-gray-200 bg-white p-4 shadow-xl transition-all duration-200 ${
            t.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-full bg-rose-100 p-2 text-rose-600">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">Delete {member.fullName}?</p>
              <p className="mt-1 text-sm text-gray-500">
                This will permanently remove the registration record from the database.
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => toast.dismiss(t.id)}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => handleDeleteMember(member, t.id)}
              className="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-rose-700"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          </div>
        </div>
      ),
      { duration: Infinity },
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans antialiased text-gray-900">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onTriggerComingSoon={handleOpenComingSoon}
      />

      <div className="flex flex-1 flex-col min-w-0 overflow-x-hidden">
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6 lg:px-8 flex-shrink-0">
          <div className="flex flex-1 items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 lg:hidden cursor-pointer"
            >
              <Menu className="h-6 w-6" />
            </button>

            <div className="relative w-full max-w-md hidden sm:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search alumni by name, email, or profession..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
              <div className="text-right hidden md:block">
                <p className="text-sm font-semibold text-gray-900">Admin Account</p>
                <p className="text-xs text-gray-500">Super Administrator</p>
              </div>
              <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                A
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Membership Control</h1>
              <p className="text-sm text-gray-500 mt-1">
                Review, search, sort and manage all registered members across structural directories.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6 mb-8">
            {stats.map((stat, idx) => {
              const IconComponent = stat.icon;

              return (
                <div key={idx} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${stat.color} flex-shrink-0`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-0.5">{stat.value}</h3>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 sm:hidden">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm outline-none"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/70 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <th className="py-3.5 px-6 font-semibold w-16">S/N</th>
                    <th className="py-3.5 px-6 font-semibold select-none">
                      <button className="flex items-center gap-1 hover:text-gray-900 transition-colors cursor-pointer">
                        <span>Full Name</span>
                        <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </th>
                    <th className="py-3.5 px-6 font-semibold">Profession</th>
                    <th className="py-3.5 px-6 font-semibold">Phone Number</th>
                    <th className="py-3.5 px-6 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
                  {isLoading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-16 text-center text-gray-500">
                        <div className="inline-flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Loading member records...</span>
                        </div>
                      </td>
                    </tr>
                  ) : loadingError ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-16 text-center text-gray-500">
                        {loadingError}
                      </td>
                    </tr>
                  ) : filteredMembers.length > 0 ? (
                    filteredMembers.map((member, index) => (
                      <tr key={member.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-4 px-6 font-medium text-gray-900 tabular-nums">
                          {index + 1}
                        </td>
                        <td className="py-4 px-6 font-medium text-gray-900 max-w-[200px] truncate">
                          {member.fullName}
                        </td>
                        <td className="py-4 px-6 max-w-[180px] truncate">
                          {member.profession}
                        </td>
                        <td className="py-4 px-6 tabular-nums">
                          {member.phone}
                        </td>
                        <td className="py-4 px-6 text-right whitespace-nowrap">
                          <button className="text-emerald-600 hover:text-emerald-700 font-semibold mr-4 cursor-pointer">
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteClick(member)}
                            disabled={deletingId === member.id}
                            className="text-gray-400 hover:text-rose-600 font-semibold transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {deletingId === member.id ? 'Deleting...' : 'Delete'}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-16 text-center text-gray-500">
                        No members match your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between border-t border-gray-100 bg-white px-6 py-4">
              <div className="flex flex-1 justify-between sm:hidden">
                <Button variant="outline" className="rounded-xl px-4 py-2">
                  Previous
                </Button>
                <Button variant="outline" className="rounded-xl px-4 py-2">
                  Next
                </Button>
              </div>
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <p className="text-sm text-gray-500">
                  Showing{' '}
                  <span className="font-semibold text-gray-900">{filteredMembers.length > 0 ? 1 : 0}</span>{' '}
                  to{' '}
                  <span className="font-semibold text-gray-900">{filteredMembers.length}</span> of{' '}
                  <span className="font-semibold text-gray-900">{members.length}</span> members
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" className="rounded-xl px-3.5 py-1.5 text-xs font-semibold">
                    Previous
                  </Button>
                  <Button variant="outline" className="rounded-xl px-3.5 py-1.5 text-xs font-semibold">
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <ComingSoonModal
        isOpen={isComingSoonOpen}
        onClose={() => setIsComingSoonOpen(false)}
        title={modalTitle}
      />
    </div>
  );
}
