import { db, auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

export const registerUser = async (
  email,
  password,
  username,
  navigateFn,
  setLoading
) => {
  setLoading(true);
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(userCredential.user, {
      displayName: username,
    });

    await addDoc(collection(db, "users"), {
      uid: userCredential.user.uid,
      name: username,
      email: email,
      expenses: [],
      expensesCategories: [],
      incomes: [],
      incomesCategories: [],
      notes: [],
      createdAt: new Date(),
      toDo: [],
    });

    localStorage.setItem("token", userCredential.user.uid);
    console.log(userCredential.user.accessToken);
    navigateFn("/");
  } catch (error) {
    console.log(error);
  }
  setLoading(false);
};

export const loginUser = async (email, password, navigateFn, setLoading) => {
  setLoading(true);
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    localStorage.setItem("token", userCredential.user.uid);
    console.log("radi");
    navigateFn("/");
  } catch (error) {
    console.log(error);
  }
  setLoading(false);
};
