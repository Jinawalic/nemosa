import { NextResponse } from 'next/server';
import { deleteRegistrationById, updateRegistrationById } from '@/lib/admin-dashboard';

export const dynamic = 'force-dynamic';

function parseRegistrationId(id: string) {
  const registrationId = Number(id);

  if (!Number.isInteger(registrationId)) {
    return null;
  }

  return registrationId;
}

function parseUpdatePayload(body: unknown) {
  if (!body || typeof body !== 'object') {
    return { error: 'Invalid request body.' } as const;
  }

  const payload = body as Record<string, unknown>;

  const fullName = typeof payload.fullName === 'string' ? payload.fullName.trim() : '';
  const nickname = typeof payload.nickname === 'string' ? payload.nickname.trim() : null;
  const email = typeof payload.email === 'string' ? payload.email.trim() : '';
  const phone = typeof payload.phone === 'string' ? payload.phone.trim() : '';
  const profession = typeof payload.profession === 'string' ? payload.profession.trim() : '';
  const graduationYear = Number(payload.graduationYear);
  const bio = typeof payload.bio === 'string' ? payload.bio.trim() : null;
  const image = typeof payload.image === 'string' ? payload.image.trim() : null;
  const rawDateOfBirth = typeof payload.dateOfBirth === 'string' ? payload.dateOfBirth : '';
  const dateOfBirth = rawDateOfBirth ? new Date(rawDateOfBirth) : null;

  if (
    !fullName ||
    !email ||
    !phone ||
    !profession ||
    !Number.isInteger(graduationYear) ||
    !dateOfBirth ||
    Number.isNaN(dateOfBirth.getTime())
  ) {
    return {
      error: 'Please provide a valid full name, email, phone, profession, graduation year, and birthday.',
    } as const;
  }

  return {
    data: {
      fullName,
      nickname,
      email,
      phone,
      profession,
      graduationYear,
      dateOfBirth,
      bio,
      image,
    },
  } as const;
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const registrationId = parseRegistrationId(id);

  if (registrationId === null) {
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

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const registrationId = parseRegistrationId(id);

  if (registrationId === null) {
    return NextResponse.json({ error: 'Invalid registration id.' }, { status: 400 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = parseUpdatePayload(body);

  if ('error' in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  try {
    const updatedMember = await updateRegistrationById(registrationId, parsed.data);

    return NextResponse.json({
      success: true,
      updatedMember,
    });
  } catch (error) {
    console.error('Failed to update registration:', error);
    return NextResponse.json(
      { error: 'Registration not found or could not be updated.' },
      { status: 404 },
    );
  }
}