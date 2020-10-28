/*----------------------------------------------------------------------------------
* about:状态模式
* author:马兆铿（810768333@qq.com）
* date:2020-1-14
* ----------------------------------------------------------------------------------*/
const {log} = console

// 状态
const STATE_HAS_QUARTER = 'STATE_HAS_QUARTER'
const STATE_NO_QUARTER = 'STATE_NO_QUARTER'
const STATE_SOLD = 'STATE_SOLD'
const STATE_SOLD_OUT = 'STATE_SOLD_OUT'

// 封装状态，而不是封装转换方法
class CandyMachine {
  constructor(candyCnt) {
    this.candyCnt = candyCnt || 0
    this.state = STATE_NO_QUARTER
  }

  // 核心方法，管理状态跳转
  _setState(state) {
    this.state = state
    const fn = {
      STATE_NO_QUARTER: () => this._noQuarter(),
      STATE_HAS_QUARTER: () => this._hasQuarter(),
      STATE_SOLD: () => this._sold(),
      STATE_SOLD_OUT: () => this._soldOut()
    }[state]
    fn()
  }

  insertCoin() {
    log('You inserted a quarter.')
    if (this.state === STATE_HAS_QUARTER) {
      log('Already has a quarter.')
    }
    this._setState(STATE_HAS_QUARTER)
  }

  pullTrigger() {
    log('You pulled the trigger.')
    if (this.state === STATE_HAS_QUARTER) {
      this._setState(STATE_SOLD)
    } else {
      log('No quarter.')
    }
  }

  refill() {
    log('Candy refill.')
    this.candyCnt += 1
    this._setState(STATE_NO_QUARTER)
  }

  dispense() {
    if (this.candyCnt > 0) {
      this.candyCnt -= 1
      log('Dispense candy.')
      this._setState(STATE_NO_QUARTER)
    } else {
      this._setState(STATE_SOLD_OUT)
    }
  }

  _noQuarter() {
    log('No quarter.')
  }

  _hasQuarter() {
    log('There is quarter.')
  }

  _sold() {
    this.dispense()
  }

  _soldOut() {
    log('Candy sold out.')
  }
}

const candyMachine = new CandyMachine(1)
log('/*------ Good CandyMachine ------*/')
log('/*-- 1 --*/')
candyMachine.insertCoin()
candyMachine.pullTrigger()
log('/*-- 2 --*/')
candyMachine.pullTrigger()
log('/*-- 3 --*/')
candyMachine.insertCoin()
candyMachine.pullTrigger()
log('/*-- 4 --*/')
candyMachine.insertCoin()
candyMachine.refill()
candyMachine.pullTrigger()




