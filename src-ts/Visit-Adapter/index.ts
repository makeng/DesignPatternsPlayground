/* ---------------------------------------------------------------------------------------
* TS 的作用：提供统一的实现（implements）
* ---------------------------------------------------------------------------------------- */
import * as types from './types'

class Slot implements types.Wire {
  provideElectricity () {
    return 220
  }
}

class Phone {
  name: string

  constructor (name) {
    this.name = name
  }

  charge (input: number) {
    console.log(`Phone ${this.name} plug in.`)
    let msg = 'Phone Not working.'

    function isInRange (x) {
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

class ObjectAdapter implements types.Wire {
  slot: Slot

  constructor (slot) {
    this.slot = slot
  }

  provideElectricity () {
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
  super: object

  constructor () {
    super()
    this.super = Slot.prototype
  }

  provideElectricity () {
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

/* ----------------------------------------- 执行 ----------------------------------------- */

// 不适配
function chargeWithoutAdapt () {
  const slot = new Slot()
  const phone = new Phone('Xiaomi')
  const power = slot.provideElectricity()
  phone.charge(power) // 调用 power
}

// 对象适配
function chargeWithObjectAdapter () {
  const slot = new Slot()
  const adapter = new ObjectAdapter(slot)
  const power = adapter.provideElectricity()
  const phone = new Phone('Huawei')
  phone.charge(power) // 调用 power，phone 并不知道适配器的存在（解耦）
}

// 类适配
function chargeWithClassAdapter () {
  const adapter = new ClassAdapter() // 不再需要 slot
  const power = adapter.provideElectricity()
  const phone = new Phone('Oppo')
  phone.charge(power)
}

chargeWithoutAdapt()
chargeWithObjectAdapter()
chargeWithClassAdapter()
