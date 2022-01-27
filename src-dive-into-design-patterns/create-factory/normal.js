import { TeaStation } from './classes.js'

const stationChina = new TeaStation('中国')
const stationAmerica = new TeaStation('美国')

const perlTea1 = stationChina.make({
  name: '珍珠',
  tax: 5,
  transportCharges: 3
})
const perlTea2 = stationChina.make({
  name: '大珍珠',
  tax: 5,
  transportCharges: 3
})
const mangoTea1 = stationAmerica.make({
  name: '芒果',
  tax: 10,
  transportCharges: 5
})
const mangoTea2 = stationAmerica.make({
  name: '小芒果',
  tax: 10,
  transportCharges: 5
})
