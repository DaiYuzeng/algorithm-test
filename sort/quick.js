function quickSort(arr) {
  // 交换
  function swap(arr, a, b) {
      var temp = arr[a];
      arr[a] = arr[b];
      arr[b] = temp;
  }

  // 分区
  function partition(arr, left, right) {
    const pivot = arr[right];
    let storeIndex = left;

    for(let i = left; i < right; i++) {
      if (arr[i] > pivot) continue;

      swap(arr, i, storeIndex);
      storeIndex++;
    }

    swap(arr, storeIndex, right);

    return storeIndex;
  }

  function sort(arr, left, right) {
    if (left > right) return;

    const storeIndex = partition(arr, left, right);
    sort(arr, left, storeIndex - 1);
    sort(arr, storeIndex + 1, right)
  }

  sort(arr, 0, arr.length - 1);
  return arr;
}

console.log(quickSort([8, 4, 90, 8, 34, 67, 1, 26, 17]));
// pivot = 17, storeIndex = 0, left = 0, right = 8
// 8, storeIndex = 1
// 8,4 storeIndex = 2
// 8,4,90, storeIndex = 2
// 8,4,8,90, storeIndex = 3
// 8,4,8,90,34, storeIndex = 3
// 8,4,8,90,34,67, storeIndex = 3
// 8,4,8,1,34,67,90,26,17, storeIndex = 4
// 8,4,8,1,17,67,90,26,34, storeIndex = 4
// ------------
// 41sort, 8,4,8,1, storeIndex = 4, left = 0, right = 3
// 1,4,8,8,17,67,90,26,34, storeIndex = 0
// ------------
// 41sort, storeIndex = 0, left = 0, right = -1
// 38 left > right return
// ------------
// 42sort, storeIndex = 4, left = 1, right = 3
// 
