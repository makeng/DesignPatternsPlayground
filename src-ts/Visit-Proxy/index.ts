/* ---------------------------------------------------------------------------------------
* TS 的作用：提供 Promise 泛类
* ---------------------------------------------------------------------------------------- */
const { log } = console

class Img {
  url: string

  constructor (url) {
    this.url = url
  }

  paintIcon () {
    log(`<img src="${this.url} />"`)
  }
}

class ImgIcon {
  paintIcon (url):string {
    if (!url) {
      return 'Image is loading.'
    }
    return url
  }
}

/* ----------------------------------------- 共用类 ----------------------------------------- */
class ImgProxy {
  paintIcon (): Promise<string> {
    return Promise.resolve(
      'http://t8.baidu.com/it/u=1484500186,1503043093&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg'
    )
  }
}

/* ----------------------------------------- 实例 ----------------------------------------- */
const imgProxy = new ImgProxy()
imgProxy.paintIcon().then(url => {
  const imgIcon = new ImgIcon()
  const content = imgIcon.paintIcon(url)
  const img = new Img(content)
  img.paintIcon()
})

