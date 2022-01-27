/*----------------------------------------------------------------------------------
* TS 的作用：
* - 实现接口
* ----------------------------------------------------------------------------------*/
import * as types from './types'

class Beverage implements types.Drink {
  price = '0'

  getDescription () {
    return this.constructor.name + ' Coffee: '
  }

  cost () {
    return `$${Number(this.price).toFixed(2)}`
  }
}

/* ----------------------------------------- 子类 ----------------------------------------- */
class HouseBlend extends Beverage { // mocha,mocha,whip
  constructor () {
    super() // 继承（方法）
    let beverage = new Beverage() // 继承（属性）
    beverage = new Mocha(beverage) // 装饰
    beverage = new Mocha(beverage)
    beverage = new Whip(beverage)
    Object.assign(this, beverage) // 合并
  }
}

class DarkRoast extends Beverage { // soy,mocha,whip
  constructor () {
    super()
    let beverage = new Beverage()
    beverage = new Soy(beverage)
    beverage = new Mocha(beverage)
    beverage = new Whip(beverage)
    Object.assign(this, beverage)
  }
}

/* ----------------------------------------- 装饰者 ----------------------------------------- */
class CondimentDecorator implements types.Drink {
  price = '0'

  getDescription () {
    return this.constructor.name
  }

  cost () {
    return this.price
  }
}

/* ----------------------------------------- 材料 ----------------------------------------- */
class Mocha extends CondimentDecorator {
  constructor (beverage) {
    super()
    beverage.price = Number(beverage.price) + 0.2
    return beverage
  }
}

class Milk extends CondimentDecorator {
  constructor (beverage) {
    super()
    beverage.price = Number(beverage.price) + 0.1
    return beverage
  }
}

class Soy extends CondimentDecorator {
  constructor (beverage) {
    super()
    beverage.price = Number(beverage.price) + 0.4
    return beverage
  }
}

class Whip extends CondimentDecorator {
  constructor (beverage) {
    super()
    beverage.price = Number(beverage.price) + 0.3
    return beverage
  }
}

// 模拟购买
const houseBlend = new HouseBlend()
const darkRoast = new DarkRoast()
console.log('<JS Coffee Shop>')
console.log(houseBlend.getDescription(), houseBlend.cost())
console.log(darkRoast.getDescription(), darkRoast.cost())

