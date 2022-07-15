"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 家电
var light = {
    status: 'off',
    on: function () {
        this.status = 'on';
        console.log('light on');
    },
    off: function () {
        this.status = 'off';
        console.log('light off');
    }
};
var curtain = {
    status: 'open',
    open: function () {
        this.status = 'open';
        console.log('curtain open');
    },
    close: function () {
        this.status = 'close';
        console.log('curtain close');
    }
};
var door = {
    status: 'close',
    open: function () {
        this.status = 'open';
        console.log('door open');
    },
    close: function () {
        this.status = 'close';
        console.log('door close');
    }
};
// 遥控器，可以学习&执行
var RemoteControl = /** @class */ (function () {
    function RemoteControl() {
        this.cmdList = []; // 命令列表，对象格式为 {name, fnList}
        this.historyStatusList = [];
    }
    // 学习：存入命令
    RemoteControl.prototype.learn = function (name, fnList) {
        this.cmdList.push({
            name: name,
            fnList: fnList
        });
    };
    // 执行命令
    RemoteControl.prototype.execute = function (name) {
        // 执行，并记录操作历史
        console.log("Now executing " + name + " command...");
        var command = this.cmdList.find(function (item) { return item.name === name; });
        var oldStatus = [];
        command.fnList.forEach(function (item) {
            var device = item.device, command = item.command;
            if (device && device[command]) {
                oldStatus.unshift({
                    device: device,
                    status: device.status
                });
                device[item.command](); // 执行具体指令
            }
            else {
                console.log('no command');
            }
        });
        this.historyStatusList = oldStatus;
        console.log("Command executed.");
    };
    // 还原状态
    RemoteControl.prototype.undo = function () {
        this.historyStatusList.forEach(function (item) {
            var device = item.device, status = item.status;
            device.status = status;
            console.log(device, status);
        });
    };
    return RemoteControl;
}());
// 学习并执行
var remoteControl = new RemoteControl();
remoteControl.learn('night mode', [
    { device: light, command: 'on' },
    { device: curtain, command: 'open' },
    { device: door, command: 'open' }
]);
remoteControl.execute('night mode');
// 还原
console.log('Now undo all commands...');
remoteControl.undo();
console.log(light.status, curtain.status, door.status);
//# sourceMappingURL=index.js.map