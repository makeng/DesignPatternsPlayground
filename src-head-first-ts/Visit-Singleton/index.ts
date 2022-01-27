/*----------------------------------------------------------------------------------
* TS 的作用：
* - 对静态实例和构造函数使用访问权限控制
* ----------------------------------------------------------------------------------*/
class ChocolateBoiler {
  private static instance: ChocolateBoiler = undefined
  empty: boolean = true
  boiled: boolean = false

  // 禁止外部使用构造函数
  private constructor () {}

  // 实例获取
  static getInstance (): ChocolateBoiler {
    if (!ChocolateBoiler.instance) {
      ChocolateBoiler.instance = new ChocolateBoiler()
    }
    return ChocolateBoiler.instance // 构造器返回的永远都是这个
  }

  // 外部调用方法
  fill () {
    this.empty = !this.isEmpty()
  }

  boil () {
    this.boiled = !this.isEmpty() && !this.isBoiled()
  }

  drain () {
    this.empty = !this.isEmpty() && this.isBoiled()
  }

  // 内部方法
  isEmpty (): boolean {
    return this.empty
  }

  isBoiled (): boolean {
    return this.boiled
  }
}

const boiler = ChocolateBoiler.getInstance()
boiler.fill()
boiler.boil()
boiler.drain()

const boilerNew = ChocolateBoiler.getInstance()

// 判断是否二者一致
console.log(boiler.isEmpty(), boiler.isEmpty() === boilerNew.isEmpty() ? 'same' : 'error')
console.log(boiler.isBoiled(), boiler.isBoiled() === boilerNew.isBoiled() ? 'same' : 'error')

