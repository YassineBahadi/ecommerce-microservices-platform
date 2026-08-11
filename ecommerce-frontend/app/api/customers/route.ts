import { auth } from "@/app/auth";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.accessToken) {
    return NextResponse.json(
      { message: 'Non authentifié' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    console.log('\n========== CUSTOMER REQUEST ==========');
    console.log('Body envoyé :', JSON.stringify(body, null, 2));

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/customers`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    console.log('Customer Gateway status:', response.status);
    console.log(
      'Customer Gateway content-type:',
      response.headers.get('content-type')
    );

    // IMPORTANT :
    // On lit d'abord la réponse comme du texte.
    // Le Customer Service retourne directement l'ID.
    const responseText = await response.text();

    console.log('Customer Gateway response:');
    console.log(responseText);

    // Gestion des erreurs du Gateway
    if (!response.ok) {
      return NextResponse.json(
        {
          message: `Erreur Gateway: ${response.status} - ${responseText}`,
        },
        {
          status: response.status,
        }
      );
    }

    /*
     * Le Customer Service retourne directement :
     *
     * 6a7b5f839dd10aaa57191be5
     *
     * et non :
     *
     * {
     *   "id": "6a7b5f839dd10aaa57191be5"
     * }
     *
     * On transforme donc la réponse en objet.
     */

    const customerId = responseText.trim();

    if (!customerId) {
      console.error('Customer Service a retourné un ID vide');

      return NextResponse.json(
        {
          message: 'Le Customer Service a retourné un ID vide',
        },
        {
          status: 500,
        }
      );
    }

    console.log('Customer ID créé:', customerId);

    // On normalise la réponse pour le frontend
    return NextResponse.json(
      {
        id: customerId,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      'Erreur lors de la création du client:',
      error
    );

    return NextResponse.json(
      {
        message: 'Erreur interne du serveur',
      },
      {
        status: 500,
      }
    );
  }
}
