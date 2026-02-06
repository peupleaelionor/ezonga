import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, matchId, context } = body

    if (!userId || !matchId) {
      return NextResponse.json(
        { error: 'userId et matchId requis' },
        { status: 400 }
      )
    }

    // Check if user and match exist
    const user = await db.user.findUnique({
      where: { id: userId }
    })

    const match = await db.user.findUnique({
      where: { id: matchId }
    })

    if (!user || !match) {
      return NextResponse.json(
        { error: 'Utilisateur ou match non trouvé' },
        { status: 404 }
      )
    }

    // Check for existing suggestions
    const existingSuggestions = await db.conversationSuggestion.findFirst({
      where: {
        userId,
        matchId,
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
        }
      }
    })

    if (existingSuggestions && !existingSuggestions.used) {
      return NextResponse.json({
        suggestions: JSON.parse(existingSuggestions.suggestions),
        fromCache: true
      })
    }

    // Generate suggestions based on user profiles
    // In production, this would use the LLM skill
    const userInterests = JSON.parse(user.interests || '[]')
    const matchInterests = JSON.parse(match.interests || '[]')
    
    const commonInterests = userInterests.filter((i: string) => 
      matchInterests.includes(i)
    )

    const suggestions = [
      `J'ai vu que tu aimes aussi ${commonInterests[0] || 'voyager'}! C'est quoi ton activité préférée dans ce domaine?`,
      `Ton profil m'a l'air très intéressant. Qu'est-ce qui te passionne le plus dans la vie?`,
      `J'adore ta bio! ${match.bio ? 'Qu\'est-ce qui t\'a inspiré à écrire ça?' : 'Raconte-moi un peu plus sur toi!'}`,
      `Comment te décrirais-tu en trois mots?`,
      `Quel est ton plus beau souvenir récent?`,
      `Si tu pouvais voyager n'importe où demain, où irais-tu et pourquoi?`,
      `Qu'est-ce qui te fait sourire au quotidien?`
    ]

    // Save suggestions
    await db.conversationSuggestion.create({
      data: {
        userId,
        matchId,
        suggestions: JSON.stringify(suggestions.slice(0, 5)), // Save first 5
        context: context || null
      }
    })

    return NextResponse.json({
      suggestions: suggestions.slice(0, 5),
      fromCache: false
    })
  } catch (error) {
    console.error('Error generating suggestions:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la génération des suggestions' },
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

    const suggestions = await db.conversationSuggestion.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 10
    })

    return NextResponse.json({
      suggestions: suggestions.map(s => ({
        ...s,
        suggestions: JSON.parse(s.suggestions)
      }))
    })
  } catch (error) {
    console.error('Error fetching suggestions:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des suggestions' },
      { status: 500 }
    )
  }
}
