/*----------------------------------------------------------------------------------
* TS 的作用：
* - 对静态实例和构造函数使用访问权限控制
* ----------------------------------------------------------------------------------*/
var ChocolateBoiler = /** @class */ (function () {
    // 禁止外部使用构造函数
    function ChocolateBoiler() {
        this.empty = true;
        this.boiled = false;
    }
    // 实例获取
    ChocolateBoiler.getInstance = function () {
        if (!ChocolateBoiler.instance) {
            ChocolateBoiler.instance = new ChocolateBoiler();
        }
        return ChocolateBoiler.instance; // 构造器返回的永远都是这个
    };
    // 外部调用方法
    ChocolateBoiler.prototype.fill = function () {
        this.empty = !this.isEmpty();
    };
    ChocolateBoiler.prototype.boil = function () {
        this.boiled = !this.isEmpty() && !this.isBoiled();
    };
    ChocolateBoiler.prototype.drain = function () {
        this.empty = !this.isEmpty() && this.isBoiled();
    };
    // 内部方法
    ChocolateBoiler.prototype.isEmpty = function () {
        return this.empty;
    };
    ChocolateBoiler.prototype.isBoiled = function () {
        return this.boiled;
    };
    ChocolateBoiler.instance = undefined;
    return ChocolateBoiler;
}());
var boiler = ChocolateBoiler.getInstance();
boiler.fill();
boiler.boil();
boiler.drain();
var boilerNew = ChocolateBoiler.getInstance();
// 判断是否二者一致
console.log(boiler.isEmpty(), boiler.isEmpty() === boilerNew.isEmpty() ? 'same' : 'error');
console.log(boiler.isBoiled(), boiler.isBoiled() === boilerNew.isBoiled() ? 'same' : 'error');
//# sourceMappingURL=index.js.map