import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, targetId } = body

    if (!userId || !targetId) {
      return NextResponse.json(
        { error: 'userId et targetId sont requis' },
        { status: 400 }
      )
    }

    if (userId === targetId) {
      return NextResponse.json(
        { error: 'Vous ne pouvez pas vous liker vous-même' },
        { status: 400 }
      )
    }

    // Check if like already exists
    const existingLike = await db.like.findUnique({
      where: {
        userId_targetId: {
          userId,
          targetId
        }
      }
    })

    if (existingLike) {
      return NextResponse.json(
        { error: 'Vous avez déjà liké cet utilisateur' },
        { status: 400 }
      )
    }

    // Create like
    const like = await db.like.create({
      data: {
        userId,
        targetId
      }
    })

    // Check for mutual like (match)
    const mutualLike = await db.like.findUnique({
      where: {
        userId_targetId: {
          userId: targetId,
          targetId: userId
        }
      }
    })

    let match = null

    if (mutualLike) {
      // Create match
      match = await db.match.create({
        data: {
          user1Id: userId,
          user2Id: targetId
        }
      })

      return NextResponse.json({
        message: 'C\'est un match!',
        like,
        match
      })
    }

    return NextResponse.json({
      message: 'Like envoyé',
      like
    })
  } catch (error) {
    console.error('Error creating like:', error)
    return NextResponse.json(
      { error: 'Erreur lors du like' },
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
        { error: 'userId est requis' },
        { status: 400 }
      )
    }

    // Get users that current user has liked
    const sentLikes = await db.like.findMany({
      where: { userId },
      include: {
        target: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            age: true,
            city: true,
            country: true,
            bio: true,
            verified: true
          }
        }
      }
    })

    // Get users who liked current user
    const receivedLikes = await db.like.findMany({
      where: { targetId: userId },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            age: true,
            city: true,
            country: true,
            bio: true,
            verified: true
          }
        }
      }
    })

    return NextResponse.json({
      sentLikes: sentLikes.map(like => like.target.id),
      receivedLikes: receivedLikes.map(like => like.user.id)
    })
  } catch (error) {
    console.error('Error fetching likes:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des likes' },
      { status: 500 }
    )
  }
}
