import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB2C0Uf6NWWqUkp3kCAeAoFXq7k5GeVzgc",
  authDomain: "agrosmart-4e1fe.firebaseapp.com",
  projectId: "agrosmart-4e1fe",
  storageBucket: "agrosmart-4e1fe.firebasestorage.app",
  messagingSenderId: "448300580974",
  appId: "1:448300580974:web:0ae670c92892f1ae77267f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function saveUser(userData) {
  try {
    await addDoc(collection(db, "users"), userData);
    return true;
  } catch (e) {
    console.error("Error: ", e);
    return false;
  }
}

async function checkUser(email, password) {
  try {
    const q = query(
      collection(db, "users"),
      where("email", "==", email),
      where("password", "==", password)
    );
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return snapshot.docs[0].data();
    }
    return null;
  } catch (e) {
    console.error("Error: ", e);
    return null;
  }
}

export { db, saveUser, checkUser };