const STORAGE_KEY = "memsDB"

function addLine() {
  if (gMeme.selectedLineIdx === 2) return
  gMeme.selectedLineIdx++

  if (gMeme.selectedLineIdx == 1) {
    gMeme.lines.push({
      txt: "YEPP!",
      size: 42,
      align: "left",
      color: "white",
      font: "impact",
      posX: gCanvas.width / 3,
      posY: gCanvas.height - 250,
      isDrag:false,
      width: 250,

    })
  }

  if (gMeme.selectedLineIdx == 2) {
    gMeme.lines.push({
      txt: "WoW!",
      size: 42,
      align: "left",
      color: "white",
      font: "impact",
      posX: gCanvas.width / 3,
      posY: gCanvas.height - 30,
      isDrag:false,
      width: 250,


    })
  }
}

function getMeme() {
  return gMeme
}

function getMemeIdx() {
  var currGmemeIdx = gMeme.selectedLineIdx
  return currGmemeIdx
}

//GET TXT INPUT
function txtInput(text) {
  gMeme.lines[getMemeIdx()].txt = text
}

function lineDelete() {
  gMeme.lines[getMemeIdx()].txt = ""
  if (gMeme.selectedLineIdx === 0) return
  gMeme.selectedLineIdx--

  gMeme.lines.pop()
}

function downOrUpLine(plusOrMines) {
  gMeme.lines[getMemeIdx()].posY += 5 * plusOrMines
}

function changeFontSize(plusOrMines) {
  gMeme.lines[getMemeIdx()].size += 5 * plusOrMines
}

function changeFont(newFont) {
  gMeme.lines[getMemeIdx()].font = newFont
}

function chaneFontColor(userColor) {
  gMeme.lines[getMemeIdx()].color = userColor
}

function switchLine() {
  const leng = gMeme.lines.length

  renderCanvas()
  rotateCyclic(gMeme.lines, leng)
}

//CYCLIC FUNC FOR SWITCH LINES
function rotateCyclic(arr, n) {
  var x = arr[n - 1],
    i
  for (i = n - 1; i > 0; i--) arr[i] = arr[i - 1]
  arr[0] = x
}

function alignText(alignTo) {
  switch (alignTo) {
    case "left":
      gMeme.lines[getMemeIdx()].posX = gCanvas.width - gCanvas.width + 10
      break
    case "right":
      gMeme.lines[getMemeIdx()].posX =
        gCanvas.width -
        gCtx.measureText(gMeme.lines[getMemeIdx()].txt).width -
        10
      break
    case "center":
      gMeme.lines[getMemeIdx()].posX =
        (gCanvas.width -
          gCtx.measureText(gMeme.lines[getMemeIdx()].txt).width) /
        2

      break
  }
}

function saveCanvasToStorage() {
  saveToStorage(STORAGE_KEY, gMeme)
  localStorage.setItem(gCtx, gCanvas.toDataURL())
}

//NEED TO BE IN SERVICE
function getCanvasFromStorage() {
  var dataURL = localStorage.getItem(gCtx)
  var img = new Image()
  img.src = dataURL
  img.onload = function () {
    gCtx.drawImage(img, 0, 0)
  }
  gMeme = loadFromStorage(STORAGE_KEY)
  gCurrImg = gMeme.selectedImgId
  renderImg(gCurrImg)
}

function getLineArea(line) {
  if (!gMeme.lines.length) return
  return {
    x: line.posX - 3,
    y: line.posY,
    width: line.width + 5,
    height: line.size + 3,
  }
}

//Check if the click is inside the text
function isTextClicked(clickedPos) {
  let lineIdx = gMeme.lines.findIndex((line) => {
    const lineArea = getLineArea(line)
 
    return (
      lineArea.x < clickedPos.x &&
      lineArea.x + lineArea.width > clickedPos.x &&
      lineArea.y > clickedPos.y &&
      lineArea.y - lineArea.height < clickedPos.y
    )
  })
  return lineIdx
}

function setSelectedLine(lineIdx) {
  const line = gMeme.lines.splice(lineIdx, 1)[0]
  gMeme.lines.push(line)
}

function setTextDrag(isDrag) {
  const line = gMeme.lines[getMemeIdx()]
  line.isDrag = isDrag
}
var gStartPos
function moveText(dx, dy) {
  gStartPos.x += dx
  gStartPos.y += dy
}

function getCurrLine() {
  return gMeme.lines[getMemeIdx()]
}
