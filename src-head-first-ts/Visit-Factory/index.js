"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Pizza = /** @class */ (function () {
    function Pizza(material) {
        this.name = material + " pizza";
    }
    Pizza.prototype.bake = function (spice) {
        console.log("Baking " + this.name);
        if (spice) {
            console.log("Add " + spice);
        }
    };
    return Pizza;
}());
var NYStore = /** @class */ (function () {
    function NYStore(address) {
        this.address = address + " store";
    }
    NYStore.prototype.bake = function (pizza) {
        pizza.bake();
    };
    NYStore.prototype.deliver = function (pizza) {
        console.log(this.address + " delivering " + pizza.name);
    };
    return NYStore;
}());
var ChicagoStore = /** @class */ (function () {
    function ChicagoStore(address) {
        this.address = address + " store";
    }
    ChicagoStore.prototype.bake = function (pizza) {
        pizza.bake('salt');
    };
    ChicagoStore.prototype.deliver = function (pizza) {
        console.log(this.address + " checking... ");
        console.log(this.address + " delivering " + pizza.name);
    };
    return ChicagoStore;
}());
/* ----------------------------------------- execution ----------------------------------------- */
var nyStore = new NYStore('01 street');
var chicagoStore = new ChicagoStore('53 street');
var pizza1 = new Pizza('durian');
var pizza2 = new Pizza('cheese');
nyStore.bake(pizza1);
nyStore.deliver(pizza1);
chicagoStore.bake(pizza2);
chicagoStore.deliver(pizza2);
//# sourceMappingURL=index.js.map