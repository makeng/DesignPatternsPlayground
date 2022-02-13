class Weather {
  stateList = ['晴天', '多云', '暴雨']
  stateIndex = 0

  _getState() {
    return this.stateList[this.stateIndex]
  }

  _changeStateIndex() {
    this.stateIndex = this.stateIndex < this.stateList.length - 1
      ? this.stateIndex + 1
      : 0
  }

  // 天气定时变化
  startChanging() {
    setInterval(() => {
      this._changeStateIndex()
    }, 3000)
  }

  broadcast() {
    const nextState = this._getState()
    console.log(`未来一小时天气将会是${nextState}`)
    return nextState
  }
}

class Person {
  act(state) {
    const action = {
      '晴天': '晾衣服',
      '多云': '收衣服',
      '暴雨': '关窗',
    }[state]
    console.log(`要${action}了`)
    return action
  }
}

export {
  Weather,
  Person
}
