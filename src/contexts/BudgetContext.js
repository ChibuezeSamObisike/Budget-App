import React, { useContext, useState } from "react";
import { v4 as uuid } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

const BudgetContext = React.createContext();

export const UNCATEGORIZED_BUDGET_ID = "uncategorized";

export function useBudgets() {
  return useContext(BudgetContext);
}

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

  function getBudgetExpenses(budgetId) {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  }

  function addExpense({ description, amount, budgetId }) {
    setExpenses((prevExpenses) => {
      return [...prevExpenses, { id: uuid, description, amount, budgetId }];
    });
  }

  function addBudget({ name, max }) {
    setBudgets((prevBudgets) => {
      if (prevBudgets.find((budgets) => budgets.name === name)) {
        return prevBudgets;
      }
      return [...prevBudgets, { id: uuid, name, max }];
    });
  }
  function deleteBudget({ id }) {
    //TODO: Deal with expenses
    setBudgets((prev) => {
      return prev.filter((bdgt) => bdgt.id !== id);
    });
  }
  function deleteExpense({ id }) {
    setExpenses((prevExpenses) => {
      return prevExpenses.map((expense) => {
        if (expense.budgetId !== id) return expense;
        return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID };
      });
    });
    setExpenses((prev) => {
      return prev.filter((bdgt) => bdgt.id !== id);
    });
  }

  return (
    <BudgetContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
