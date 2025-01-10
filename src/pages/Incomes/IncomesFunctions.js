import { db } from "../../firebase";
import { doc, updateDoc, collection } from "firebase/firestore";
import { getUser } from "../../firebase";

export const deleteCategory = async (user, category) => {
  const usersCollection = collection(db, "users");
  const userDoc = doc(usersCollection, user.id);
  const updatedIncomeCategories = user.incomeCategories.filter(
    (c) => c.id !== category.id
  );

  const updatedIncomes = user.income.filter(
    (income) => income.category !== category.name
  );

  if (
    window.confirm(
      "Deleting a category will also delete all incomes associated with it."
    )
  ) {
    try {
      await updateDoc(userDoc, {
        incomeCategories: updatedIncomeCategories,
      });

      await updateDoc(userDoc, {
        income: updatedIncomes,
      });

      getUser();
    } catch (error) {
      console.log(error);
    }
  }
};
