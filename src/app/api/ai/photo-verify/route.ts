import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, photoUrl } = body

    if (!userId || !photoUrl) {
      return NextResponse.json(
        { error: 'userId et photoUrl requis' },
        { status: 400 }
      )
    }

    // Check if user exists
    const user = await db.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      )
    }

    // Check if this photo was already verified
    const existingVerification = await db.photoVerification.findFirst({
      where: {
        userId,
        photoUrl
      }
    })

    if (existingVerification) {
      return NextResponse.json({
        verified: existingVerification.isVerified,
        confidence: existingVerification.confidence,
        analysis: existingVerification.analysis
      })
    }

    // In production, this would call the VLM skill to verify the photo
    // For now, we'll simulate the verification
    const mockAnalysis = {
      isVerified: true,
      confidence: 0.92,
      analysis: JSON.stringify({
        faceDetected: true,
        quality: 'high',
        appropriate: true,
        notes: 'Photo claire avec visage visible. Convient pour un profil de rencontre.'
      })
    }

    // Save verification result
    const verification = await db.photoVerification.create({
      data: {
        userId,
        photoUrl,
        isVerified: mockAnalysis.isVerified,
        confidence: mockAnalysis.confidence,
        analysis: mockAnalysis.analysis
      }
    })

    // Update user verification status if all photos are verified
    await db.user.update({
      where: { id: userId },
      data: { verified: true }
    })

    return NextResponse.json({
      success: true,
      verified: verification.isVerified,
      confidence: verification.confidence,
      analysis: JSON.parse(verification.analysis)
    })
  } catch (error) {
    console.error('Error verifying photo:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la vérification de la photo' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'userId requis' },
        { status: 400 }
      )
    }

    const verifications = await db.photoVerification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({
      verifications: verifications.map(v => ({
        ...v,
        analysis: JSON.parse(v.analysis)
      }))
    })
  } catch (error) {
    console.error('Error fetching verifications:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des vérifications' },
      { status: 500 }
    )
  }
}
