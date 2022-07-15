/*----------------------------------------------------------------------------------
* about:命令模式是一种行为设计模式， 它可将请求转换为一个包含与请求相关的所有信息的独立对象。
* 该转换让你能根据不同的请求将方法参数化、 延迟请求执行或将其放入队列中， 且能实现可撤销操作。
* author:马兆铿（810768333@qq.com）
* date:2020-1-8
* ----------------------------------------------------------------------------------*/
// 家电
const light = {
  status: 'off',
  on() {
    this.status = 'on'
    console.log('light on')
  },
  off() {
    this.status = 'off'
    console.log('light off')
  }
}
const curtain = {
  status: 'open',
  open() {
    this.status = 'open'
    console.log('curtain open')
  },
  close() {
    this.status = 'close'
    console.log('curtain close')
  }
}
const door = {
  status: 'close',
  open() {
    this.status = 'open'
    console.log('door open')
  },
  close() {
    this.status = 'close'
    console.log('door close')
  }
}

// 遥控器，可以学习&执行
class RemoteControl {
  constructor() {
    this.commandArr = [] // 命令列表，对象格式为 {name, fnArr}
    this.historyArr = []
  }

  // 学习：存入命令
  learn(name, fnArr) {
    this.commandArr.push({
      name,
      fnArr
    })
  }

  // 执行命令
  execute(name) {
    // 执行，并记录操作历史
    console.log(`Now executing ${name} command...`)
    const command = this.commandArr.find(item => item.name === name)
    const oldStatus = []
    command.fnArr.forEach(function (item) {
      const {device, command} = item
      if (device && device[command]) {
        oldStatus.unshift({
          device,
          status: device.status
        })
        device[item.command]() // 执行具体指令
      } else {
        console.log('no command')
      }
    })
    this.historyArr.push(oldStatus)
    console.log(`Command executed.`)
  }

  // 还原状态
  undo() {
    const latestHistory = this.historyArr.shift()
    latestHistory.forEach(item => {
      const {device, status} = item
      device.status = status
      console.log(device, status)
    })
  }
}

// 学习并执行
const remoteControl = new RemoteControl()
remoteControl.learn('night', [
  {device: light, command: 'on'},
  {device: curtain, command: 'open'},
  {device: door, command: 'open'}
])
remoteControl.execute('night')

// 还原
console.log('Now undo all commands...')
remoteControl.undo()
console.log(light.status, curtain.status, door.status)
