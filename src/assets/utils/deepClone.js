import { typeOf } from "./other";

function deepClone(data) {
  const t = typeOf(data);
  let o;

  if (t === "array") {
    o = [];
  } else if (t === "object") {
    o = {};
  } else {
    return data;
  }

  if (t === "array") {
    for (let i = 0; i < data.length; i++) {
      o.push(deepClone(data[i]));
    }
  } else if (t === "object") {
    for (let i in data) {
      o[i] = deepClone(data[i]);
    }
  }

  return o;
}

export default deepClone;
