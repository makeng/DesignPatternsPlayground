class TeaStation {
  constructor(address) {
    this.address = address
    console.log(this.address + '蜜雪冰城开业啦')
  }

  make(name) {
    return new Tea(name, this)
  }
}

class Tea {
  constructor(config) {
    Object.assign(this, config)
    console.log(`${this.name}, 税率:${this.tax}, 运费:${this.transportCharges}`)
  }
}

export {
  Tea,
  TeaStation
}
