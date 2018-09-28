// limit the number of events per second
export default function throttle(cb, delay) {
  let previousCall = new Date().getTime();

  return function(...args) {
    const time = new Date().getTime();

    if (time - previousCall >= delay) {
      previousCall = time;
      cb(...args);
    }
  };
}
