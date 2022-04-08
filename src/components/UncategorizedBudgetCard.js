import React from "react";
import BudgetCard from "./BudgetCard";
import { useBudgets } from "../contexts/BudgetContext";
import { UNCATEGORIZED_BUDGET_ID } from "../contexts/BudgetContext";

export default function (props) {
  const { getBudgetExpenses } = useBudgets();
  const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
    (total, expense) => total + expense.amount,
    0
  );

  if (amount === 0) return null;
  return <BudgetCard gray name="Uncategorized" {...props}></BudgetCard>;
}
