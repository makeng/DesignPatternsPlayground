class Pizza {
  name: string

  constructor (material: string) {
    this.name = `${material} pizza`
  }

  bake (spice?: string): void {
    console.log(`Baking ${this.name}`)
    if (spice) {
      console.log(`Add ${spice}`)
    }
  }
}

interface Store {
  address: string
  deliver (pizza: object): void
  bake (pizza: object): void
}

class NYStore implements Store {
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

class ChicagoStore implements Store {
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

const nyStore = new NYStore('01 street')
const chicagoStore = new ChicagoStore('53 street')
const pizza1 = new Pizza('cheese')
const pizza2 = new Pizza('tomato')

nyStore.bake(pizza1)
nyStore.deliver(pizza1)

chicagoStore.bake(pizza2)
chicagoStore.deliver(pizza2)
