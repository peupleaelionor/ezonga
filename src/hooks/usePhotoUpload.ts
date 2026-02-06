'use client'

export function usePhotoUpload() {
  const uploadPhoto = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      
      reader.onload = () => {
        const base64 = reader.result as string
        // Store as base64 for now (in production, use a proper CDN)
        resolve(base64)
      }
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'))
      }
      
      reader.readAsDataURL(file)
    })
  }

  const uploadMultiplePhotos = async (files: File[]): Promise<string[]> => {
    const uploadPromises = files.map(file => uploadPhoto(file))
    return Promise.all(uploadPromises)
  }

  return {
    uploadPhoto,
    uploadMultiplePhotos
  }
}
