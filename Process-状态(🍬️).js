/*----------------------------------------------------------------------------------
* about:状态模式
* author:马兆铿（810768333@qq.com）
* date:2020-1-14
* ----------------------------------------------------------------------------------*/
const log = console.log

// 状态
const STATE_HAS_QUARTER = 'STATE_HAS_QUARTER'
const STATE_NO_QUARTER = 'STATE_NO_QUARTER'
const STATE_SOLD = 'STATE_SOLD'
const STATE_SOLD_OUT = 'STATE_SOLD_OUT'

// 过程编程：糟糕的状态变换
class BadCandyMachine {
  constructor (candyCnt) {
    this.candyCnt = candyCnt || 0
    this.state = STATE_NO_QUARTER
  }

  insertCoin () {
    const fn = {
      STATE_HAS_QUARTER: () => {log('You can`t insert another quarter.')},
      STATE_NO_QUARTER: () => {
        this.state = STATE_HAS_QUARTER
        log('You inserted a quarter')
      },
      STATE_SOLD: () => {log('Please wait, preparing candy.')},
      STATE_SOLD_OUT: () => {log('You cant insert a quarter! The machine is sold out.')},
    }[this.state]
    fn()
  }

  pullTrigger () {
    const fn = {
      STATE_HAS_QUARTER: () => {
        log('You pull...')
        this.state = STATE_SOLD
        this._dispense()
      },
      STATE_NO_QUARTER: () => {log('No quarter, please insert one.')},
      STATE_SOLD: () => {log('Turning twice cant`t get you another candy!')},
      STATE_SOLD_OUT: () => {log('You pulled the trigger, but there is no more candy.')},
    }[this.state]
    fn()
  }

  _dispense () {
    const fn = {
      STATE_HAS_QUARTER: () => {log('Please pull the trigger.')},
      STATE_NO_QUARTER: () => {log('Please insert a quarter.')},
      STATE_SOLD: () => {
        if (this.candyCnt > 0) {
          this.candyCnt -= 1
          this.state = STATE_NO_QUARTER
          log('You got a candy!')
        } else {
          this.state = STATE_SOLD_OUT
          log('Sorry, all candies are sold.')
        }
      },
      STATE_SOLD_OUT: () => {log('All candy are sold!')},
    }[this.state]
    fn()
  }
}

// 测试：能用，但是一旦增加一个状态，就要修改所有的代码
const badCandyMachine = new BadCandyMachine(1)
log('/*------ Bad CandyMachine ------*/')
log('/*-- 1 --*/')
badCandyMachine.insertCoin()
badCandyMachine.pullTrigger()
log('/*-- 2 --*/')
badCandyMachine.pullTrigger()
log('/*-- 3 --*/')
badCandyMachine.insertCoin()
badCandyMachine.pullTrigger()


// 重新设计：封装状态，而不是封装转换方法
class CandyMachine {
  constructor (candyCnt) {
    this.candyCnt = candyCnt || 0
    this.state = STATE_NO_QUARTER
  }

  insertCoin () {
    log('You inserted a quarter.')
    if (this.state === STATE_HAS_QUARTER) {
      log('Already has a quarter.')
    }
    this._setState(STATE_HAS_QUARTER)
  }

  pullTrigger () {
    log('You pulled the trigger.')
    if (this.state === STATE_HAS_QUARTER) {
      this._setState(STATE_SOLD)
    } else {
      log('No quarter.')
    }
  }

  refill () {
    log('Candy refill.')
    this.candyCnt += 1
    this._setState(STATE_NO_QUARTER)
  }

  _setState (state) {
    this.state = state
    const fn = {
      STATE_NO_QUARTER: () => this._noQuarter(),
      STATE_HAS_QUARTER: () => this._hasQuarter(),
      STATE_SOLD: () => this._sold(),
      STATE_SOLD_OUT: () => this._soldOut()
    }[state]
    fn()
  }

  dispense () {
    if (this.candyCnt > 0) {
      this.candyCnt -= 1
      log('Dispense candy.')
      this._setState(STATE_NO_QUARTER)
    } else {
      this._setState(STATE_SOLD_OUT)
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




