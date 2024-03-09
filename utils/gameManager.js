export const shuffleArray = (arr) => {
  const copyArr = [...arr];
  for (let i = copyArr.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [copyArr[i], copyArr[rand]] = [copyArr[rand], copyArr[i]];
  }
  return copyArr;
};

export const randomSubArray = (arr, len) => {
  const shuffle = shuffleArray(arr);
  return len >= shuffle.length ? shuffle : shuffle.slice(0, len);
};

export const createLevel = (db, modifier) => {
  const len = 4 + (modifier - 1) * 2;
  return randomSubArray(db, len).map((info) => ({
    name: info.name,
    id: `${info.head}${info.tail}`,
    image: info.image,
    clicked: false,
  }));
};
