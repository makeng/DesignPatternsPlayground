"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var AlphabeticalOrderIterator = /** @class */ (function () {
    function AlphabeticalOrderIterator(list, isReverse) {
        this.list = __spreadArrays(list);
        this.isReverse = isReverse || false;
        this.position = isReverse ? list.length - 1 : 0;
    }
    // Return the current element.
    AlphabeticalOrderIterator.prototype.current = function () {
        var _a = this, list = _a.list, position = _a.position;
        return list[position];
    };
    // Return the current element and move forward to next element.
    AlphabeticalOrderIterator.prototype.next = function () {
        var _a = this, list = _a.list, position = _a.position, isReverse = _a.isReverse;
        var res = list[position];
        this.position = isReverse
            ? position - 1
            : position + 1;
        return res;
    };
    // Return the key of the current element.
    AlphabeticalOrderIterator.prototype.key = function () {
        return this.position;
    };
    // Checks if current position is valid.
    AlphabeticalOrderIterator.prototype.isValid = function () {
        return this.isReverse
            ? this.position >= 0
            : this.position <= this.list.length - 1;
    };
    // Rewind the Iterator to the first element.
    AlphabeticalOrderIterator.prototype.rewind = function () {
        this.position = this.isReverse
            ? this.list.length - 1
            : 0;
    };
    return AlphabeticalOrderIterator;
}());
// 字符收集器
var WordsCollector = /** @class */ (function () {
    function WordsCollector() {
        this.list = [];
    }
    WordsCollector.prototype.addItem = function (word) {
        this.list.push(word);
    };
    WordsCollector.prototype.getIterator = function () {
        return new AlphabeticalOrderIterator(this.list);
    };
    WordsCollector.prototype.getReverseIterator = function () {
        return new AlphabeticalOrderIterator(this.list, true);
    };
    return WordsCollector;
}());
var wordsCollector = new WordsCollector();
wordsCollector.addItem('First');
wordsCollector.addItem('Second');
wordsCollector.addItem('Third');
var iterator = wordsCollector.getIterator();
console.log('Straight traversal:');
while (iterator.isValid()) {
    console.log(iterator.next());
}
console.log('Reverse traversal:');
var reverseIterator = wordsCollector.getReverseIterator();
while (reverseIterator.isValid()) {
    console.log(reverseIterator.next());
}
//# sourceMappingURL=index.js.map