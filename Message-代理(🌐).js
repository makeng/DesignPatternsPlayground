/* ---------------------------------------------------------------------------------------
* about:代理模式
* author:马兆铿（13790371603 810768333@qq.com）
* date:2019-01-17
* ---------------------------------------------------------------------------------------- */
const log = console.log

class Img {
  constructor (url) {
    this.url = url
  }

  paintIcon () {
    log(`<img src="${this.url} />"`)
  }
}

class ImgIcon {
  paintIcon (url) {
    if (!url) {
      return 'Image is loading.'
    }
    return url
  }
}

/* ----------------------------------------- 共用类 ----------------------------------------- */
class ImgProxy {
  paintIcon () {
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

