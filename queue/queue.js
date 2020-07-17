const _move = Symbol('move');

class Queue {
  constructor(length) {
    this.head = 0;
    this.tail = 0;
    this.items = new Array(length);
    this.length = length;
  }

  push(item) {
    if (this.tail === this.length && this.head === 0) throw new Error('队列已满！');
    // 当尾指针指向最后一个位置后，如果再推入新元素，并且队列还有空间，向前横移队列
    if( this.tail === this.length && this.head !== 0) this[_move];

    this.items[this.tail] = item;
    this.tail++;
  }

  pop() {
    if (this.head === this.tail) throw new Error('队列已空');
    this.items[this.head] = undefined;
    this.head++;
  }

  [_move]() {
    for(let i = this.head; i < this.tail; i++) {
      this.items[i - this.head] = this.items[i];
    }

    this.tail -= this.head;
    this.head = 0;
  }
}

const queue = new Queue(10);

queue.push(1)
queue.push(2)
queue.push(3)
queue.push(4)
queue.push(5)
queue.push(6)
queue.pop()

console.log(queue)