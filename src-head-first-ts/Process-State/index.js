/*----------------------------------------------------------------------------------
* TS 的作用
* - 使用枚举代替常量，组织性更强
* ----------------------------------------------------------------------------------*/
var log = console.log;
// 封装状态，而不是封装转换方法
var CandyMachine = /** @class */ (function () {
    function CandyMachine(candyCnt) {
        this.candyCnt = candyCnt || 0;
        this.state = 1 /* NO_QUARTER */;
    }
    CandyMachine.prototype.insertCoin = function () {
        log('You inserted a quarter.');
        if (this.state === 0 /* HAS_QUARTER */) {
            log('Already has a quarter.');
        }
        this._setState(0 /* HAS_QUARTER */);
    };
    CandyMachine.prototype.pullTrigger = function () {
        log('You pulled the trigger.');
        if (this.state === 0 /* HAS_QUARTER */) {
            this._setState(2 /* SOLD */);
        }
        else {
            log('No quarter.');
        }
    };
    CandyMachine.prototype.refill = function () {
        log('Candy refill.');
        this.candyCnt += 1;
        this._setState(1 /* NO_QUARTER */);
    };
    CandyMachine.prototype.dispense = function () {
        if (this.candyCnt > 0) {
            this.candyCnt -= 1;
            log('Dispense candy.');
            this._setState(1 /* NO_QUARTER */);
        }
        else {
            this._setState(3 /* SOLD_OUT */);
        }
    };
    CandyMachine.prototype._noQuarter = function () {
        log('No quarter.');
    };
    CandyMachine.prototype._hasQuarter = function () {
        log('There is quarter.');
    };
    CandyMachine.prototype._sold = function () {
        this.dispense();
    };
    CandyMachine.prototype._soldOut = function () {
        log('Candy sold out.');
    };
    // 核心方法，管理状态跳转
    CandyMachine.prototype._setState = function (state) {
        var _a;
        var _this = this;
        // 可执行分支方法
        var fn = (_a = {},
            _a[1 /* NO_QUARTER */] = function () { return _this._noQuarter(); },
            _a[0 /* HAS_QUARTER */] = function () { return _this._hasQuarter(); },
            _a[2 /* SOLD */] = function () { return _this._sold(); },
            _a[3 /* SOLD_OUT */] = function () { return _this._soldOut(); },
            _a)[state];
        this.state = state;
        fn();
    };
    return CandyMachine;
}());
var candyMachine = new CandyMachine(1);
log('/*------ Good CandyMachine ------*/');
log('/*-- 1 --*/');
candyMachine.insertCoin();
candyMachine.pullTrigger();
log('/*-- 2 --*/');
candyMachine.pullTrigger();
log('/*-- 3 --*/');
candyMachine.insertCoin();
candyMachine.pullTrigger();
log('/*-- 4 --*/');
candyMachine.insertCoin();
candyMachine.refill();
candyMachine.pullTrigger();
//# sourceMappingURL=index.js.map