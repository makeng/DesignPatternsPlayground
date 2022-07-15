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
var Beverage = /** @class */ (function () {
    function Beverage() {
        this.price = '0';
    }
    Beverage.prototype.getDescription = function () {
        return this.constructor.name + ' Coffee: ';
    };
    Beverage.prototype.cost = function () {
        return "$" + Number(this.price).toFixed(2);
    };
    return Beverage;
}());
/* ----------------------------------------- 子类 ----------------------------------------- */
var HouseBlend = /** @class */ (function (_super) {
    __extends(HouseBlend, _super);
    function HouseBlend() {
        var _this = _super.call(this) // 继承（方法）
         || this;
        var beverage = new Beverage(); // 继承（属性）
        beverage = new Mocha(beverage); // 装饰
        beverage = new Mocha(beverage);
        beverage = new Whip(beverage);
        Object.assign(_this, beverage); // 合并
        return _this;
    }
    return HouseBlend;
}(Beverage));
var DarkRoast = /** @class */ (function (_super) {
    __extends(DarkRoast, _super);
    function DarkRoast() {
        var _this = _super.call(this) || this;
        var beverage = new Beverage();
        beverage = new Soy(beverage);
        beverage = new Mocha(beverage);
        beverage = new Whip(beverage);
        Object.assign(_this, beverage);
        return _this;
    }
    return DarkRoast;
}(Beverage));
/* ----------------------------------------- 装饰者 ----------------------------------------- */
var CondimentDecorator = /** @class */ (function () {
    function CondimentDecorator() {
        this.price = '0';
    }
    CondimentDecorator.prototype.getDescription = function () {
        return this.constructor.name;
    };
    CondimentDecorator.prototype.cost = function () {
        return this.price;
    };
    return CondimentDecorator;
}());
/* ----------------------------------------- 材料 ----------------------------------------- */
var Mocha = /** @class */ (function (_super) {
    __extends(Mocha, _super);
    function Mocha(beverage) {
        var _this = _super.call(this) || this;
        beverage.price = Number(beverage.price) + 0.2;
        return beverage;
    }
    return Mocha;
}(CondimentDecorator));
var Milk = /** @class */ (function (_super) {
    __extends(Milk, _super);
    function Milk(beverage) {
        var _this = _super.call(this) || this;
        beverage.price = Number(beverage.price) + 0.1;
        return beverage;
    }
    return Milk;
}(CondimentDecorator));
var Soy = /** @class */ (function (_super) {
    __extends(Soy, _super);
    function Soy(beverage) {
        var _this = _super.call(this) || this;
        beverage.price = Number(beverage.price) + 0.4;
        return beverage;
    }
    return Soy;
}(CondimentDecorator));
var Whip = /** @class */ (function (_super) {
    __extends(Whip, _super);
    function Whip(beverage) {
        var _this = _super.call(this) || this;
        beverage.price = Number(beverage.price) + 0.3;
        return beverage;
    }
    return Whip;
}(CondimentDecorator));
// 模拟购买
var houseBlend = new HouseBlend();
var darkRoast = new DarkRoast();
console.log('<JS Coffee Shop>');
console.log(houseBlend.getDescription(), houseBlend.cost());
console.log(darkRoast.getDescription(), darkRoast.cost());
//# sourceMappingURL=index.js.map