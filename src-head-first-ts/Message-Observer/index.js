/*----------------------------------------------------------------------------------
* TS 的作用：/
* ----------------------------------------------------------------------------------*/
var getRanNum = function () { return parseInt(String(Math.random() * Math.pow(10, 8))); };
/**
 * 构造函数：频道对象
 * @param name
 * @constructor
 */
var PublishChannel = /** @class */ (function () {
    function PublishChannel(name) {
        this.name = name;
        this.id = String(getRanNum()); // 随机 id
    }
    // 发送消息
    PublishChannel.prototype.postMessage = function (data) {
        var _this = this;
        var evt = {
            data: data
        };
        PublishChannel.fnList.forEach(function (item) {
            if (item.name === _this.name && // 同一频道
                item.id !== _this.id // 自己不接收
            ) {
                item.fn(evt);
            }
        });
    };
    // 订阅函数
    PublishChannel.prototype.onmessage = function (fn) {
        PublishChannel.fnList.push({
            name: this.name,
            id: this.id,
            fn: fn.bind(this) // 回调指向频道实例，而不是push进去的对象
        });
    };
    // 清除fnList相应id的对象，避免占用内存过多
    PublishChannel.prototype.clear = function () {
        var _this = this;
        PublishChannel.fnList = PublishChannel.fnList.filter(function (item) { return item.id !== _this.id; });
    };
    PublishChannel.fnList = [];
    return PublishChannel;
}());
var CHANNEL_1 = '1';
var CHANNEL_2 = '2';
// 频道的发布者和订阅者们
var publisher1 = new PublishChannel(CHANNEL_1);
var subscribe1_1 = new PublishChannel(CHANNEL_1);
var subscribe1_2 = new PublishChannel(CHANNEL_1);
var publisher2_1 = new PublishChannel(CHANNEL_2);
var publisher2_2 = new PublishChannel(CHANNEL_2);
var subscribe2 = new PublishChannel(CHANNEL_2);
// 开始通信1
Object.defineProperty(subscribe1_1, 'foo', {
    value: '用于鉴定接收作用域正确'
});
subscribe1_1.onmessage(function (evt) {
    console.log(this);
    console.log('作用域是否正确:', this.foo !== undefined);
    console.log('订阅者1_1收到啦', evt);
});
subscribe1_2.onmessage(function (evt) {
    console.log('订阅者1_2收到啦', evt);
});
publisher1.onmessage(function (evt) {
    console.log('发布者1不应该收到自己发出的', evt);
});
publisher1.postMessage('hello');
// 开始通信2
subscribe2.onmessage(function (evt) {
    console.log('订阅者2第一次收到啦', evt);
});
subscribe2.onmessage(function (evt) {
    console.log('订阅者2第二次收到啦', evt);
});
publisher2_1.postMessage('hello1');
publisher2_2.postMessage('hello2');
//# sourceMappingURL=index.js.map