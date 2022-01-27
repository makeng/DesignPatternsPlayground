import { Weather, Person } from './common.js'

const weather = new Weather()
const person = new Person()

weather.startChanging()

// 一般监听方法：定时器
setInterval(() => {
  const state = weather.broadcast()
  person.act(state)
}, 1000)
