import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { storage } from '../lib/firebase'

export async function uploadProductImage(file: File, productId: string): Promise<string> {
  try {
    const ext = file.name.split('.').pop()
    const storageRef = ref(storage, `products/${productId}.${ext}`)
    const snapshot = await uploadBytes(storageRef, file)
    return await getDownloadURL(snapshot.ref)
  } catch (error) {
    console.error('uploadProductImage error:', error)
    throw error
  }
}

export async function uploadProductImages(files: File[], productId: string): Promise<string[]> {
  try {
    const urls = await Promise.all(
      files.map(async (file, i) => {
        const ext = file.name.split('.').pop()
        const storageRef = ref(storage, `products/${productId}_${i}.${ext}`)
        const snapshot = await uploadBytes(storageRef, file)
        return await getDownloadURL(snapshot.ref)
      })
    )
    return urls
  } catch (error) {
    console.error('uploadProductImages error:', error)
    throw error
  }
}

export async function deleteProductImage(imageUrl: string): Promise<void> {
  try {
    // Extract path from URL
    const url = new URL(imageUrl)
    const path = decodeURIComponent(url.pathname.split('/o/')[1].split('?')[0])
    const storageRef = ref(storage, path)
    await deleteObject(storageRef)
  } catch (error) {
    // Don't throw if image doesn't exist
    console.warn('deleteProductImage warning:', error)
  }
}
