/*----------------------------------------------------------------------------------
* about:HeadFirst设计模式-模板
* author:马兆铿（810768333@qq.com）
* date:2019-1-13
* ----------------------------------------------------------------------------------*/
function log (x) {
  console.log(x)
}

class CoffinBeverage {
  prepareRecipe () {
    this.boilWater()
    this.brew() // 交给子类
    this.addCondiments() // 交给子类
    this.pourInCup()
  }

  boilWater () {
    log('boil water')
  }

  pourInCup () {
    log('pour in cup')
  }
}

/* ----------------------------------------- 子类 ----------------------------------------- */
class Coffee extends CoffinBeverage {
  grewCoffeeGrinds () {
    log('grew coffee grinds')
  }

  addSugarAndMilk () {
    log('add sugar and milk')
  }

  // 自定义方法
  brew () {
    this.grewCoffeeGrinds()
  }

  addCondiments () {
    this.addSugarAndMilk()
  }
}

class Tea extends CoffinBeverage {
  steepTeaBag () {
    log('steep tea bag')
  }

  addLemon () {
    log('add lemon')
  }

  // 自定义方法
  brew () {
    this.steepTeaBag()
  }

  addCondiments () {
    this.addLemon()
  }
}

/* ----------------------------------------- 调用 ----------------------------------------- */
const coffee = new Coffee()
coffee.prepareRecipe()
const tea = new Tea()
tea.prepareRecipe()
