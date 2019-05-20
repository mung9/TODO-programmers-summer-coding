export function isOverdue(due) {
  const endOfTheDueDate = new Date(due);
  endOfTheDueDate.setDate(endOfTheDueDate.getDate() + 1);

  const now = new Date();

  return endOfTheDueDate.getTime() < now.getTime();
}
