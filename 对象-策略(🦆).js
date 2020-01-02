/*----------------------------------------------------------------------------------
* about:HeadFirst设计模式-策略模式
* author:马兆铿（810768333@qq.com）
* date:2019-12-26
* ----------------------------------------------------------------------------------*/

class Duck {
  flyBehavior () {
    return {
      fly: () => '能飞',
      cantFly: () => '不能飞'
    }
  }

  display () {
    return `看起来是${this.constructor.name}`
  }
}

/* ----------------------------------------- 子类 ----------------------------------------- */
class RubberDuck extends Duck {
  constructor () {
    super()
    this.fly = this.flyBehavior().cantFly
  }
}

class MuteDuck extends Duck {
  constructor () {
    super()
    this.fly = this.flyBehavior().fly
  }
}

/* ----------------------------------------- 模拟 ----------------------------------------- */
const rubberDuck = new RubberDuck()
const muteDuck = new MuteDuck()
console.log(rubberDuck.display(), rubberDuck.fly())
console.log(muteDuck.display(), muteDuck.fly())
