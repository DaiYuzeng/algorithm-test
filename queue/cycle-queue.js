class CycleQueue {
  constructor(length) {
    this.head = 0;
    this.tail = 0;
    this.items = new Array(length);
    this.length = length;
  }

  push(item) {
    // (head + 1) % n === head True 队列满
    // 循环队列tail指向的位置不存储数据
    // 可以把取余数的过程想象为在这条循环队列上转圈，tail要落脚的地方不能是head
    const n = this.length;

    if ((this.tail + 1) % n === this.tail) throw new Error('队列满了')
    
    this.items[this.tail] = item;
    this.tail = (this.tail + 1) % n
    
  }

  pop() {
    if (this.head === this.tail) throw new Error('队列空了');

    this.items[this.head] = undefined;
    this.head = (this.head + 1) % this.length
  }
}

const cycleQueue = new CycleQueue(5);

cycleQueue.push(1)
cycleQueue.push(2)
cycleQueue.push(3)
cycleQueue.push(4)
cycleQueue.pop()
cycleQueue.push(5)
cycleQueue.pop()
cycleQueue.push(6)
cycleQueue.push(6)
console.log(cycleQueue)
