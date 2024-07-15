import { db } from './initFirebase';
import { doc, setDoc } from 'firebase/firestore';

const addUserToFirestore = async (uid: string, email: string) => {
  try {
    await setDoc(doc(db, 'users', uid), {
      email,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error('Error adding user to Firestore:', error);
  }
};

export default addUserToFirestore;
