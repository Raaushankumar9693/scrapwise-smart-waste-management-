import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  User as FirebaseUser,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { User, UserRole, LoginCredentials, SignupData, AuthState } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  signup: (data: SignupData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function mapFirebaseError(code: string): string {
  switch (code) {
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Invalid email or password';
    case 'auth/email-already-in-use':
      return 'Email already registered';
    case 'auth/weak-password':
      return 'Password must be at least 6 characters';
    case 'auth/invalid-email':
      return 'Invalid email address';
    default:
      return 'Something went wrong. Please try again.';
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });
  const signingUp = React.useRef(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (signingUp.current) return;
      if (firebaseUser) {
        try {
          const snap = await getDoc(doc(db, 'users', firebaseUser.uid));
          const profile = snap.data();
          const user: User = {
            id: firebaseUser.uid,
            email: firebaseUser.email!,
            name: profile?.name ?? firebaseUser.displayName ?? '',
            role: (profile?.role as UserRole) ?? 'buyer',
            phone: profile?.phone,
            avatar: firebaseUser.photoURL ?? undefined,
            createdAt: profile?.createdAt?.toDate?.() ?? new Date(),
          };
          setAuthState({ user, isAuthenticated: true, isLoading: false });
        } catch {
          const user: User = {
            id: firebaseUser.uid,
            email: firebaseUser.email!,
            name: firebaseUser.displayName ?? '',
            role: 'buyer',
            avatar: firebaseUser.photoURL ?? undefined,
            createdAt: new Date(),
          };
          setAuthState({ user, isAuthenticated: true, isLoading: false });
        }
      } else {
        setAuthState({ user: null, isAuthenticated: false, isLoading: false });
      }
    });
    return unsubscribe;
  }, []);

  const login = async (credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> => {
    try {
      const { user: firebaseUser } = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
      try {
        const snap = await getDoc(doc(db, 'users', firebaseUser.uid));
        const profile = snap.data();
        const user: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email!,
          name: profile?.name ?? firebaseUser.displayName ?? '',
          role: (profile?.role as UserRole) ?? 'buyer',
          phone: profile?.phone,
          avatar: firebaseUser.photoURL ?? undefined,
          createdAt: profile?.createdAt?.toDate?.() ?? new Date(),
        };
        setAuthState({ user, isAuthenticated: true, isLoading: false });
      } catch {
        const user: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email!,
          name: firebaseUser.displayName ?? '',
          role: 'buyer',
          avatar: firebaseUser.photoURL ?? undefined,
          createdAt: new Date(),
        };
        setAuthState({ user, isAuthenticated: true, isLoading: false });
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: mapFirebaseError(err.code) };
    }
  };

  const signup = async (data: SignupData): Promise<{ success: boolean; error?: string }> => {
    signingUp.current = true;
    let firebaseUser: FirebaseUser;
    try {
      const result = await createUserWithEmailAndPassword(auth, data.email, data.password);
      firebaseUser = result.user;
    } catch (err: any) {
      signingUp.current = false;
      return { success: false, error: mapFirebaseError(err.code) };
    }

    try {
      await updateProfile(firebaseUser, { displayName: data.name });
      await setDoc(doc(db, 'users', firebaseUser.uid), {
        name: data.name,
        email: data.email,
        role: data.role,
        phone: data.phone ?? null,
        createdAt: new Date(),
      });
    } catch {
      // Profile write failed but auth account was created — proceed with form data
    }

    const user: User = {
      id: firebaseUser.uid,
      email: firebaseUser.email!,
      name: data.name,
      role: data.role,
      phone: data.phone,
      avatar: firebaseUser.photoURL ?? undefined,
      createdAt: new Date(),
    };
    setAuthState({ user, isAuthenticated: true, isLoading: false });
    signingUp.current = false;
    return { success: true };
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
