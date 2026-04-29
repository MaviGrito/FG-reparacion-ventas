import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  User,
} from 'firebase/auth'
import { auth } from '../lib/firebase'

const AUTH_ERROR_MESSAGES: Record<string, string> = {
  'auth/user-not-found': 'errors.user_not_found',
  'auth/wrong-password': 'errors.wrong_password',
  'auth/invalid-credential': 'errors.wrong_password',
  'auth/too-many-requests': 'errors.too_many_requests',
  'auth/network-request-failed': 'errors.network_error',
}

export function getAuthErrorKey(code: string): string {
  return AUTH_ERROR_MESSAGES[code] ?? 'errors.generic'
}

export async function signIn(email: string, password: string): Promise<User> {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password)
    return result.user
  } catch (error: unknown) {
    const code = (error as { code?: string }).code ?? ''
    throw new Error(getAuthErrorKey(code))
  }
}

export async function signOut(): Promise<void> {
  await firebaseSignOut(auth)
}

export function onAuthStateChanged(callback: (user: User | null) => void): () => void {
  return firebaseOnAuthStateChanged(auth, callback)
}
