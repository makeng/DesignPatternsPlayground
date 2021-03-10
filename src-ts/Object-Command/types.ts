/* ---------------------------------------------------------------------------------------
* about:类型文件
* author:马兆铿（13790371603 810768333@qq.com）
* date:2021-03-10
* ---------------------------------------------------------------------------------------- */
type Status = 'on' | 'off' | 'close' | 'open'
type Device = Appliance | Furniture

interface Appliance {
  status: Status
  on: () => void
  off: () => void
}

interface Furniture {
  status: Status
  open: () => void
  close: () => void
}

// 命令
interface Cmd {
  name: string
  fnList: Fn[]
}

// 命令-列表项
interface Fn {
  device: Device,
  command: string
}

interface HistoryStatus {
  device: Device,
  status: Status
}

export {
  Appliance,
  Furniture,
  Status,
  HistoryStatus,
  Cmd,
  Fn
}
