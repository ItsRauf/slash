export default function keyofEnum(_enum) {
  return Object.keys(_enum).filter((x) => !(parseInt(x) >= 0));
}
