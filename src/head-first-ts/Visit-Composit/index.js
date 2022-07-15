"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var PancakeHouseMenu = /** @class */ (function () {
    function PancakeHouseMenu() {
        this.list = [];
    }
    PancakeHouseMenu.prototype.addItem = function (name, price) {
        this.list.push(new MenuItem(name, price));
    };
    PancakeHouseMenu.prototype.addItem2SubMenu = function (subMenuName, _a) {
        var name = _a.name, price = _a.price;
        var subMenu = this.list.find(function (item) {
            return item.name === subMenuName;
        });
        if (subMenu) {
            subMenu.addItem(name, price);
        }
        // 不存在子菜单，就新增一个
        else {
            var subMenu_1 = new SubMenu(subMenuName);
            subMenu_1.addItem(name, price);
            this.list.push(subMenu_1);
        }
    };
    PancakeHouseMenu.prototype.getMenuList = function () {
        return this.list;
    };
    // 迭代器
    PancakeHouseMenu.prototype.each = function (fn) {
        var list = this.getMenuList();
        // 分类型处理
        list.forEach(function (item, index) {
            item instanceof SubMenu
                ? item.each(fn) // 递归
                : fn(item, index);
        });
    };
    return PancakeHouseMenu;
}());
var DinnerHouseMenu = /** @class */ (function () {
    function DinnerHouseMenu() {
        this.list = { length: 0 };
    }
    DinnerHouseMenu.prototype.addItem = function (name, price) {
        this.list[this.list.length] = new MenuItem(name, price);
        this.list.length += 1;
    };
    DinnerHouseMenu.prototype.getMenuList = function () {
        return this.list;
    };
    // 迭代器
    DinnerHouseMenu.prototype.each = function (fn) {
        var list = this.getMenuList();
        Array.prototype.forEach.call(list, function (item, index) { return fn(item, index); });
    };
    return DinnerHouseMenu;
}());
// 子菜单
var SubMenu = /** @class */ (function (_super) {
    __extends(SubMenu, _super);
    function SubMenu(name) {
        var _this = _super.call(this) || this;
        Object.assign(_this, {
            name: name,
            list: []
        });
        return _this;
    }
    return SubMenu;
}(PancakeHouseMenu));
/* ----------------------------------------- 共用类 ----------------------------------------- */
var MenuItem = /** @class */ (function () {
    function MenuItem(name, price) {
        Object.assign(this, { name: name, price: price });
    }
    MenuItem.prototype.getName = function () {
        return this.name;
    };
    MenuItem.prototype.getPrice = function () {
        return this.price;
    };
    return MenuItem;
}());
var Maid = /** @class */ (function () {
    function Maid(name) {
        this.name = name;
    }
    // 需要操作「每一项」
    Maid.prototype.printMenu = function () {
        var _this = this;
        var allMenu = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            allMenu[_i] = arguments[_i];
        }
        allMenu.forEach(function (menu) {
            _this._printList(menu);
        });
    };
    Maid.prototype._printList = function (menu) {
        // 调用其迭代器
        menu.each(function (item) {
            console.log(item.getName() + ": $" + item.getPrice());
        });
    };
    return Maid;
}());
/* ----------------------------------------- 实例 ----------------------------------------- */
var pancakeHouseMenu = new PancakeHouseMenu();
var dinnerHouseMenu = new DinnerHouseMenu();
pancakeHouseMenu.addItem('pizza', 12);
pancakeHouseMenu.addItem('waffle', 10);
pancakeHouseMenu.addItem2SubMenu('breakfast', { name: 'soup', price: 2 });
pancakeHouseMenu.addItem2SubMenu('breakfast', { name: 'soy milk', price: 1 });
pancakeHouseMenu.addItem2SubMenu('breakfast', { name: 'bread', price: 2 });
dinnerHouseMenu.addItem('chicken', 50);
dinnerHouseMenu.addItem('potato', 20);
console.log(pancakeHouseMenu.getMenuList());
var maidAlice = new Maid('Alice');
// 打印两个类型不一致集合
maidAlice.printMenu(pancakeHouseMenu, dinnerHouseMenu);
//# sourceMappingURL=index.js.map