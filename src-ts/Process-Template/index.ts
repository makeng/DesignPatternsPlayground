/*----------------------------------------------------------------------------------
* TS 的作用：
* - 运用抽象类，实现子类的形状声明和方法实现
* ----------------------------------------------------------------------------------*/

const { log } = console

abstract class CoffinBeverage {
  // 抽象方法-煮茶
  abstract brew ()

  // 抽象方法-加调料
  abstract addCondiments ()

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
