/*----------------------------------------------------------------------------------
* TS 的作用：
* - 控制字面量类型
* ----------------------------------------------------------------------------------*/
import * as types from './types'

// 家电
const light: types.Appliance = {
  status: 'off',
  on () {
    this.status = 'on'
    console.log('light on')
  },
  off () {
    this.status = 'off'
    console.log('light off')
  }
}
const curtain: types.Furniture = {
  status: 'open',
  open () {
    this.status = 'open'
    console.log('curtain open')
  },
  close () {
    this.status = 'close'
    console.log('curtain close')
  }
}
const door: types.Furniture = {
  status: 'close',
  open () {
    this.status = 'open'
    console.log('door open')
  },
  close () {
    this.status = 'close'
    console.log('door close')
  }
}

// 遥控器，可以学习&执行
class RemoteControl {
  cmdList: types.Cmd[]
  historyStatusList: types.HistoryStatus[]

  constructor () {
    this.cmdList = [] // 命令列表，对象格式为 {name, fnList}
    this.historyStatusList = []
  }

  // 学习：存入命令
  learn (name, fnList: types.Fn[]) {
    this.cmdList.push({
      name,
      fnList
    })
  }

  // 执行命令
  execute (name) {
    // 执行，并记录操作历史
    console.log(`Now executing ${name} command...`)
    const command = this.cmdList.find(item => item.name === name)
    const oldStatus = []

    command.fnList.forEach(function (item) {
      const { device, command } = item
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
    this.historyStatusList = oldStatus
    console.log(`Command executed.`)
  }

  // 还原状态
  undo () {
    this.historyStatusList.forEach(item => {
      const { device, status } = item
      device.status = status
      console.log(device, status)
    })
  }
}

// 学习并执行
const remoteControl = new RemoteControl()
remoteControl.learn('night mode', [
  { device: light, command: 'on' },
  { device: curtain, command: 'open' },
  { device: door, command: 'open' }
])
remoteControl.execute('night mode')

// 还原
console.log('Now undo all commands...')
remoteControl.undo()
console.log(light.status, curtain.status, door.status)
