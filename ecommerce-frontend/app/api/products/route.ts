import { auth } from "@/app/auth";
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await auth();

  if (!session?.accessToken) {
    return NextResponse.json(
      { message: 'Non authentifié' },
      { status: 401 }
    );
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      const errorText = await response.text();

      console.error(
        `Gateway error ${response.status}:`,
        errorText
      );

      return NextResponse.json(
        {
          message: `Erreur Gateway: ${response.status}`,
          details: errorText,
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Erreur lors de l’appel au Gateway:', error);

    return NextResponse.json(
      {
        message: 'Impossible de contacter le Gateway',
      },
      { status: 500 }
    );
  }
}