/* ---------------------------------------------------------------------------------------
* TS 的作用：提供 Promise 泛类
* ---------------------------------------------------------------------------------------- */
var log = console.log;
var Img = /** @class */ (function () {
    function Img(url) {
        this.url = url;
    }
    Img.prototype.paintIcon = function () {
        log("<img src=\"" + this.url + " />\"");
    };
    return Img;
}());
var ImgIcon = /** @class */ (function () {
    function ImgIcon() {
    }
    ImgIcon.prototype.paintIcon = function (url) {
        if (!url) {
            return 'Image is loading.';
        }
        return url;
    };
    return ImgIcon;
}());
/* ----------------------------------------- 共用类 ----------------------------------------- */
var ImgProxy = /** @class */ (function () {
    function ImgProxy() {
    }
    ImgProxy.prototype.paintIcon = function () {
        return Promise.resolve('http://t8.baidu.com/it/u=1484500186,1503043093&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg');
    };
    return ImgProxy;
}());
/* ----------------------------------------- 实例 ----------------------------------------- */
var imgProxy = new ImgProxy();
imgProxy.paintIcon().then(function (url) {
    var imgIcon = new ImgIcon();
    var content = imgIcon.paintIcon(url);
    var img = new Img(content);
    img.paintIcon();
});
//# sourceMappingURL=index.js.map