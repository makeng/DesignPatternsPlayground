/* ---------------------------------------------------------------------------------------
* about:适配器模式是一种结构型设计模式， 它能使接口不兼容的对象能够相互合作。
* author:马兆铿（13790371603 810768333@qq.com）
* date:2019-01-10
* ---------------------------------------------------------------------------------------- */
class Slot {
  provideElectricity() {
    return 220
  }
}

class Phone {
  constructor(name) {
    this.name = name
  }

  charge(input) {
    console.log(`Phone ${this.name} plug in.`)
    let msg = 'Phone Not working.'

    function isInRange(x) {
      return function (min, max) {
        return x >= min && x <= max
      }
    }

    if (input > 0 && input < 4) {
      msg = 'Low voltage. Please check you power.'
    } else if (input === 5) {
      msg = 'Phone is charging.'
    } else {
      msg = 'High voltage! Danger!'
    }
    console.log(msg + '\n')
  }
}

class ObjectAdapter {
  constructor(slot) {
    this.slot = slot
  }

  provideElectricity() {
    const input = this.slot.provideElectricity()
    if (input > 200) {
      return 5
    } else if (input < 200) {
      return 0
    } else {
      throw new Error('Voltage too low.')
    }
  }
}

class ClassAdapter extends Slot {
  constructor() {
    super()
    this.super = Slot.prototype
  }

  provideElectricity() {
    const input = super.provideElectricity()
    if (input > 200) {
      return 5
    } else if (input < 200) {
      return 0
    } else {
      throw new Error('Voltage too low.')
    }
  }
}

// 不适配
function chargeWithoutAdapt() {
  const slot = new Slot()
  const phone = new Phone('Xiaomi')
  const power = slot.provideElectricity()
  phone.charge(power) // 调用 power
}

// 对象适配
function chargeWithObjectAdapter() {
  const slot = new Slot()
  const adapter = new ObjectAdapter(slot)
  const power = adapter.provideElectricity()
  const phone = new Phone('Huawei')
  phone.charge(power) // 调用 power，phone 并不知道适配器的存在（解耦）
}

// 类适配
function chargeWithClassAdapter() {
  const adapter = new ClassAdapter() // 不再需要 slot
  const power = adapter.provideElectricity()
  const phone = new Phone('Oppo')
  phone.charge(power)
}

chargeWithoutAdapt()
chargeWithObjectAdapter()
chargeWithClassAdapter()
