import { 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  addDoc, 
  Timestamp, 
  DocumentSnapshot, 
  query, 
  where, 
  getDocs, 
  updateDoc, 
  orderBy, 
  limit, 
  startAfter 
} from 'firebase/firestore';
import { db } from './initFirebase';

// Fetch a user document from Firestore
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

// Add a user document to Firestore
const addUserToFirestore = async (uid: string, email: string, name: string) => {
  try {
    await setDoc(doc(db, 'users', uid), {
      email,
      name,
      createdAt: new Date(),
    });
    console.log('User added to Firestore');
  } catch (error) {
    console.error('Error adding user to Firestore: ', error);
  }
};

// Add an account document to Firestore
const addAccountToFirestore = async (userId: string, accountName: string, accountType: string) => {
  try {
    const initialBalance = 0.00;
    const docRef = await addDoc(collection(db, 'accounts'), {
      userId,
      accountName,
      accountType,
      balance: initialBalance,
      createdAt: new Date(),
    });
    console.log('Account added to Firestore with initial balance', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding account to Firestore: ', error);
    return null;
  }
};

// Add a transaction document to Firestore
const addTransaction = async (
  userId: string,
  accountId: string,
  amount: number,
  category: string,
  type: string,
  date: Date,
  description: string
) => {
  if (!userId || !accountId || amount === undefined || !category || !type) {
    throw new Error('Required fields are missing');
  }

  try {
    await addDoc(collection(db, 'transactions'), {
      userId,
      accountId,
      amount,
      category,
      type,
      date,
      description
    });
    console.log('Transaction added to Firestore');
  } catch (error) {
    console.error('Error adding transaction to Firestore: ', error);
    throw error;
  }
};

// Get account details based on userId
const getAccount = async (userId: string) => {
  const accountsRef = collection(db, 'accounts');
  const q = query(accountsRef, where('userId', '==', userId));
  
  try {
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const accountDoc = querySnapshot.docs[0];
      const accountData = accountDoc.data();
      return { id: accountDoc.id, ...accountData }; // Return document ID along with data
    } else {
      console.error('No account found for userId:', userId);
      return null;
    }
  } catch (error) {
    console.error('Error fetching account:', error);
    throw error;
  }
};

// Get transactions with pagination
const getTransactions = async (userId: string, month: string, page: number, pageSize: number, lastVisibleDoc?: DocumentSnapshot) => {
  try {
    const transactionsRef = collection(db, 'transactions');
    
    // Start date is the first day of the month
    const startDate = new Date(`${month}-01T00:00:00`);
    // End date is the last day of the month
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0, 23, 59, 59);
    
    const startTimestamp = Timestamp.fromDate(startDate);
    const endTimestamp = Timestamp.fromDate(endDate);

 
    let q = query(
      transactionsRef,
      where('userId', '==', userId),
      where('date', '>=', startTimestamp),
      where('date', '<=', endTimestamp),
      orderBy('date', 'desc'),
      limit(pageSize)
    );

    if (lastVisibleDoc) {
      q = query(q, startAfter(lastVisibleDoc));
    }

    const querySnapshot = await getDocs(q);

    const transactions: any[] = [];
    querySnapshot.forEach((doc) => {
      transactions.push({ id: doc.id, ...doc.data() });
    });

    return transactions;
  } catch (error) {
    console.error('Error fetching transactions from Firestore:', error);
    return [];
  }
};

// Add or update a budget document
const addBudgetToFirestore = async (userId: string, amount: number, month: string) => {
  try {
    const budgetRef = doc(db, 'budgets', `${userId}_${month}`);
    await setDoc(budgetRef, {
      userId,
      amount,
      month,
      createdAt: new Date(),
    });
    console.log('Budget added to Firestore');
  } catch (error) {
    console.error('Error adding budget to Firestore: ', error);
  }
};

// Get budget details
const getBudget = async (userId: string, month: string) => {
  try {
    const budgetRef = doc(db, 'budgets', `${userId}_${month}`);
    const docSnap = await getDoc(budgetRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching budget from Firestore: ', error);
    return null;
  }
};

// Update account balance
const updateAccountBalance = async (accountId: string, newBalance: number) => {
  try {
    const docRef = doc(db, 'accounts', accountId);
    const docSnapshot = await getDoc(docRef);
    if (!docSnapshot.exists()) {
      console.error('No document found with accountId:', accountId);
      return;
    }

    await updateDoc(docRef, { balance: newBalance });
    console.log('Account balance updated');
  } catch (error) {
    console.error('Error updating account balance: ', error);
  }
};

// Get account ID by userId
const getAccountIdByUserId = async (userId: string) => {
  const accountsRef = collection(db, 'accounts');
  const q = query(accountsRef, where('userId', '==', userId));
  
  try {
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].id; // Return document ID
    } else {
      console.error('No account found for userId:', userId);
      return null;
    }
  } catch (error) {
    console.error('Error fetching account ID:', error);
    throw error;
  }
};

// Update account balance for a user
const updateAccountBalanceForUser = async (userId: string, newBalance: number) => {
  const accountId = await getAccountIdByUserId(userId);
  if (accountId) {
    await updateAccountBalance(accountId, newBalance);
  }
};

// Add or update a category budget document
const addCategoryBudget = async (userId: string, category: string, amount: number) => {
  try {
    const budgetRef = doc(db, 'categoryBudgets', `${userId}_${category}`);
    await setDoc(budgetRef, {
      userId,
      category,
      amount,
      createdAt: new Date(),
    });
    console.log('Category budget added to Firestore');
  } catch (error) {
    console.error('Error adding category budget to Firestore: ', error);
  }
};

const getAllCategoryBudgets = async (userId: string) => {
  const q = query(collection(db, "categoryBudgets"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  const budgets: { category: string; amount: number }[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    budgets.push({ category: data.category, amount: data.amount });
  });
  return budgets;
};

const updateCategoryBudget = async (userId: string, category: string, amount: number) => {
  const budgetRef = doc(db, "categoryBudgets", `${userId}_${category}`);
  await setDoc(budgetRef, { userId, category, amount }, { merge: true });
};

export {
  addTransaction,
  getAccount,
  addUserToFirestore,
  addAccountToFirestore,
  getUserFromFirestore,
  getTransactions,
  addBudgetToFirestore,
  getBudget,
  updateAccountBalance,
  getAccountIdByUserId,
  updateAccountBalanceForUser,
  addCategoryBudget,
  getAllCategoryBudgets,
  updateCategoryBudget
};