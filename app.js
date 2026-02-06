import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

export const firebaseConfig = {
  apiKey: "AIzaSyDA9pP-Y3PEvl6675f4pHDyXzayzzmihhI",
  authDomain: "meshwark-8adf8.firebaseapp.com",
  projectId: "meshwark-8adf8",
  storageBucket: "meshwark-8adf8.firebasestorage.app",
  messagingSenderId: "450060838946",
  appId: "1:450060838946:web:963cacdd125b253fa1827b",
  measurementId: "G-GP0JGBZTGG"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export async function saveUserRole(uid, role){
  await setDoc(doc(db,"users",uid), { role, updatedAt: serverTimestamp() }, { merge:true });
}

export async function saveUserProfile(uid, data){
  await setDoc(doc(db,"users",uid), { ...data, updatedAt: serverTimestamp() }, { merge:true });
}

export async function getUserDoc(uid){
  const snap = await getDoc(doc(db,"users",uid));
  return snap.exists() ? snap.data() : null;
}

export function requireAuthAndRole(requiredRole=null){
  return new Promise((resolve)=>{
    onAuthStateChanged(auth, async (user)=>{
      if(!user){ location.href="./login.html"; return; }
      const data = await getUserDoc(user.uid);
      if(!data?.role){ location.href="./login.html"; return; }
      if(requiredRole && data.role !== requiredRole){ location.href="./index.html"; return; }
      resolve({ user, data });
    });
  });
}

export async function doLogout(){
  await signOut(auth);
  location.href="./login.html";
}
