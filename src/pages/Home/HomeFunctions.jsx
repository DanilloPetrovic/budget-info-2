import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { getUser } from "../../firebase";

export const getBudget = (user, valute) => {
  let allIncomeRSD = 0;
  let allSpentRSD = 0;

  user.income.forEach((income) => {
    if (income.currency === "RSD") {
      allIncomeRSD += income.amount;
    } else if (income.currency === "EUR") {
      allIncomeRSD += income.amount * 117.5;
    } else if (income.curren === "USD") {
      allIncomeRSD += income.amount * 106.5;
    }
  });

  user.expenses.forEach((expense) => {
    if (expense.curren === "RSD") {
      allSpentRSD += expense.amount;
    } else if (expense.curren === "EUR") {
      allSpentRSD += expense.amount * 117.5;
    } else if (expense.curren === "USD") {
      allSpentRSD += expense.amount * 106.5;
    }
  });

  if (valute === "RSD") {
    return {
      income: Math.round(allIncomeRSD),
      expenses: Math.round(allSpentRSD),
      balance: Math.round(allIncomeRSD - allSpentRSD),
    };
  } else if (valute === "EUR") {
    return {
      income: Math.round(allIncomeRSD / 117.5),
      expenses: Math.round(allSpentRSD / 117.5),
      balance: Math.round((allIncomeRSD - allSpentRSD) / 117.5),
    };
  } else if (valute === "USD") {
    return {
      income: Math.round(allIncomeRSD / 106.5),
      expenses: Math.round(allSpentRSD / 106.5),
      balance: Math.round((allIncomeRSD - allSpentRSD) / 106.5),
    };
  }
};

export const createIncomeCategory = async (user, categoryData) => {
  const usersCollection = collection(db, "users");
  const userDoc = doc(usersCollection, user.id);

  const categoryExists = user.incomeCategories.some(
    (category) =>
      category.name.toLowerCase().trim() ===
      categoryData.name.toLowerCase().trim()
  );

  if (categoryExists) {
    alert(`Category "${categoryData.name}" already exists`);
    return;
  }

  const updatedIncomeCategories = [...user.incomeCategories, categoryData];

  try {
    await updateDoc(userDoc, {
      incomeCategories: updatedIncomeCategories,
    });

    alert(`Category "${categoryData.name}" created successfully`);
    getUser();
  } catch (error) {
    console.log(error);
  }
};

export const createIncome = async (user, incomeData) => {
  const usersCollection = collection(db, "users");
  const userDoc = doc(usersCollection, user.id);
  const updatedIncome = [...user.income, incomeData];

  try {
    await updateDoc(userDoc, {
      income: updatedIncome,
    });

    alert(`Income created successfully`);
    getUser();
  } catch (error) {
    console.log(error);
  }
};
