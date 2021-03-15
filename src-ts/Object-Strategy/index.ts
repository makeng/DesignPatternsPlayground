/*----------------------------------------------------------------------------------
* TS 的作用：
* - interface 提供了子类的形状
* ----------------------------------------------------------------------------------*/
import * as types from './types'

class Duck {
  flyBehavior () {
    // 方法的选择
    return {
      fly: () => '能飞',
      cantFly: () => '不能飞'
    }
  }

  display () {
    return `看起来 ${this.constructor.name}`
  }
}

/* ----------------------------------------- 子类 ----------------------------------------- */
class RubberDuck extends Duck implements types.DuckLike {
  fly: () => {}

  constructor () {
    super()
    this.fly = this.flyBehavior().cantFly
  }
}

class MuteDuck extends Duck implements types.DuckLike {
  fly: () => {}

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
