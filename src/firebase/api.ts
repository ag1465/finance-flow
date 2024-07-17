import { doc, getDoc, setDoc, collection, addDoc, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { db } from './initFirebase';

const getUserFromFirestore = async (uid: string) => {
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user from Firestore: ', error);
    return null;
  }
};

const addUserToFirestore = async (uid: string, email: string, name: string) => {
  try {
    await setDoc(doc(db, 'users', uid), {
      email,
      name,
      createdAt: new Date(),
    });
    console.log('User added to Firestore');
    // Create an initial account for the user
    await addAccountToFirestore(uid, 'Default Account', 'Checking', 0);
  } catch (error) {
    console.error('Error adding user to Firestore: ', error);
  }
};

const addAccountToFirestore = async (userId: string, accountName: string, accountType: string, balance: number) => {
  try {
    const accountRef = doc(db, 'accounts', userId);
    await setDoc(accountRef, {
      accountName,
      accountType,
      balance,
      createdAt: new Date(),
    });
    console.log('Account added to Firestore');
  } catch (error) {
    console.error('Error adding account to Firestore: ', error);
  }
};

const addTransaction = async (userId: string, accountId: string, amount: number, category: string, type: string, date: Date, description?: string) => {
  try {
    const transactionData: any = {
      userId,
      accountId,
      amount,
      category,
      type,
      date,
    };
    if (description) {
      transactionData.description = description;
    }
    await addDoc(collection(db, 'transactions'), transactionData);
    console.log('Transaction added to Firestore');
  } catch (error) {
    console.error('Error adding transaction to Firestore: ', error);
  }
};

const getAccount = async (userId: string) => {
  try {
    const docRef = doc(db, 'accounts', userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching account from Firestore: ', error);
    return null;
  }
};

const getTransactions = async (userId: string) => {
  try {
    const q = query(collection(db, 'transactions'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const transactions: any[] = [];
    querySnapshot.forEach((doc) => {
      transactions.push({ id: doc.id, ...doc.data() });
    });
    return transactions;
  } catch (error) {
    console.error('Error fetching transactions from Firestore: ', error);
    return [];
  }
};

const addBudgetToFirestore = async (userId: string, category: string, amount: number, startDate: Date, endDate: Date) => {
  try {
    await addDoc(collection(db, 'budgets'), {
      userId,
      category,
      amount,
      startDate,
      endDate,
      createdAt: new Date(),
    });
    console.log('Budget added to Firestore');
  } catch (error) {
    console.error('Error adding budget to Firestore: ', error);
  }
};

const updateAccountBalance = async (userId: string, newBalance: number) => {
  const docRef = doc(db, 'accounts', userId);
  await updateDoc(docRef, { balance: newBalance });
};

export {
  addTransaction,
  getAccount,
  addUserToFirestore,
  addAccountToFirestore,
  getUserFromFirestore,
  getTransactions,
  addBudgetToFirestore,
  updateAccountBalance,
};