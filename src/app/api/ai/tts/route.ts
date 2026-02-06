import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { messageId, text, voice = 'female' } = body

    if (!messageId || !text) {
      return NextResponse.json(
        { error: 'messageId et text requis' },
        { status: 400 }
      )
    }

    // Check if message exists
    const message = await db.message.findUnique({
      where: { id: messageId }
    })

    if (!message) {
      return NextResponse.json(
        { error: 'Message non trouvé' },
        { status: 404 }
      )
    }

    // Check if TTS was already generated
    const existingVoiceMessage = await db.voiceMessage.findUnique({
      where: { messageId }
    })

    if (existingVoiceMessage && existingVoiceMessage.ttsGenerated) {
      return NextResponse.json({
        audioUrl: existingVoiceMessage.audioUrl,
        transcript: existingVoiceMessage.transcript,
        duration: existingVoiceMessage.duration,
        fromCache: true
      })
    }

    // In production, this would use the TTS skill to generate audio
    // For now, we'll simulate it
    const estimatedDuration = Math.ceil(text.length / 15) // Rough estimate: ~15 chars per second

    // Mock audio URL (in production, this would be a real TTS-generated audio file)
    const mockAudioUrl = `data:audio/mp3;base64,simulated_tts_audio_${Date.now()}`

    // Save voice message
    const voiceMessage = await db.voiceMessage.create({
      data: {
        messageId,
        audioUrl: mockAudioUrl,
        transcript: text,
        duration: estimatedDuration,
        ttsGenerated: true
      }
    })

    return NextResponse.json({
      audioUrl: voiceMessage.audioUrl,
      transcript: voiceMessage.transcript,
      duration: voiceMessage.duration,
      fromCache: false
    })
  } catch (error) {
    console.error('Error generating TTS:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la génération audio' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const messageId = searchParams.get('messageId')

    if (!messageId) {
      return NextResponse.json(
        { error: 'messageId requis' },
        { status: 400 }
      )
    }

    const voiceMessage = await db.voiceMessage.findUnique({
      where: { messageId }
    })

    if (!voiceMessage) {
      return NextResponse.json(
        { error: 'Message vocal non trouvé' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      audioUrl: voiceMessage.audioUrl,
      transcript: voiceMessage.transcript,
      duration: voiceMessage.duration,
      ttsGenerated: voiceMessage.ttsGenerated
    })
  } catch (error) {
    console.error('Error fetching voice message:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du message vocal' },
      { status: 500 }
    )
  }
}
