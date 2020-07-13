// 带头单链表/带头循环单链表
(function() {
  class Node {
    constructor(data) {
      this.data = data;
      this.next = null;
    }
  }
  class NodeList {
    constructor() {
      this.head = {
        // next: this.head
        next: null
      }

      this.lastNode = this.head;
      this.length = 0;
    }

    create(data) {
      return new Node(data)
    }

    add() {
      let pos, data;

      if (arguments.length > 1) {
        [pos, data] = arguments
      } else {
        data = arguments[0]
      }

      const newNode = this.create(data);

      if (pos && pos > this.length) {
        throw new Error('不允许下标越界')
      }

      this.length++;
      
      if (pos) {
        const node = this.findPrevByPosition(pos);

        newNode.next = node.next;
        node.next = newNode;

        return;
      }

      // newNode.next = this.head;
      this.lastNode.next = newNode;
      this.lastNode = newNode;
    }

    find(data) {
      let currentNode = this.head.next;

      while(currentNode.data !== data) {
        currentNode = currentNode.next
      }

      return currentNode;
    }

    findPrev(data) {
      let currentNode = this.head;

      while(currentNode.next !== data) {
        currentNode = currentNode.next
      }

      return currentNode;
    }

    findByPosition(pos) {
      let currentNode = this.head.next;
      let i = 0;

      while(i < pos) {
        currentNode = currentNode.next;
        i++;
      }

      return currentNode;
    }

    findPrevByPosition(pos) {
      let currentNode = this.head;
      let i = 0;

      while(i < pos) {
        currentNode = currentNode.next;
        i++;
      }

      return currentNode;
    }

    remove(data) {
      this.length--;

      // 如果是最后一个节点
      if (data.next === null) {
        const prevNode = this.findPrev(data)
        return prevNode.next = null;
      }

      data.data = data.next.data
      data.next = data.next.next
    }

    removeByPosition(pos) {
      const prevNode = this.findPrevByPosition(pos);
      
      this.length--;
      prevNode.next = prevNode.next.next
    }

    // 单链表反转
    // 局部反转组成整体反转
    // 需要注意的是，指针/复制指针/指针指向新内存地址/指针指向的内存地址的数据变化
    reverse(currentNode = this.head.next) {
      let prevNode = null;
      let nodeTemp = null;

      while(currentNode !== null) {
        nodeTemp = currentNode.next;
        currentNode.next = prevNode;
        prevNode = currentNode;
        currentNode = nodeTemp;
      }

      this.head.next = prevNode;

      return prevNode
    }

    // 是否是单向循环链表
    // 创建两个指针，快/慢
    // 快指针先到null，非循环
    // 快慢指针相遇，循环
    isCycle() {
      let fastNode = this.head, slowNode = this.head, isCycle = false;
      let times = 0;
      
      while(fastNode.next !== null) {
        times++
        if (fastNode.next.next === null) {
          isCycle = false;
          break;
        }
        slowNode = slowNode.next
        fastNode = fastNode.next.next
        
        if (fastNode === slowNode) {
          isCycle = true
          break;
        }
      }

      console.log(times);
      return isCycle;
    }

    // 两个有序单链表的合并
    // 创建两个指针分别指向两个链表
    // 节点值比大小，小值节点被赋给结果链表的节点，并且该链表的指针向下移，大值不动
    // 重复上述操作
    static merge(firstlinked, secondlinked) {
      // {data: 1, next: {data: 3, next: {data: 6, next: {data: 7}}}}
      // {data: 2, next: {data: 4, next: {data: 5}}}
      // expected 1,2,3,4,5,6,7
      let flNode = firstlinked.head.next
      let llNode = secondlinked.head.next
      const resultLinked = new NodeList()
      let rlNode = resultLinked.head

      while(llNode !== null && flNode !== null) {
        if (flNode === null && llNode !== null) {
          rlNode.next = llNode
          break;
        }

        if (llNode === null && flNode !== null) {
          rlNode.next = flNode
          break;
        }

        if (flNode.data > llNode.data) {
          rlNode.next = llNode
          llNode = llNode.next;
        } else {
          rlNode.next = flNode
          flNode = flNode.next;
        }

        rlNode = rlNode.next;
      }

      return resultLinked
    }

    // 删除链表倒数第N个节点
    // 创建两个指针，先行指针，延迟指针
    // 先行指针先向后移动N个节点后，延迟指针开始向后移动
    // 当先行指针指向最后一个节点时，删除延迟指针指向的节点
    removePenultimateNode(n) {
      let tortoiseNode = this.head.next;
      let rabbitNode = this.head.next;
      let i = 0;

      while(tortoiseNode.next !== null) {
        if (i >= n) {
          rabbitNode = rabbitNode.next
        }

        tortoiseNode = tortoiseNode.next
        i++
      }

      if (i < n) {
        throw new Error('要删除的节点不在链表中!')
      }

      this.remove(rabbitNode);
    }

    // 取得链表的中间节点
    // 创建快慢指针，快指针布长为2，慢指针为1
    // 快指针指向最后一个节点时，慢指针指向的节点就是中间节点
    getMiddleNode() {
      let fastNode = this.head.next;
      let slowNode = this.head.next;

      while(fastNode.next !== null && fastNode.next.next !== null) {
        slowNode = slowNode.next;
        fastNode = fastNode.next.next
      }

      return slowNode;
    }
  }

  const linkedList = new NodeList()
  linkedList.add(1)
  linkedList.add(3)
  linkedList.add(6)
  linkedList.add(7)
  const linkedList2 = new NodeList()
  linkedList2.add(2)
  linkedList2.add(4)
  linkedList2.add(5)
  linkedList2.add(11)
  linkedList2.add(6)
  linkedList2.add(7)
  linkedList2.add(8)
  // const result = NodeList.merge(linkedList, linkedList2)
  // console.log(result.head.next.next)
  // linkedList2.removePenultimateNode(3)
  // linkedList.reverse()
  // console.log(linkedList.isCycle())
  // console.log(linkedList2.getMiddleNode())
})()