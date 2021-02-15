export function todayDate() {
  return new Date();
}

export function tomorrowDate() {
  const today = todayDate();

  return new Date(today.getTime() + 1000*60*60*24);
}
