import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const getBudget = (user, valute) => {
  const allIncomeRSD = 0;
  const allSpentRSD = 0;

  user.income.forEach((income) => {
    if (income.valute === "RSD") {
      allIncomeRSD += income.amount;
    } else if (income.valute === "EUR") {
      allIncomeRSD += income.amount * 117.5;
    } else if (income.valute === "USD") {
      allIncomeRSD += income.amount * 106.5;
    }
  });

  user.expenses.forEach((expense) => {
    if (expense.valute === "RSD") {
      allSpentRSD += expense.amount;
    } else if (expense.valute === "EUR") {
      allSpentRSD += expense.amount * 117.5;
    } else if (expense.valute === "USD") {
      allSpentRSD += expense.amount * 106.5;
    }
  });

  if (valute === "RSD") {
    return {
      income: allIncomeRSD,
      expenses: allSpentRSD,
      balance: allIncomeRSD - allSpentRSD,
    };
  } else if (valute === "EUR") {
    return {
      income: allIncomeRSD / 117.5,
      expenses: allSpentRSD / 117.5,
      balance: allIncomeRSD / 117.5 - allSpentRSD / 117.5,
    };
  } else if (valute === "USD") {
    return {
      income: allIncomeRSD / 106.5,
      expenses: allSpentRSD / 106.5,
      balance: allIncomeRSD / 106.5 - allSpentRSD / 106.5,
    };
  }
};

export const createCategory = async (user, categoryData) => {
  const usersCollection = collection(db, "users");
  const userDoc = doc(usersCollection, user.id);

  const updatedCategories = [...user.incomeCategories, categoryData];

  try {
    await updateDoc(userDoc, {
      incomeCategories: updatedCategories,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createIncome = async (user, incomeData) => {
  const usersCollection = collection(db, "users");
  const userDoc = doc(usersCollection, user.id);

  const updatedIncomes = [...user.incomes, incomeData];

  try {
    await updateDoc(userDoc, {
      incomes: updatedIncomes,
    });
  } catch (error) {
    console.log(error);
  }
};
