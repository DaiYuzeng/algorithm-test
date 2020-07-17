// 基于数组实现的顺序栈
class Stack {
  constructor(length) {
    this.length = length;
    this.pointer = 0;
    this.content = new Array(length);
  }
  push(data) {
    if (this.pointer === this.length) {
      throw new Error('空间不足');
    }
    this.content[this.pointer] = data;
    this.pointer += 1;
  }
  pop() {
    const ele = this.get();

    if (ele === null) return null;
    this.content[this.pointer - 1] = null;
    this.pointer -= 1

    return ele;
  }

  get() {
    if (this.pointer === 0) return null;
    return this.content[this.pointer - 1]
  }
}

// const stack = new Stack(10);
// stack.push('吼猴')
// console.log(stack)
// stack.pop()
// console.log(stack)
// stack.push('吼猴吼猴')
// console.log(stack)

// 基于栈来实现 表达式求值(小括号暂时不支持)
// 1) 实例化两个栈，一个存数，一个存运算符
// 2) 表达式中遇到数字直接存到栈里
// 3) 遇到运算符，得和栈顶元素比对，如果优先级高于栈顶元素，存入栈中
// 4) 如果低于或者等于，从数字栈取出两个元素使用运算符栈的栈顶元素进行计算
// 5) 最后从栈顶开始计算，直到空栈
function expressionEvaluation() {
  const expression = '13+6*5-30/3';
  const reg = /\+|\-|\*|\//g;
  const numberArray = expression.replace(reg, ',').split(',');
  const operatorArray = expression.match(reg);
  const length = numberArray.length;

  // 1)
  const numberStack = new Stack(length);
  const operatorStack = new Stack(length - 1);

  const tempArray = [];

  for(let i = 0; i < length - 1; i++) {
    tempArray.push(numberArray[i]);
    tempArray.push(operatorArray[i]);
  }

  tempArray.push(numberArray[length - 1]);

  for(let i = 0; i < tempArray.length;i++) {
    if (i % 2 === 0) {
      numberStack.push(parseInt(tempArray[i]));
      continue;
    }
    
    const item = tempArray[i];
    const existOperator = operatorStack.get()
    if (existOperator === null || newlyHigherPriority(existOperator, item) || numberStack.pointer === 0) {
      // 3)
      operatorStack.push(item)
    } else {
      // 4)
      const result = calculate(numberStack.pop(), numberStack.pop(), operatorStack.pop())
      numberStack.push(result);
      operatorStack.push(item);
    }
  }

  // 5)
  let operator = operatorStack.get();

  while(operator !== null) {
    const result = calculate(numberStack.pop(), numberStack.pop(), operatorStack.pop())
    numberStack.push(result);
    operator = operatorStack.get();
  }

  console.log(numberStack.pop())
}

// 最终返回：新运算符 > 旧有 才返回 True
function newlyHigherPriority(exist, newly) {
  const o_priority = {
    '+': 0,
    '-': 0,
    '*': 1,
    '/': 1
  }

  return o_priority[newly] > o_priority[exist]
}

function calculate(passiveNumber, drivingNumber, operator) {
  switch(operator) {
    case '+':
      return drivingNumber + passiveNumber
      break;
    case '-':
      return drivingNumber - passiveNumber
      break;
    case '*':
      return drivingNumber * passiveNumber
      break;
    case '/':
      return drivingNumber / passiveNumber
      break;
  }
}

expressionEvaluation()