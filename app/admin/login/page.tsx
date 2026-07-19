import { AdminLoginForm } from '@/components/admin/AdminLoginForm';

type AdminLoginPageProps = {
  searchParams: Promise<{ redirect?: string | string[] }>;
};

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const params = await searchParams;
  const redirectTo = typeof params.redirect === 'string' ? params.redirect : '/admin';

  return <AdminLoginForm redirectTo={redirectTo} />;
}