/* ---------------------------------------------------------------------------------------
* TS 的作用：
* - 对象的函数属性的参数和返回进行类型控制。参数包括回调形式。
* - 定义可以修改 length 属性的 ArrayLike。官方的 ArrayLike 的 length 是 readonly 的。
* ---------------------------------------------------------------------------------------- */
import * as types from './types'

type MenuOrItemArray = Array<MenuItem | SubMenu>

class PancakeHouseMenu implements types.HouseMenu {
  list: MenuOrItemArray = []

  addItem (name, price) {
    this.list.push(new MenuItem(name, price))
  }

  addItem2SubMenu (subMenuName: string, { name, price }) {
    const subMenu = this.list.find(item =>
      (item as SubMenu).name === subMenuName
    )
    if (subMenu) {
      (subMenu as SubMenu).addItem(name, price)
    }
    // 不存在子菜单，就新增一个
    else {
      const subMenu = new SubMenu(subMenuName)
      subMenu.addItem(name, price)
      this.list.push(subMenu)
    }
  }

  getMenuList (): MenuOrItemArray {
    return this.list
  }

  // 迭代器
  each (fn) {
    const list = this.getMenuList()
    // 分类型处理
    list.forEach((item, index) => {
      item instanceof SubMenu
        ? item.each(fn) // 递归
        : fn(item, index)
    })
  }
}

class DinnerHouseMenu implements types.HouseMenu {
  list: types.DinnerHouseMenuList = { length: 0 }

  addItem (name, price) {
    this.list[this.list.length] = new MenuItem(name, price)
    this.list.length += 1
  }

  getMenuList (): types.DinnerHouseMenuList {
    return this.list
  }

  // 迭代器
  each (fn) {
    const list = this.getMenuList()
    Array.prototype.forEach.call(list, (item, index) => fn(item, index))
  }
}

// 子菜单
class SubMenu extends PancakeHouseMenu {
  name: string

  constructor (name) {
    super()
    Object.assign(this, {
      name,
      list: []
    })
  }
}

/* ----------------------------------------- 共用类 ----------------------------------------- */
class MenuItem {
  name: string
  price: number

  constructor (name, price) {
    Object.assign(this, { name, price })
  }

  getName (): string {
    return this.name
  }

  getPrice (): number {
    return this.price
  }
}

class Maid {
  name: string

  constructor (name) {
    this.name = name
  }

  // 需要操作「每一项」
  printMenu (...allMenu) {
    allMenu.forEach(menu => {
      this._printList(menu)
    })
  }

  private _printList (menu: PancakeHouseMenu | DinnerHouseMenu) {
    // 调用其迭代器
    menu.each(item => {
      console.log(`${item.getName()}: $${item.getPrice()}`)
    })
  }
}

/* ----------------------------------------- 实例 ----------------------------------------- */
const pancakeHouseMenu = new PancakeHouseMenu()
const dinnerHouseMenu = new DinnerHouseMenu()

pancakeHouseMenu.addItem('pizza', 12)
pancakeHouseMenu.addItem('waffle', 10)
pancakeHouseMenu.addItem2SubMenu('breakfast', { name: 'soup', price: 2 })
pancakeHouseMenu.addItem2SubMenu('breakfast', { name: 'soy milk', price: 1 })
pancakeHouseMenu.addItem2SubMenu('breakfast', { name: 'bread', price: 2 })
dinnerHouseMenu.addItem('chicken', 50)
dinnerHouseMenu.addItem('potato', 20)

console.log(pancakeHouseMenu.getMenuList())

const maidAlice = new Maid('Alice')

// 打印两个类型不一致集合
maidAlice.printMenu(pancakeHouseMenu, dinnerHouseMenu)
