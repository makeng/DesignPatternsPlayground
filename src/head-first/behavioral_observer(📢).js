/*----------------------------------------------------------------------------------
* about:观察者模式是一种行为设计模式，允许你定义一种订阅机制，可在对象事件发生时通知多个 “观察” 该对象的其他对象。
* author:马兆铿（810768333@qq.com）
* date:2019-12-26
* ----------------------------------------------------------------------------------*/
/**
 * 构造函数：频道对象
 * @param name
 * @constructor
 */
class PublishChannel {
  static _fnList = []

  constructor (name) {
    this.name = name
    this.id = `${parseInt(Math.random() * Math.pow(10, 8))}` // 随机 id
  }

  // 发送消息
  update (data) {
    const evt = {
      data
    }
    PublishChannel._fnList.forEach(item => {
      if (
        item.name === this.name && // 同一频道
        item.id !== this.id // 自己不接收
      ) {
        item.fn(evt)
      }
    })
  }

  // 订阅函数
  subscribe (fn) {
    PublishChannel._fnList.push({
      name: this.name,
      id: this.id,
      fn: fn.bind(this) // 回调指向频道实例，而不是push进去的对象
    })
  }

  // 清除fnList相应id的对象，避免占用内存过多
  clear () {
    PublishChannel._fnList = PublishChannel._fnList.filter(item => item.id !== this.id)
  }
}

const CHANNEL_1 = 'channel-1'
const CHANNEL_2 = 'channel-2'

// 频道的发布者和订阅者们
const publisher1 = new PublishChannel(CHANNEL_1)
const subscribe1_1 = new PublishChannel(CHANNEL_1)
const subscribe1_2 = new PublishChannel(CHANNEL_1)
const publisher2_1 = new PublishChannel(CHANNEL_2)
const publisher2_2 = new PublishChannel(CHANNEL_2)
const subscribe2 = new PublishChannel(CHANNEL_2)

// 开始通信：一对多
subscribe1_1.foo = '用于鉴定接收作用域正确'
subscribe1_1.subscribe(function (evt) {
  console.log(this)
  console.log('作用域是否正确:', this.foo !== undefined)
  console.log('订阅者1_1收到啦', evt)
})
subscribe1_2.subscribe(function (evt) {
  console.log('订阅者1_2收到啦', evt)
})
publisher1.subscribe(function (evt) {
  console.log('发布者1不应该收到自己发出的', evt)
})
publisher1.update('hello')

// 开始通信：多对一
subscribe2.subscribe(function (evt) {
  console.log('订阅者2第一次收到啦', evt)
})
subscribe2.subscribe(function (evt) {
  console.log('订阅者2第二次收到啦', evt)
})
publisher2_1.update('hello1')
publisher2_2.update('hello2')
