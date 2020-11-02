/*----------------------------------------------------------------------------------
* about:单件模式。单例模式是一种创建型设计模式， 让你能够保证一个类只有一个实例， 并提供一个访问该实例的全局节点。
* author:马兆铿（810768333@qq.com）
* date:2020-1-7
* ----------------------------------------------------------------------------------*/
class ChocolateBoiler {
  static instance = undefined

  constructor() {
    if (!ChocolateBoiler.instance) {
      ChocolateBoiler.instance = this // 创建实例
      this.empty = true
      this.boiled = false
    }
    return ChocolateBoiler.instance // 构造器返回的永远都是这个
  }

// 外部调用方法
  fill() {
    this.empty = !this.isEmpty()
  }

  boil() {
    this.boiled = !this.isEmpty() && !this.isBoiled()
  }

  drain() {
    this.empty = !this.isEmpty() && this.isBoiled()
  }

  // 内部方法
  isEmpty() {
    return this.empty
  }

  isBoiled() {
    return this.boiled
  }
}

const boiler = new ChocolateBoiler()
boiler.fill()
boiler.boil()
boiler.drain()

const boilerNew = new ChocolateBoiler()

// 判断是否二者一致
console.log(boiler.isEmpty(), boiler.isEmpty() === boilerNew.isEmpty() ? 'same' : 'error')
console.log(boiler.isBoiled(), boiler.isBoiled() === boilerNew.isBoiled() ? 'same' : 'error')

