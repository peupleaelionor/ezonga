import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, targetId } = body

    if (!userId || !targetId) {
      return NextResponse.json(
        { error: 'userId et targetId requis' },
        { status: 400 }
      )
    }

    // Get both users
    const [user, target] = await Promise.all([
      db.user.findUnique({ where: { id: userId } }),
      db.user.findUnique({ where: { id: targetId } })
    ])

    if (!user || !target) {
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      )
    }

    // Calculate compatibility scores
    const scores = []

    // 1. Interests compatibility
    const userInterests = JSON.parse(user.interests || '[]')
    const targetInterests = JSON.parse(target.interests || '[]')
    const commonInterests = userInterests.filter((i: string) => 
      targetInterests.includes(i)
    )
    const interestScore = Math.min(100, (commonInterests.length / Math.max(userInterests.length, 1)) * 100)
    scores.push({
      category: 'interests',
      score: interestScore,
      reasons: [
        `${commonInterests.length} centre(s) d'intérêt commun(s): ${commonInterests.join(', ') || 'aucun'}`
      ]
    })

    // 2. Location compatibility
    let locationScore = 0
    const locationReasons = []
    if (user.city === target.city) {
      locationScore = 100
      locationReasons.push(`Même ville: ${user.city}`)
    } else if (user.country === target.country) {
      locationScore = 70
      locationReasons.push(`Même pays: ${user.country}`)
    } else {
      locationScore = 30
      locationReasons.push(`${user.city} (${user.country}) et ${target.city} (${target.country})`)
    }
    scores.push({
      category: 'location',
      score: locationScore,
      reasons: locationReasons
    })

    // 3. Age compatibility
    const ageDiff = Math.abs(user.age - target.age)
    let ageScore = 0
    if (ageDiff <= 2) ageScore = 100
    else if (ageDiff <= 5) ageScore = 80
    else if (ageDiff <= 10) ageScore = 60
    else if (ageDiff <= 15) ageScore = 40
    else ageScore = 20

    scores.push({
      category: 'age',
      score: ageScore,
      reasons: [`Écart d'âge: ${ageDiff} ans`]
    })

    // 4. Relationship goals compatibility
    let goalScore = 0
    if (user.lookingFor === target.lookingFor) {
      goalScore = 100
      scores.push({
        category: 'goals',
        score: goalScore,
        reasons: [`Même objectif: ${user.lookingFor}`]
      })
    }

    // 5. Overall score
    const weights = { interests: 0.3, location: 0.25, age: 0.2, goals: 0.25 }
    let overallScore = 0
    let totalWeight = 0

    scores.forEach(s => {
      if (weights[s.category as keyof typeof weights]) {
        overallScore += s.score * weights[s.category as keyof typeof weights]
        totalWeight += weights[s.category as keyof typeof weights]
      }
    })

    overallScore = totalWeight > 0 ? overallScore / totalWeight : 50

    // Save or update scores
    for (const scoreData of scores) {
      const existing = await db.aIMatchScore.findFirst({
        where: {
          userId,
          targetId,
          category: scoreData.category
        }
      })

      if (existing) {
        await db.aIMatchScore.update({
          where: { id: existing.id },
          data: {
            score: scoreData.score,
            reasons: JSON.stringify(scoreData.reasons)
          }
        })
      } else {
        await db.aIMatchScore.create({
          data: {
            userId,
            targetId,
            category: scoreData.category,
            score: scoreData.score,
            reasons: JSON.stringify(scoreData.reasons)
          }
        })
      }
    }

    return NextResponse.json({
      overallScore: Math.round(overallScore),
      scores: scores.map(s => ({
        ...s,
        score: Math.round(s.score)
      })),
      compatibility: overallScore >= 70 ? 'high' : overallScore >= 50 ? 'medium' : 'low'
    })
  } catch (error) {
    console.error('Error calculating match:', error)
    return NextResponse.json(
      { error: 'Erreur lors du calcul de compatibilité' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const targetId = searchParams.get('targetId')

    if (!userId) {
      return NextResponse.json(
        { error: 'userId requis' },
        { status: 400 }
      )
    }

    if (targetId) {
      // Get specific match scores
      const scores = await db.aIMatchScore.findMany({
        where: { userId, targetId }
      })

      return NextResponse.json({
        scores: scores.map(s => ({
          ...s,
          reasons: JSON.parse(s.reasons)
        }))
      })
    } else {
      // Get all match scores for user
      const scores = await db.aIMatchScore.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' }
      })

      return NextResponse.json({
        scores: scores.map(s => ({
          ...s,
          reasons: JSON.parse(s.reasons)
        }))
      })
    }
  } catch (error) {
    console.error('Error fetching match scores:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des scores' },
      { status: 500 }
    )
  }
}
