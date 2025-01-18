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

export const incomeFiltersFunctions = (
  user,
  selectedCategory,
  selectedDate,
  searchInputValue
) => {
  const filteredIncomes = user?.income?.filter((income) => {
    const matchesCategory =
      !selectedCategory ||
      selectedCategory === "All" ||
      income.category === selectedCategory;
    const matchesSearch = income.message
      .toLowerCase()
      .includes(searchInputValue.toLowerCase());

    const incomeDate = new Date(income.date);
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 1); // Početak godine
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // Početak meseca
    const startOfWeek = new Date(today); // Preserving the original today date
    startOfWeek.setDate(today.getDate() - today.getDay()); // Početak nedelje (nedelja)

    let matchesDate = false;

    if (selectedDate === "alltime") {
      matchesDate = true;
    } else if (selectedDate === "thisweek") {
      matchesDate = incomeDate >= startOfWeek && incomeDate <= today;
    } else if (selectedDate === "thismonth") {
      matchesDate = incomeDate >= startOfMonth && incomeDate <= today;
    } else if (selectedDate === "thisyear") {
      matchesDate = incomeDate >= startOfYear && incomeDate <= today;
    }

    return matchesCategory && matchesSearch && matchesDate;
  });

  return filteredIncomes;
};
