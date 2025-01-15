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

export const getTotalIncome = (user, incomes, currency) => {
  let total = 0;

  incomes.forEach((income) => {
    if (income.currency === "RSD") {
      total += income.amount;
    } else if (income.currency === "EUR") {
      total += income.amount * 117.5;
    } else if (income.currency === "USD") {
      total += income.amount * 108.5;
    }
  });

  if (currency === "RSD") {
    return Math.round(total);
  } else if (currency === "EUR") {
    return Math.round(total / 117.5);
  } else if (currency === "USD") {
    return Math.round(total / 108.5);
  }
};

export const handleDeleteIncome = async (user, incomeId) => {
  const usersCollection = collection(db, "users");
  const userDoc = doc(usersCollection, user.id);

  const updatedIncomes = user.income.filter((income) => income.id !== incomeId);

  if (window.confirm("Are you sure you want to delete this income?")) {
    try {
      await updateDoc(userDoc, {
        income: updatedIncomes,
      });

      getUser();
    } catch (error) {
      console.log(error);
    }
  }
};
