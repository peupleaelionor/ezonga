import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { senderId, receiverId, content, audioUrl, messageType } = body

    if (!senderId || !receiverId) {
      return NextResponse.json(
        { error: 'senderId et receiverId sont requis' },
        { status: 400 }
      )
    }

    if (!content && !audioUrl) {
      return NextResponse.json(
        { error: 'content ou audioUrl est requis' },
        { status: 400 }
      )
    }

    // Verify that there's a match between these users
    const match = await db.match.findFirst({
      where: {
        OR: [
          { user1Id: senderId, user2Id: receiverId },
          { user1Id: receiverId, user2Id: senderId }
        ]
      }
    })

    if (!match) {
      return NextResponse.json(
        { error: 'Vous devez d\'abord matcher pour envoyer des messages' },
        { status: 403 }
      )
    }

    // Create message
    const message = await db.message.create({
      data: {
        senderId,
        receiverId,
        content: content || null,
        audioUrl: audioUrl || null,
        messageType: messageType || 'text',
        read: false
      }
    })

    // Update match last active
    await db.match.update({
      where: { id: match.id },
      data: { lastActive: new Date() }
    })

    return NextResponse.json({
      message: 'Message envoyé',
      messageData: message
    })
  } catch (error) {
    console.error('Error creating message:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du message' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const matchId = searchParams.get('matchId')

    if (!userId) {
      return NextResponse.json(
        { error: 'userId est requis' },
        { status: 400 }
      )
    }

    if (matchId) {
      // Get messages for a specific match
      const match = await db.match.findUnique({
        where: { id: matchId }
      })

      if (!match) {
        return NextResponse.json(
          { error: 'Match non trouvé' },
          { status: 404 }
        )
      }

      if (match.user1Id !== userId && match.user2Id !== userId) {
        return NextResponse.json(
          { error: 'Accès non autorisé' },
          { status: 403 }
        )
      }

      const messages = await db.message.findMany({
        where: {
          OR: [
            { senderId: match.user1Id, receiverId: match.user2Id },
            { senderId: match.user2Id, receiverId: match.user1Id }
          ]
        },
        orderBy: {
          createdAt: 'asc'
        }
      })

      return NextResponse.json({ messages })
    } else {
      // Get all conversations for the user
      // Get all matches
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
              city: true,
              verified: true
            }
          },
          user2: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              city: true,
              verified: true
            }
          }
        }
      })

      // Get last message for each match
      const conversations = await Promise.all(
        matches.map(async (match) => {
          const isUser1 = match.user1Id === userId
          const otherUser = isUser1 ? match.user2 : match.user1

          const lastMessage = await db.message.findFirst({
            where: {
              OR: [
                { senderId: match.user1Id, receiverId: match.user2Id },
                { senderId: match.user2Id, receiverId: match.user1Id }
              ]
            },
            orderBy: {
              createdAt: 'desc'
            }
          })

          const unreadCount = await db.message.count({
            where: {
              senderId: otherUser.id,
              receiverId: userId,
              read: false
            }
          })

          return {
            matchId: match.id,
            user: otherUser,
            lastMessage,
            unreadCount,
            createdAt: match.createdAt
          }
        })
      )

      // Sort by last message date
      conversations.sort((a, b) => {
        const dateA = a.lastMessage?.createdAt || a.createdAt
        const dateB = b.lastMessage?.createdAt || b.createdAt
        return dateB.getTime() - dateA.getTime()
      })

      return NextResponse.json({ conversations })
    }
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des messages' },
      { status: 500 }
    )
  }
}
