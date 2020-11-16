/*----------------------------------------------------------------------------------
* about:策略模式是一种行为设计模式， 它能让你定义一系列算法， 并将每种算法分别放入独立的类中， 以使算法的对象能够相互替换。
* author:马兆铿（810768333@qq.com）
* date:2019-12-26
* ----------------------------------------------------------------------------------*/
class Duck {
  flyBehavior() {
    // 方法的选择
    return {
      fly: () => '能飞',
      cantFly: () => '不能飞'
    }
  }

  display() {
    return `看起来是${this.constructor.name}`
  }
}

/* ----------------------------------------- 子类 ----------------------------------------- */
class RubberDuck extends Duck {
  constructor() {
    super()
    this.fly = this.flyBehavior().cantFly
  }
}

class MuteDuck extends Duck {
  constructor() {
    super()
    this.fly = this.flyBehavior().fly
  }
}

/* ----------------------------------------- 模拟 ----------------------------------------- */
const rubberDuck = new RubberDuck()
const muteDuck = new MuteDuck()
console.log(rubberDuck.display(), rubberDuck.fly())
console.log(muteDuck.display(), muteDuck.fly())
