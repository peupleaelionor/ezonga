import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

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

    // Get all matches for the user (both as user1 and user2)
    const matches = await db.match.findMany({
      where: {
        OR: [
          { user1Id: userId },
          { user2Id: userId }
        ]
      },
      include: {
        user1: {
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
        },
        user2: {
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
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Transform to get the other user in each match
    const matchesWithOtherUser = matches.map(match => {
      const isUser1 = match.user1Id === userId
      const otherUser = isUser1 ? match.user2 : match.user1

      return {
        id: match.id,
        matchId: match.id,
        user: otherUser,
        createdAt: match.createdAt,
        lastActive: match.lastActive
      }
    })

    return NextResponse.json({ matches: matchesWithOtherUser })
  } catch (error) {
    console.error('Error fetching matches:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des matches' },
      { status: 500 }
    )
  }
}
