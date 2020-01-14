/* ---------------------------------------------------------------------------------------
* about:迭代模式
* author:马兆铿（13790371603 810768333@qq.com）
* date:2019-01-13
* ---------------------------------------------------------------------------------------- */

class PancakeHouseMenu {
  constructor () {
    this.list = [] // Array
  }

  addItem (name, price) {
    this.list.push(new MenuItem(name, price))
  }

  getMenuList () {
    return this.list
  }

  // 迭代器
  each (fn) {
    this.list.forEach((item, index) => fn(item, index))
  }
}

class DinnerHouseMenu {
  constructor () {
    this.list = {} // ArrayLike
    this.list.length = 0
  }

  addItem (name, price) {
    this.list[this.list.length] = new MenuItem(name, price)
    this.list.length += 1
  }

  getMenuList () {
    return this.list
  }

  // 迭代器
  each (fn) {
    Array.prototype.forEach.call(this.list, (item, index) => fn(item, index))
  }
}

/* ----------------------------------------- 共用类 ----------------------------------------- */
class MenuItem {
  constructor (name, price) {
    Object.assign(this, { name, price })
  }

  getName () {
    return this.name
  }

  getPrice () {
    return this.price
  }
}

class Maid {
  constructor (name) {
    this.name = name
  }

  // 需要操作「每一项」
  printMenu () {
    Array.prototype.forEach.call(arguments, list => {
      this.printList(list)
    })
  }

  printList (list) {
    // 调用其迭代器
    list.each(item => {
      console.log(`${item.getName()}: $${item.getPrice()}`)
    })
  }
}

/* ----------------------------------------- 实例 ----------------------------------------- */
const pancakeHouseMenu = new PancakeHouseMenu()
const dinnerHouseMenu = new DinnerHouseMenu()

pancakeHouseMenu.addItem('pizza', 12)
pancakeHouseMenu.addItem('waffle', 10)
dinnerHouseMenu.addItem('chicken', 50)
dinnerHouseMenu.addItem('potato', 20)

const maidAlice = new Maid('Alice')

// 打印两个类型不一致集合
maidAlice.printMenu(pancakeHouseMenu, dinnerHouseMenu)
