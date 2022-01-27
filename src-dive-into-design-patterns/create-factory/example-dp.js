import { TeaStation } from './common.js'

// 制造茶店的工厂
function createStation(address) {
  class StationTemplate extends TeaStation {
    constructor({ address, config }) {
      super(address)
      this.config = config
    }

    makeDefault(name) {
      return this.make({ name, ...this.config })
    }
  }

  switch (address) {
    case '中国':
      return new StationTemplate({
        address: '中国',
        config: {
          tax: 5,
          transportCharges: 3
        }
      })
    case '美国':
      return new StationTemplate({
        address: '美国',
        config: {
          tax: 5,
          transportCharges: 3
        }
      })
  }
}

const stationChina = createStation('中国')
const stationAmerica = createStation('美国')

const perlTea1 = stationChina.makeDefault('珍珠')
const perlTea2 = stationChina.makeDefault('大珍珠')
const mangoTea1 = stationAmerica.makeDefault('芒果')
const mangoTea2 = stationAmerica.makeDefault('小芒果')
