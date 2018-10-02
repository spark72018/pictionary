export default function getRandomIndex(arr) {
  // referenced from https://stackoverflow.com/questions/5915096/get-random-item-from-javascript-array
  return arr[Math.floor(Math.random() * arr.length)];
}
