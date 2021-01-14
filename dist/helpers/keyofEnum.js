export default function keyofEnum(_enum) {
  const keys = Object.keys(_enum).filter((x) => !(parseInt(x) >= 0));
  keys.splice(0, 2);
  return keys;
}
