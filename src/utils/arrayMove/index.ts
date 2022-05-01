export default function arrayMove<T>(arr: Array<T>, oldIndex: number, newIndex: number): Array<T> {
  if (newIndex >= arr.length || newIndex < 0) {
    throw new Error("arrayMove: newIndex is out of bounds");
  }
  if (oldIndex >= arr.length || oldIndex < 0) {
    throw new Error("arrayMove: oldIndex is out of bounds");
  }
  if (oldIndex === newIndex) {
    return arr;
  }
  const newArr = [...arr];
  newArr.splice(newIndex, 0, newArr.splice(oldIndex, 1)[0]);
  return newArr;
}
