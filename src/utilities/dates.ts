export function calculateDaysInMonth(year: number, month: number){
  return new Date(year, month + 1, 0).getDate();
}

export function calculateStartDayOfMonth(year: number, month: number) {
  const firstDayOfMonth = new Date(year, month, 1);
  return firstDayOfMonth.getDay();
}
