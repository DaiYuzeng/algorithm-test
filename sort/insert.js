const test = [3,2,5,8,7,4,11,1,9,6]
// 3,2,5,8,7,4 i = 0; needsMove = false
// 2,3,5,8,7,4 i = 1; needsMove = true; position = 0
// 2,3,4,5,8,7
// 2,3,4,5,7,8

// 这是我自己实现的插入排序，笨重，能看得出个人思考的痕迹
const insertSort = (arr) =>  {
  for(i = 0; i < arr.length; i++) {
    let needsMove = false;
    let position = 0;

    for(j = 0; j < i; j++) {
      if (arr[i] < arr[j]) {
        position = j;
        needsMove = true;
        break;
      }
    }

    if (needsMove) {
      let insertItem = arr[i];
      
      for(let k = i; k > position; k--) {
        arr[k] = arr[k - 1];
      }

      arr[position] = insertItem;
    }
  }
  
  return arr;
}

// 网上借鉴
const insertSort2 = (arr) => {
  // 从1开始是因为下标0时，有序数组的长度也为0，不用比较
  for(let i = 1; i < arr.length; i++) {
    let temp = arr[i];
    // 将j最后的值保存起来，这个值就是temp需要插入的位置
    let j = i;

    for(; j > 0; j--) {
      // 如果temp > 前一个 证明前面的是有序数组，直接推出循环
      if (temp >= arr[j - 1]) {
        break;
      }
      // 如果不是有序，就开始腾位置，当前位置的值 = 上一个位置的值
      arr[j] = arr[j - 1];
    }
    // 一直腾到 >= 时，这个位置就是temp要插入的位置
    arr[j] = temp
  }

  return arr;
}

console.log(insertSort2(test));