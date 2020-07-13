// 使用数组实现LRU
class LRU {
  constructor() {
    this.s_arr = new Array()
    this.maxLength = 10
  }

  update(v) {
    const arr = this.s_arr;
    let foundIndex = undefined;

    for(let i = 0; i < arr.length; i++) {
      if (v === arr[i]) {
        foundIndex = i;
        break;
      }
    }

    if(foundIndex) {
      this.remove(foundIndex)
      this.unshift(v)
      
      return console.log(this.s_arr);
    }

    if (arr.length >= this.maxLength) {
      this.remove(arr.length - 1)
      this.unshift(v)
    } else {
      this.unshift(v)
    }

    console.log(this.s_arr)
  }

  unshift(v) {
    const arr = this.s_arr;
    const newArr = new Array(arr.length + 1);

    arr.length += 1
    for(let i = arr.length - 1; i > 0; i--) {
      arr[i] = arr[i - 1]
    }
    arr[0] = v;
  }

  remove(index) {
    const arr = this.s_arr;

    for(let i = index; i < arr.length; i++) {
      arr[i] = arr[i + 1]
    }

    arr.length -= 1
  }

  test() {
    for(let i = 0; i < 15; i++) {
      this.update(i)
    }
  }
  test2() {
    for(let i = 5; i < 10; i++) {
      this.update(i)
    }
  } 
}
  
const lru = new LRU()
lru.test()
lru.test2()
