const test = [5,8,1,7,6,9,3,4,2,10]

// 归并排序的中心思想是分治
// 要将排序的list，分到最小单元，也就是20行的递归终止条件
// 然后层层返回最小单元 -> 最大单元 依次排序
function merge(leftArr, rightArr){  
  const result = [];

  while(leftArr.length > 0 && rightArr.length > 0) {
    if (leftArr[0] < rightArr[0]) {
      result.push(leftArr.shift())
    } else {
      result.push(rightArr.shift())
    }
  }
  // 当左右数组长度不一致时需要将遗留的元素也合并到结果集当中
  return result.concat(leftArr).concat(rightArr);
}

function mergeSort(array){  
  if (array.length === 1) return array;

  const middle = Math.floor(array.length / 2);
  const left = array.slice(0, middle)
  const right = array.slice(middle, array.length)
  // 这里要时刻想着 代码是按顺序执行的，当mergeSort(left)全都执行完 才会执行后面的right
  return merge(mergeSort(left), mergeSort(right));
}

console.log(mergeSort(test));