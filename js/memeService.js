const gCanvas = document.getElementById("meme-Canvas")
const gCtx = gCanvas.getContext("2d")
var gKeywordSearchCountMap = { funny: 12, happy: 16 }
const STORAGE_KEY = "memsDB"

var gImgs = []
var gCurrImg
var gMeme = {
  selectedImgId: 0,
  selectedLineIdx: 0,
  lines: [
    {
      txt: "LETS DO IT!",
      size: 42,
      align: "left",
      color: "white",
      font: "impact",
      posX: gCanvas.width / 3,
      posY: gCanvas.height - 450,
    },
  ],
}

function buildGimgs(nums = 16) {
  const keywords = [
    ["president", "man"],
    ["dog", "animal"],
    ["baby", "animal"],
    ["animal"],
    ["baby"],
    ["man"],
    ["baby"],
    ["man"],
    ["baby"],
    ["president"],
    ["man"],
    ["man"],
    ["man"],
    ["man"],
    ["man"],
    ["man"],
  ]
  for (var i = 1; i < nums + 1; i++) {
    gImgs.push({ id: i, url: `img/${i}.jpg` })
  }
  gImgs.forEach((img, idx) => (img["keyeord"] = keywords[idx]))
  return gImgs
}

function getMeme() {
  return gMeme
}
function getMemeIdx() {
  var currGmemeIdx = gMeme.selectedLineIdx
  return currGmemeIdx
}

function txtInput(text) {
  gMeme.lines[getMemeIdx()].txt = text
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
    })
  }
}

// function deleteRect(text){
//   console.log(text);
//     console.log(text.txt)
//     var txtWid = gCtx.measureText(text.txt).width
//     var x = text.posX
//     var y = text.posY
//     console.log(gCtx.measureText(text.txt).width)
//     gCtx.beginPath()
//     gCtx.clearRect(x, y+5, txtWid, -text.size)
//     // gCtx.strokeStyle = none
//     gCtx.stroke()

// }

// var gDeleteRect = false

function switchLine() {
  const leng = gMeme.lines.length
  // gDeleteRect = false
  // deleteRect(gMeme.lines[getMemeIdx()])
  renderCanvas()
  rotateCyclic(gMeme.lines, leng)
}

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

function onSaveMeme() {
  saveToStorage(STORAGE_KEY, gMeme)
}
