const test = [4, 2, 8, 1, 3, 5]

const bubbleSort = (arr) => {
  for(let i = 0; i < arr.length; i++) {
    let changed = false;

    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j]

        arr[j] = arr[j + 1]
        arr[j + 1] = temp
        changed = true
      }
    }

    if (!changed) {
      break;
    }
  }
  
  return arr
}

console.log(bubbleSort(test))