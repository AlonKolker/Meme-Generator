const gCanvas = document.getElementById("meme-Canvas")
const gCtx = gCanvas.getContext("2d")
var gCurrImg

//RENDER THE MEME AREA
function onRenderMeme(el = 0) {
  gCurrImg = +el.id

  var elMainContentGallery = document.querySelector(".main-content")
  var elMemePage = document.querySelector(".meme-page")
  elMainContentGallery.style.display = "none"
  elMemePage.style.display = "block"

  addMouseListeners()
  renderCanvas()
}

//RENDER THE CANVAS
function renderCanvas() {
  const meme = getMeme()
  renderImg()
  drawText(meme.lines)
}

function clearCanvas() {
  gCtx.clearRect(0, 0, gCanvas.height, gCanvas.width)
}

function drawText(text) {
  for (var i = 0; i <= gMeme.selectedLineIdx; i++) {
    gCtx.lineWidth = 1.5
    gCtx.font = `${text[i].size}px ${text[i].font}`
    gCtx.fillStyle = text[i].color
    gCtx.strokeStyle = "black"
    gCtx.fillText(text[i].txt, text[i].posX, text[i].posY) //Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text[i].txt, text[i].posX, text[i].posY) //Draws (strokes) a given text at the given (x, y) position.
  }
  //IN CASE OF DWONLOAD
  if (gIsDownload !== true) drawRect(gMeme.lines[getMemeIdx()])
}

function drawRect(text) {
  var txtWid = gCtx.measureText(text.txt).width
  var x = text.posX
  var y = text.posY
  gCtx.beginPath()
  gCtx.rect(x, y + 5, txtWid, -text.size)
  gCtx.strokeStyle = "red"
  gCtx.stroke()
}

function renderImg(imgIdx = gCurrImg) {
  gMeme.selectedImgId = imgIdx
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

//SAVE CANVAS TO STORGE AND THE CURRENT MEME FOR KNOWN CURRENT POS,NEED TO BE IN SERVICE
function onSaveCanvasToStorage() {
  saveCanvasToStorage()
}

function onGetCanvasFromStorage() {
  getCanvasFromStorage()
}

//ENTER TEXT INTO THE CANVAS
function onTxtInput(userText) {
  clearCanvas()
  txtInput(userText)
  renderCanvas()
}

function onFilterBy(txt) {
  setFilterBy(txt)
  renderGallery()
}

function addMouseListeners() {
  gCanvas.addEventListener("mousemove", onMove)
  gCanvas.addEventListener("mousedown", onDown)
  gCanvas.addEventListener("mouseup", onUp)
}

function addTouchListeners() {
  gElCanvas.addEventListener("touchmove", onMove)
  gElCanvas.addEventListener("touchstart", onDown)
  gElCanvas.addEventListener("touchend", onUp)
}
const gTouchEvs = ["touchstart", "touchmove", "touchend"]

function onDown(ev) {
  //Get the ev pos from mouse or touch
  const pos = getEvPos(ev)
  const lineIdx = isTextClicked(pos)
  if (lineIdx === -1) return
  setSelectedLine(lineIdx)
  setTextDrag(true)
  //Save the pos we start from
  gStartPos = pos
  document.body.style.cursor = "grabbing"
  renderCanvas()
}
function onMove(ev) {
  const line = getCurrLine()
  if (!line.isDrag) return
  const pos = getEvPos(ev)
  //Calc the delta , the diff we moved
  const dx = pos.x - gStartPos.x
  const dy = pos.y - gStartPos.y
  // moveText(dx, dy)
  //Save the last pos , we remember where we`ve been and move accordingly
  gStartPos = pos
  line.posX += dx
  line.posY += dy
  document.body.style.cursor = "grabbing"
  //The canvas is render again after every move
  renderCanvas()
}

function onUp() {
  setTextDrag(false)
  document.body.style.cursor = "grab"
}

function getEvPos(ev) {
  //Gets the offset pos , the default pos
  var pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }
  // Check if its a touch ev
  if (gTouchEvs.includes(ev.type)) {
    //soo we will not trigger the mouse ev
    ev.preventDefault()
    //Gets the first touch point
    ev = ev.changedTouches[0]
    //Calc the right pos according to the touch screen
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    }
  }
  return pos
}

