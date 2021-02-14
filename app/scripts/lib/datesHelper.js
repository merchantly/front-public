export function timeNow() {
  return new Date();
}

export function tomorrowDate() {
  const today = timeNow();

  return new Date(today.getTime() + 1000*60*60*24);
}
