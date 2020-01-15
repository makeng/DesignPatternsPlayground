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
log('/*------ BadCandyMachine ------*/')
log('/*-- 1 --*/')
badCandyMachine.insertCoin()
badCandyMachine.pullTrigger()
log('/*-- 2 --*/')
badCandyMachine.pullTrigger()
log('/*-- 3 --*/')
badCandyMachine.insertCoin()
badCandyMachine.pullTrigger()



