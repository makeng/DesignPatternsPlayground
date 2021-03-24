/*----------------------------------------------------------------------------------
* TS 的作用
* - 使用枚举代替常量，组织性更强
* ----------------------------------------------------------------------------------*/
const { log } = console

// 状态
const enum STATE {
  HAS_QUARTER,
  NO_QUARTER,
  SOLD,
  SOLD_OUT
}

// 封装状态，而不是封装转换方法
class CandyMachine {
  candyCnt: number
  state

  constructor (candyCnt) {
    this.candyCnt = candyCnt || 0
    this.state = STATE.NO_QUARTER
  }

  insertCoin () {
    log('You inserted a quarter.')
    if (this.state === STATE.HAS_QUARTER) {
      log('Already has a quarter.')
    }
    this._setState(STATE.HAS_QUARTER)
  }

  pullTrigger () {
    log('You pulled the trigger.')
    if (this.state === STATE.HAS_QUARTER) {
      this._setState(STATE.SOLD)
    } else {
      log('No quarter.')
    }
  }

  refill () {
    log('Candy refill.')
    this.candyCnt += 1
    this._setState(STATE.NO_QUARTER)
  }

  dispense () {
    if (this.candyCnt > 0) {
      this.candyCnt -= 1
      log('Dispense candy.')
      this._setState(STATE.NO_QUARTER)
    } else {
      this._setState(STATE.SOLD_OUT)
    }
  }

  _noQuarter () {
    log('No quarter.')
  }

  _hasQuarter () {
    log('There is quarter.')
  }

  _sold () {
    this.dispense()
  }

  _soldOut () {
    log('Candy sold out.')
  }

  // 核心方法，管理状态跳转
  private _setState (state) {
    // 可执行分支方法
    const fn = {
      [STATE.NO_QUARTER]: () => this._noQuarter(),
      [STATE.HAS_QUARTER]: () => this._hasQuarter(),
      [STATE.SOLD]: () => this._sold(),
      [STATE.SOLD_OUT]: () => this._soldOut()
    }[state]

    this.state = state
    fn()
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




