import { Weather, Person } from './common.js'

// 使用 API 监听
class Observer {
  _cb // 监听的回调

  watch(obj, key) {
    let val = obj[key]
    // 监听对象的属性
    function defineProperty(callback) {
      Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get() {
          // 读取方法
          return val
        },
        set(newval) {
          // 赋值监听方法
          if (newval === val) return
          callback(newval)
          val = newval
        }
      })
    }

    const cb = () => this._cb(val)
    defineProperty(cb)
  }

  notify(cb) {
    this._cb = cb
  }
}

const weather = new Weather()
const person = new Person()
const observer = new Observer()

observer.notify(() => {
  const state = weather.broadcast()
  person.act(state)
})
observer.watch(weather, 'stateIndex')
weather.startChanging()
