import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'node:crypto';
import { prisma } from '@/lib/prisma';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

function createCloudinarySignature(
  params: Record<string, string>,
  apiSecret: string,
) {
  const signatureBase = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join('&');

  return createHash('sha1').update(`${signatureBase}${apiSecret}`).digest('hex');
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract form fields
    const fullName = formData.get('fullName') as string;
    const nickname = formData.get('nickname') as string || '';
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const profession = formData.get('profession') as string;
    const dateOfBirth = formData.get('dateOfBirth') as string;
    const graduationYear = formData.get('graduationYear') as string;
    const location = formData.get('location') as string || '';
    const bio = formData.get('bio') as string || '';
    const passportFile = formData.get('passport') as File | null;

    // Validation
    if (!fullName || !email || !phone || !profession || !dateOfBirth || !graduationYear) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Parse graduation year
    const parsedGraduationYear = parseInt(graduationYear, 10);
    if (isNaN(parsedGraduationYear)) {
      return NextResponse.json(
        { error: 'Invalid graduation year' },
        { status: 400 }
      );
    }

    // Check if email already registered
    try {
      const existingRegistration = await prisma.registration.findUnique({
        where: { email },
      });

      if (existingRegistration) {
        return NextResponse.json(
          { error: 'Email already registered' },
          { status: 400 }
        );
      }
    } catch (dbError) {
      console.error('Database check error:', dbError);
    }

    let imageUrl = null;

    // Handle image upload to Cloudinary
    if (passportFile && passportFile.size > 0) {
      // Validate file size
      if (passportFile.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: 'File size must be less than 5MB' },
          { status: 400 }
        );
      }

      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!validTypes.includes(passportFile.type)) {
        return NextResponse.json(
          { error: 'Only JPEG, PNG, and WebP images are allowed' },
          { status: 400 }
        );
      }

      try {
        const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME;
        const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;
        const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET;

        if (!cloudinaryCloudName || !cloudinaryApiKey || !cloudinaryApiSecret) {
          return NextResponse.json(
            { error: 'Image upload is not configured on the server.' },
            { status: 500 }
          );
        }

        // Convert file to buffer
        const bytes = await passportFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const timestamp = Math.floor(Date.now() / 1000).toString();
        const folder = 'nemosa/alumni_passports';
        const signature = createCloudinarySignature(
          {
            folder,
            timestamp,
          },
          cloudinaryApiSecret
        );

        // Upload to Cloudinary using a signed server-side request.
        const formDataCloudinary = new FormData();
        formDataCloudinary.append('file', new Blob([buffer], { type: passportFile.type }), passportFile.name);
        formDataCloudinary.append('folder', folder);
        formDataCloudinary.append('timestamp', timestamp);
        formDataCloudinary.append('api_key', cloudinaryApiKey);
        formDataCloudinary.append('signature', signature);

        const cloudinaryResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
          {
            method: 'POST',
            body: formDataCloudinary,
          }
        );

        if (!cloudinaryResponse.ok) {
          const errorText = await cloudinaryResponse.text();
          console.error('Cloudinary error:', errorText);
          throw new Error('Cloudinary upload failed');
        }

        const cloudinaryData = await cloudinaryResponse.json();
        imageUrl = cloudinaryData.secure_url;
      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError);
        return NextResponse.json(
          { error: 'Failed to upload image. Please try again.' },
          { status: 500 }
        );
      }
    }

    // Save registration to database
    try {
      const registration = await prisma.registration.create({
        data: {
          fullName,
          nickname: nickname && nickname.trim() ? nickname : null,
          email,
          phone,
          profession,
          dateOfBirth: new Date(dateOfBirth),
          graduationYear: parsedGraduationYear,
          bio: bio && bio.trim() ? bio : null,
          status: 'pending',
        },
      });

      if (imageUrl) {
        await prisma.$executeRaw`
          UPDATE "Registration"
          SET "image" = ${imageUrl}
          WHERE "id" = ${registration.id}
        `;
      }

      return NextResponse.json(
        {
          success: true,
          message: 'Registration submitted successfully! We will review your application shortly.',
          registrationId: registration.id,
          imageUrl,
        },
        { status: 201 }
      );
    } catch (dbError) {
      console.error('Database creation error:', dbError);
      return NextResponse.json(
        { error: 'Failed to save registration. Please try again.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'An error occurred during registration. Please try again.' },
      { status: 500 }
    );
  }
}
