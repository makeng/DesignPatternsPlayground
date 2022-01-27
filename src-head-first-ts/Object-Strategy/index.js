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
var Duck = /** @class */ (function () {
    function Duck() {
    }
    Duck.prototype.flyBehavior = function () {
        // 方法的选择
        return {
            fly: function () { return '能飞'; },
            cantFly: function () { return '不能飞'; }
        };
    };
    Duck.prototype.display = function () {
        return "\u770B\u8D77\u6765 " + this.constructor.name;
    };
    return Duck;
}());
/* ----------------------------------------- 子类 ----------------------------------------- */
var RubberDuck = /** @class */ (function (_super) {
    __extends(RubberDuck, _super);
    function RubberDuck() {
        var _this = _super.call(this) || this;
        _this.fly = _this.flyBehavior().cantFly;
        return _this;
    }
    return RubberDuck;
}(Duck));
var MuteDuck = /** @class */ (function (_super) {
    __extends(MuteDuck, _super);
    function MuteDuck() {
        var _this = _super.call(this) || this;
        _this.fly = _this.flyBehavior().fly;
        return _this;
    }
    return MuteDuck;
}(Duck));
/* ----------------------------------------- 模拟 ----------------------------------------- */
var rubberDuck = new RubberDuck();
var muteDuck = new MuteDuck();
console.log(rubberDuck.display(), rubberDuck.fly());
console.log(muteDuck.display(), muteDuck.fly());
//# sourceMappingURL=index.js.map