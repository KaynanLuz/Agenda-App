import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCR6zs1uCbD9aPd9QP2UE8hyhZ943LS5Gc",
  authDomain: "appcontatos-817e7.firebaseapp.com",
  projectId: "appcontatos-817e7",
  storageBucket: "appcontatos-817e7.appspot.com",
  messagingSenderId: "352501288153",
  appId: "1:352501288153:web:11412ded1281ef9e0882c8",
  measurementId: "G-1Y7NVCGPHQ"
};

  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);

  export { db };