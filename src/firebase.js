import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { store } from "./store/store";
import { userSlice } from "./store/userSlice";
import { getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCscBFAqJCn9keJdQ8221ddXbH-O6vRPzo",
  authDomain: "budget-info-2.firebaseapp.com",
  projectId: "budget-info-2",
  storageBucket: "budget-info-2.firebasestorage.app",
  messagingSenderId: "403946734111",
  appId: "1:403946734111:web:666127ec1e311552e7cb2a",
  measurementId: "G-YRTSNELMSV",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const getUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const data = await getDocs(collection(db, "users"));
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    const myProfile = filteredData.find((user) => user.uid === token);

    if (myProfile) {
      store.dispatch(
        userSlice.actions.setData({
          uid: myProfile.uid,
          username: myProfile.name,
          email: myProfile.email,
          expenses: myProfile.expenses || [],
          expensesCategories: myProfile.expensesCategories || [],
          income: myProfile.income || [],
          incomeCategories: myProfile.incomeCategories || [],
          notes: myProfile.notes || [],
          createdAt: myProfile.createdAt,
          id: myProfile.id,
          toDo: myProfile.toDo || [],
        })
      );
    }
    return myProfile;
  } catch (error) {
    console.error("Greška pri dobijanju korisnika:", error);
    return null;
  }
};
