interface HouseMenu {
  addItem: (name: string, price: number) => void
  each: (fn: (item: any, index: number) => void) => void // fn 是回调
}

interface DinnerHouseMenuList {
  [index: number]: any;
  length: number
}

export {
  HouseMenu,
  DinnerHouseMenuList
}
