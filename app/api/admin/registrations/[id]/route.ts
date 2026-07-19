import { NextResponse } from 'next/server';
import { deleteRegistrationById } from '@/lib/admin-dashboard';

export const dynamic = 'force-dynamic';

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const registrationId = Number(id);

  if (!Number.isInteger(registrationId)) {
    return NextResponse.json({ error: 'Invalid registration id.' }, { status: 400 });
  }

  try {
    const deletedMember = await deleteRegistrationById(registrationId);

    return NextResponse.json({
      success: true,
      deletedMember,
    });
  } catch (error) {
    console.error('Failed to delete registration:', error);
    return NextResponse.json(
      { error: 'Registration not found or could not be deleted.' },
      { status: 404 },
    );
  }
}
