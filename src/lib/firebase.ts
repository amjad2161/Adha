import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);

// Initialize Firebase
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId); // CRITICAL: The app will break without this line
export const auth = getAuth(app);

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const signInWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
    } catch (e) {
        console.error("Authentication Error", e);
    }
};

export const logOut = async () => {
    try {
        await signOut(auth);
    } catch (e) {
        console.error("Sign Out Error", e);
    }
};

export const saveUserScore = async (uid: string, scoreToAdd: number) => {
    const scoreRef = doc(db, 'scores', uid);
    try {
        const docSnap = await getDoc(scoreRef);
        if (docSnap.exists()) {
            const currentScore = docSnap.data().score || 0;
            await updateDoc(scoreRef, {
                score: currentScore + scoreToAdd,
                updatedAt: serverTimestamp()
            });
        } else {
            await setDoc(scoreRef, {
                uid,
                score: scoreToAdd,
                updatedAt: serverTimestamp()
            });
        }
    } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, `scores/${uid}`);
    }
};

export const getUserScore = async (uid: string): Promise<number> => {
    const scoreRef = doc(db, 'scores', uid);
    try {
        const docSnap = await getDoc(scoreRef);
        if (docSnap.exists()) {
            return docSnap.data().score || 0;
        }
        return 0;
    } catch (error) {
        handleFirestoreError(error, OperationType.GET, `scores/${uid}`);
        return 0;
    }
};
