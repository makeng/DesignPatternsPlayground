/* ---------------------------------------------------------------------------------------
* TS 的作用（https://refactoringguru.cn/design-patterns/iterator/typescript/example）：
* - 创建支持泛型的接口 Iterator
* ---------------------------------------------------------------------------------------- */
import * as types from './types'

class AlphabeticalOrderIterator implements types.Iterator<string> {
  list: any[]
  isReverse: boolean
  position: number // 当前位置

  constructor (list, isReverse?: boolean) {
    this.list = [...list]
    this.isReverse = isReverse || false
    this.position = isReverse ? list.length - 1 : 0
  }

  // Return the current element.
  current () {
    const { list, position } = this
    return list[position]
  }

  // Return the current element and move forward to next element.
  next () {
    const { list, position, isReverse } = this
    const res = list[position]
    this.position = isReverse
      ? position - 1
      : position + 1
    return res
  }

  // Return the key of the current element.
  key () {
    return this.position
  }

  // Checks if current position is valid.
  isValid () {
    return this.isReverse
      ? this.position >= 0
      : this.position <= this.list.length - 1
  }

  // Rewind the Iterator to the first element.
  rewind () {
    this.position = this.isReverse
      ? this.list.length - 1
      : 0
  }
}

// 字符收集器
class WordsCollector {
  list: string[] = []

  addItem (word: string) {
    this.list.push(word)
  }

  getIterator (): types.Iterator<string> {
    return new AlphabeticalOrderIterator(this.list)
  }

  getReverseIterator (): types.Iterator<string> {
    return new AlphabeticalOrderIterator(this.list, true)
  }
}

const wordsCollector = new WordsCollector()
wordsCollector.addItem('First')
wordsCollector.addItem('Second')
wordsCollector.addItem('Third')

const iterator = wordsCollector.getIterator()

console.log('Straight traversal:')
while (iterator.isValid()) {
  console.log(iterator.next())
}

console.log('Reverse traversal:')
const reverseIterator = wordsCollector.getReverseIterator()
while (reverseIterator.isValid()) {
  console.log(reverseIterator.next())
}
