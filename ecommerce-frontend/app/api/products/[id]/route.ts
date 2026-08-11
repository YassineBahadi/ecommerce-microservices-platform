import { auth } from "@/app/auth";
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  // Vérifier l'authentification
  if (!session?.accessToken) {
    return NextResponse.json(
      { message: 'Non authentifié' },
      { status: 401 }
    );
  }

  // Next.js 16 : params est une Promise
  const { id } = await params;

  // Vérifier que l'ID est valide
  const productId = Number(id);

  if (!Number.isInteger(productId) || productId <= 0) {
    return NextResponse.json(
      { message: 'ID produit invalide' },
      { status: 400 }
    );
  }

  try {
    console.log(`🔍 Recherche du produit ${productId}`);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/${productId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    );

    console.log(`📡 Gateway response: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();

      console.error(
        `❌ Gateway error ${response.status}:`,
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

    console.log('✅ Produit récupéré:', data);

    return NextResponse.json(data);
  } catch (error) {
    console.error(
      '❌ Erreur lors de l’appel au Gateway:',
      error
    );

    return NextResponse.json(
      {
        message: 'Erreur interne du serveur',
      },
      { status: 500 }
    );
  }
}