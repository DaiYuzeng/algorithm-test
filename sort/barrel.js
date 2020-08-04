// 当桶排不需要那么多桶时，采用计数排序
const arr = [2,1,1,4,3,2,5,5,0,3,4,2]

function count() {
  const r = new Array(6).fill(0);
  const result = [];
  let sumTemp = 0;
  
  for(let i = 0; i < arr.length; i++) {
    r[arr[i]]++;
  }

  for(let i = 0; i < r.length; i++) {
    r[i] += sumTemp;
    sumTemp = r[i];
  }

  for(let i = arr.length - 1; i >= 0; i--) {
    result[r[arr[i]] - 1] = arr[i];
    r[arr[i]] -= 1;
  }

  return result;
}

console.log(count(arr));

// 小写放最前，大写放最后，数字放中间
const arr2 = ['a', 2, 'C', 'd', 4, 'c', 'z', 12, 'E']

function count2(arr) {
  const l = [];
  const u = [];
  const n = [];

  for(let i = 0; i < arr.length; i++) {
    if (/[a-z]/.test(arr[i])) {
      l.push(arr[i]);
      continue;
    }

    if (/[A-Z]/.test(arr[i])) {
      u.push(arr[i]);
      continue;
    }

    n.push(arr[i]);
  }

  return l.concat(n).concat(u);
}

console.log(count2(arr2));