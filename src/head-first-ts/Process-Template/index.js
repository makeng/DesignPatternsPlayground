/*----------------------------------------------------------------------------------
* TS 的作用：
* - 运用抽象类，实现子类的形状声明和方法实现
* ----------------------------------------------------------------------------------*/
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
var log = console.log;
var CoffinBeverage = /** @class */ (function () {
    function CoffinBeverage() {
    }
    CoffinBeverage.prototype.prepareRecipe = function () {
        this.boilWater();
        this.brew(); // 交给子类
        this.addCondiments(); // 交给子类
        this.pourInCup();
    };
    CoffinBeverage.prototype.boilWater = function () {
        log('boil water');
    };
    CoffinBeverage.prototype.pourInCup = function () {
        log('pour in cup');
    };
    return CoffinBeverage;
}());
/* ----------------------------------------- 子类 ----------------------------------------- */
var Coffee = /** @class */ (function (_super) {
    __extends(Coffee, _super);
    function Coffee() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Coffee.prototype.grewCoffeeGrinds = function () {
        log('grew coffee grinds');
    };
    Coffee.prototype.addSugarAndMilk = function () {
        log('add sugar and milk');
    };
    // 自定义方法
    Coffee.prototype.brew = function () {
        this.grewCoffeeGrinds();
    };
    Coffee.prototype.addCondiments = function () {
        this.addSugarAndMilk();
    };
    return Coffee;
}(CoffinBeverage));
var Tea = /** @class */ (function (_super) {
    __extends(Tea, _super);
    function Tea() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tea.prototype.steepTeaBag = function () {
        log('steep tea bag');
    };
    Tea.prototype.addLemon = function () {
        log('add lemon');
    };
    // 自定义方法
    Tea.prototype.brew = function () {
        this.steepTeaBag();
    };
    Tea.prototype.addCondiments = function () {
        this.addLemon();
    };
    return Tea;
}(CoffinBeverage));
/* ----------------------------------------- 调用 ----------------------------------------- */
var coffee = new Coffee();
coffee.prepareRecipe();
var tea = new Tea();
tea.prepareRecipe();
//# sourceMappingURL=index.js.map