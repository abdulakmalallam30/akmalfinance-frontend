import { auth, db } from './config';

// Create user with email and password
export const createUser = async (email, password, displayName) => {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    
    // Update user profile with display name
    await user.updateProfile({
      displayName: displayName
    });
    
    // Create user document in Firestore
    await db.collection('users').doc(user.uid).set({
      uid: user.uid,
      email: user.email,
      displayName: displayName,
      createdAt: new Date().toISOString(),
      expenses: [],
      totalBudget: 50000,
      budgetEnabled: false,
      selectedCurrency: 'INR'
    });
    
    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Sign in user
export const signInUser = async (email, password) => {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Sign out user
export const signOutUser = async () => {
  try {
    await auth.signOut();
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Get user data from Firestore
export const getUserData = async (uid) => {
  try {
    const userDoc = await db.collection('users').doc(uid).get();
    if (userDoc.exists) {
      return { success: true, data: userDoc.data() };
    } else {
      return { success: false, error: 'User data not found' };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Update user data in Firestore
export const updateUserData = async (uid, data) => {
  try {
    await db.collection('users').doc(uid).set(data, { merge: true });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Listen to auth state changes
export const onAuthStateChange = (callback) => {
  return auth.onAuthStateChanged(callback);
};