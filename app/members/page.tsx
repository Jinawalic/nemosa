import { MembersPageClient } from '@/components/MembersPageClient';
import { getMembers } from '@/lib/members';

export const dynamic = 'force-dynamic';

export default async function MembersPage() {
  const members = await getMembers();

  return <MembersPageClient members={members} />;
}
