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
var Slot = /** @class */ (function () {
    function Slot() {
    }
    Slot.prototype.provideElectricity = function () {
        return 220;
    };
    return Slot;
}());
var Phone = /** @class */ (function () {
    function Phone(name) {
        this.name = name;
    }
    Phone.prototype.charge = function (input) {
        console.log("Phone " + this.name + " plug in.");
        var msg = 'Phone Not working.';
        function isInRange(x) {
            return function (min, max) {
                return x >= min && x <= max;
            };
        }
        if (input > 0 && input < 4) {
            msg = 'Low voltage. Please check you power.';
        }
        else if (input === 5) {
            msg = 'Phone is charging.';
        }
        else {
            msg = 'High voltage! Danger!';
        }
        console.log(msg + '\n');
    };
    return Phone;
}());
var ObjectAdapter = /** @class */ (function () {
    function ObjectAdapter(slot) {
        this.slot = slot;
    }
    ObjectAdapter.prototype.provideElectricity = function () {
        var input = this.slot.provideElectricity();
        if (input > 200) {
            return 5;
        }
        else if (input < 200) {
            return 0;
        }
        else {
            throw new Error('Voltage too low.');
        }
    };
    return ObjectAdapter;
}());
var ClassAdapter = /** @class */ (function (_super) {
    __extends(ClassAdapter, _super);
    function ClassAdapter() {
        var _this = _super.call(this) || this;
        _this.super = Slot.prototype;
        return _this;
    }
    ClassAdapter.prototype.provideElectricity = function () {
        var input = _super.prototype.provideElectricity.call(this);
        if (input > 200) {
            return 5;
        }
        else if (input < 200) {
            return 0;
        }
        else {
            throw new Error('Voltage too low.');
        }
    };
    return ClassAdapter;
}(Slot));
/* ----------------------------------------- 执行 ----------------------------------------- */
// 不适配
function chargeWithoutAdapt() {
    var slot = new Slot();
    var phone = new Phone('Xiaomi');
    var power = slot.provideElectricity();
    phone.charge(power); // 调用 power
}
// 对象适配
function chargeWithObjectAdapter() {
    var slot = new Slot();
    var adapter = new ObjectAdapter(slot);
    var power = adapter.provideElectricity();
    var phone = new Phone('Huawei');
    phone.charge(power); // 调用 power，phone 并不知道适配器的存在（解耦）
}
// 类适配
function chargeWithClassAdapter() {
    var adapter = new ClassAdapter(); // 不再需要 slot
    var power = adapter.provideElectricity();
    var phone = new Phone('Oppo');
    phone.charge(power);
}
chargeWithoutAdapt();
chargeWithObjectAdapter();
chargeWithClassAdapter();
//# sourceMappingURL=index.js.map