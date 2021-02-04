export default function keyofEnum<T>(_enum: T) {
  //@ts-ignore
  return Object.keys(_enum).filter((x) => !(parseInt(x) >= 0));
}
