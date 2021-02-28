/*----------------------------------------------------------------------------------
* TS 做了什么：
* - 为类 NYStore 和 ChicagoStore 提供了共同的 interface
* - Piazza 类不需要 interface，因为它没有相似的类。要弄清楚 interface 的本质。
* - interface 保存在声明文件中，与逻辑分离
* - 使用字面量类型，控制原料的值
* ----------------------------------------------------------------------------------*/
import * as types from './types'

type material = 'cheese' | 'onion' | 'durian';

class Pizza {
  name: string

  constructor (material: material) {
    this.name = `${material} pizza`
  }

  bake (spice?: string): void {
    console.log(`Baking ${this.name}`)
    if (spice) {
      console.log(`Add ${spice}`)
    }
  }
}

class NYStore implements types.Store {
  address

  constructor (address) {
    this.address = `${address} store`
  }

  bake (pizza) {
    pizza.bake()
  }

  deliver (pizza) {
    console.log(`${this.address} delivering ${pizza.name}`)
  }
}

class ChicagoStore implements types.Store {
  address

  constructor (address) {
    this.address = `${address} store`
  }

  bake (pizza) {
    pizza.bake('salt')
  }

  deliver (pizza) {
    console.log(`${this.address} checking... `)
    console.log(`${this.address} delivering ${pizza.name}`)
  }
}

/* ----------------------------------------- execution ----------------------------------------- */
const nyStore = new NYStore('01 street')
const chicagoStore = new ChicagoStore('53 street')
const pizza1 = new Pizza('durian')
const pizza2 = new Pizza('cheese')

nyStore.bake(pizza1)
nyStore.deliver(pizza1)

chicagoStore.bake(pizza2)
chicagoStore.deliver(pizza2)
