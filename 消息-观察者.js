/*----------------------------------------------------------------------------------
* about:观察者模式
* author:马兆铿（13790371603 810768333@qq.com）
* date:2019-12-26
* ----------------------------------------------------------------------------------*/
/**
 * 构造函数：频道对象
 * @param name
 * @constructor
 */
class PublishChannel {
  static fnList = []

  constructor(name) {
    this.name = name
    this.id = `${parseInt(Math.random() * Math.pow(10, 8))}`
  }

  // 发送消息
  postMessage(data) {
    const evt = {
      data
    }
    PublishChannel.fnList.forEach(item => {
      if (
        item.name === this.name && // 同一频道
        item.id !== this.id // 自己不接收
      ) {
        item.fn(evt)
      }
    })
  }

  // 订阅函数
  onmessage(fn) {
    PublishChannel.fnList.push({
      name: this.name,
      id: this.id,
      fn
      //fn: fn.bind(this) // 回调指向频道实例，而不是push进去的对象
    })
  }

  // 清除fnList相应id的对象，避免占用内存过多
  clear() {
    PublishChannel.fnList = PublishChannel.fnList.filter(item => item.id !== this.id)
  }
}

// 频道的发布者和订阅者们
const publisher1 = new PublishChannel('channel-1')
const subscirbe1_1 = new PublishChannel('channel-1')
const subscirbe1_2 = new PublishChannel('channel-1')
const publisher2_1 = new PublishChannel('channel-2')
const publisher2_2 = new PublishChannel('channel-2')
const subscirbe2 = new PublishChannel('channel-2')

// 开始通信1
subscirbe1_1.foo = '用于鉴定接收作用域正确'
subscirbe1_1.onmessage(function (evt) {
  console.log(this)
  console.log('作用域是否正确:', this.foo !== undefined)
  console.log('订阅者1_1收到啦', evt)
})
subscirbe1_1.onmessage(function (evt) {
  console.log('订阅者1_2收到啦', evt)
})
publisher1.onmessage(function (evt) {
  console.log('发布者1不应该收到自己发出的', evt)
})
publisher1.postMessage('hello')

// 开始通信2
subscirbe2.onmessage(function (evt) {
  console.log('订阅者2第一次收到啦', evt)
})
subscirbe2.onmessage(function (evt) {
  console.log('订阅者2第二次收到啦', evt)
})
publisher2_1.postMessage('hello1')
publisher2_1.postMessage('hello2')
