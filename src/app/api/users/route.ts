import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { hash } from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      email,
      password,
      firstName,
      lastName,
      age,
      gender,
      city,
      country,
      bio,
      interests,
      lookingFor,
      phone
    } = body

    // Validation
    if (!email || !password || !firstName || !lastName || !age || !gender || !city || !country) {
      return NextResponse.json(
        { error: 'Champs obligatoires manquants' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Cet email est déjà utilisé' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await hash(password, 10)

    // Create user
    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        age: parseInt(age),
        gender,
        city,
        country,
        bio: bio || '',
        interests: JSON.stringify(interests || []),
        lookingFor: lookingFor || '',
        phone: phone || null,
        verified: false
      }
    })

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json(
      { message: 'Profil créé avec succès', user: userWithoutPassword },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création du profil' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (userId) {
      // Get specific user
      const user = await db.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          age: true,
          gender: true,
          city: true,
          country: true,
          bio: true,
          interests: true,
          lookingFor: true,
          verified: true,
          createdAt: true
        }
      })

      if (!user) {
        return NextResponse.json(
          { error: 'Utilisateur non trouvé' },
          { status: 404 }
        )
      }

      return NextResponse.json({ user })
    } else {
      // Get all users (for demo/matching)
      const users = await db.user.findMany({
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          age: true,
          gender: true,
          city: true,
          country: true,
          bio: true,
          interests: true,
          lookingFor: true,
          verified: true,
          createdAt: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      })

      return NextResponse.json({ users })
    }
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des utilisateurs' },
      { status: 500 }
    )
  }
}
