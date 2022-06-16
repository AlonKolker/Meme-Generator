var gInitEv

function onInit(ev) {
  renderGallery(ev)
}

function renderGallery(ev = 0) {
  if (ev === 0) ev = gInitEv
  gInitEv = ev
  ev.preventDefault()

  const imgArr = buildGimgs(16)

  strHtml = ""

  imgArr.forEach((img, idx) => {
    strHtml += `<img src="${img.url}" alt="" class="gallery-img img${
      idx + 1
    }" id="${idx + 1}" onclick="onRenderMeme(this)"/>`
  })

  var elGallery = document.querySelector(".gallery")
  var elFilterBar = document.querySelector(".filter-bar")
  var elDetails = document.querySelector(".my-details")
  var elMemeArea = document.querySelector(".meme-conteiner")

  elGallery.style.display = "grid"
  elFilterBar.style.display = "flex"
  elDetails.style.display = "flex"
  elMemeArea.style.display = "none"

  elGallery.innerHTML = strHtml
}

function onTxtInput(userText) {
  clearCanvas()
  txtInput(userText)
  renderCanvas()
}
function renderCanvas() {
  const meme = getMeme()
  renderImg()
  drawText(meme.lines)
}

function onRenderMeme(el = 0) {
  if (el !== 0) {
    var elMemeArea = document.querySelector(".meme-conteiner")
    elMemeArea.style.display = "flex"
    gCurrImg = +el.id
  }
  renderCanvas()
  hideGallery()
}

function hideGallery() {
  // clean the gallery
  var elGallery = document.querySelector(".gallery")
  var elFilterBar = document.querySelector(".filter-bar")
  var elDetails = document.querySelector(".my-details")
  elGallery.style.display = "none"
  elFilterBar.style.display = "none"
  elDetails.style.display = "none"
}

function renderImg(imgIdx = gCurrImg) {
  var imgIdx = imgIdx - 1
  var currImg = gImgs[imgIdx].url

  //Draw the img on the canvas
  base_image = new Image()
  base_image.src = currImg
  gCtx.drawImage(base_image, 0, 0, gCanvas.width, gCanvas.height)
}

function onLineDelete() {
  lineDelete()
  renderCanvas()
}

function onDownUpLine(plusOrMines) {
  downOrUpLine(plusOrMines)
  renderCanvas()
}

function onFontSize(bigOrSmall) {
  changeFontSize(bigOrSmall)
  renderCanvas()
}

function onChangeFont(font) {
  changeFont(font)
  renderCanvas()
}

function onFontColor(color) {
  chaneFontColor(color)
  renderCanvas()
}

function onAddLine() {
  addLine()
  renderCanvas()
}

function onSwitchLine() {
  switchLine()
  renderCanvas()
}

function onAlignText(newPos) {
  alignText(newPos)
  renderCanvas()
}


