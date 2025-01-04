import { db, getUser } from "../../firebase";
import { collection, doc, updateDoc } from "firebase/firestore";

export const addTask = async (values, user) => {
  const usersCollection = collection(db, "users");
  const userDoc = doc(usersCollection, user.id);

  const toDoData = {
    id: crypto.randomUUID(),
    title: values.title,
    description: values.description,
    isDone: false,
    date: new Date().toISOString(),
    userId: user.id,
  };

  const updatedToDo = [...user.toDo, toDoData];

  try {
    await updateDoc(userDoc, {
      toDo: updatedToDo,
    });

    getUser();
  } catch (error) {
    console.log(error);
  }
};

export const convertTime = (time) => {
  try {
    if (!time) return "N/A";

    if (typeof time === "string") {
      const date = new Date(time);
      return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    if (time.seconds) {
      const date = new Date(time.seconds * 1000);
      return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    if (time instanceof Date) {
      return time.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    return "N/A";
  } catch (error) {
    console.error("Error converting time:", error);
    return "N/A";
  }
};

export const CompleteTask = async (id, user) => {
  const usersCollection = collection(db, "users");
  const userDoc = doc(usersCollection, user.id);

  const updatedToDo = user.toDo.map((todo) =>
    todo.id === id ? { ...todo, isDone: true } : todo
  );

  try {
    await updateDoc(userDoc, { toDo: updatedToDo });
    getUser();
  } catch (error) {
    console.log(error);
  }
};

export const NotCompleteTask = async (id, user) => {
  const usersCollection = collection(db, "users");
  const userDoc = doc(usersCollection, user.id);

  const updatedToDo = user.toDo.map((todo) =>
    todo.id === id ? { ...todo, isDone: false } : todo
  );

  try {
    await updateDoc(userDoc, { toDo: updatedToDo });
    getUser();
  } catch (error) {
    console.log(error);
  }
};

export const DeleteTask = async (id, user) => {
  const usersCollection = collection(db, "users");
  const userDoc = doc(usersCollection, user.id);

  const updatedToDo = user.toDo.filter((todo) => todo.id !== id);

  const userResponse = window.confirm(
    "Are you sure you want to delete this task?"
  );

  if (userResponse) {
    try {
      await updateDoc(userDoc, { toDo: updatedToDo });
      getUser();
    } catch (error) {
      console.log(error);
    }
  }
};
