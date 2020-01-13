/*----------------------------------------------------------------------------------
* about:HeadFirst设计模式-工厂模式
* author:马兆铿（810768333@qq.com）
* date:2020-01-02
* ----------------------------------------------------------------------------------*/
class PizzaStore {
  orderPizza (type) {
    const pizza = new Pizza(type)
    pizza.prepare()
    pizza.bake()
    return pizza
  }
}

class Pizza {
  constructor (type) {
    this.type = type
    this.name = type + ' pizza'
  }

  prepare () {
    console.log(`Preparing ${this.name}`)
  }

  bake () {
    console.log(`Baking ${this.name}`)
  }
}

/* ----------------------------------------- 子类 ----------------------------------------- */
class NYPizzaStore extends PizzaStore {
  constructor () {
    super()
    this.address = 'NewYork city'
  }

  deliver (pizza) {
    console.log(`Deliver ${pizza.name} to ${this.address}`)
  }
}

class ChicagoPizzaStore extends PizzaStore {
  constructor () {
    super()
    this.address = 'Chicago city'
  }

  deliver (pizza) {
    console.log(`Deliver ${pizza.name} to ${this.address}`)
  }
}

class NYStyleCheesePizza extends Pizza {
  constructor () {
    super()
  }
}

class ChicagoStyleCheesePizza extends Pizza {
  constructor () {
    super()
  }
}


/* ----------------------------------------- 实例 ----------------------------------------- */
const nYPizzaStore = new NYPizzaStore() // 工厂方法：用子类 NYPizzaStore 来生产 pizza；抽象工厂：工厂类生成子类来生产。
const chicagoPizzaStore = new ChicagoPizzaStore()

const pizza1 = nYPizzaStore.orderPizza('cheese') // 看不到具体的 Pizza 类，有封装作用
const pizza2 = chicagoPizzaStore.orderPizza('mango')

nYPizzaStore.deliver(pizza1)
chicagoPizzaStore.deliver(pizza2)

