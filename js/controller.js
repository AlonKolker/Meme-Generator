var gInitalEvent
var gIsDownload = false



function onInit(ev) {
  buildGimgs(16)
  renderGallery(ev)
  onloadKeyWords()
}


//RENDER GALLERY AND HIDE MEME AREA
function renderGallery(ev = 0) {
  if (ev === 0) ev = gInitalEvent
  gInitalEvent = ev
  ev.preventDefault()

  const imgArr = filterBy()
  strHtml = ""

  imgArr.forEach((img, idx) => {
    strHtml += `<img src="${img.url}" alt="" class="gallery-img img${
      idx + 1
    }" id="${img.id}" onclick="onRenderMeme(this)"/>`
  })

  var elGallery = document.querySelector(".gallery")
  var elFilterBar = document.querySelector(".filter-bar")
  var elMemeArea = document.querySelector(".meme-conteiner")
  var elFilter = document.querySelector(".filter-bg-layout")

  elFilter.style.display = "flex"
  elGallery.style.display = "grid"
  elFilterBar.style.display = "flex"
  elMemeArea.style.display = "none"

  elGallery.innerHTML = strHtml
}

//RENDER THE CANVAS
function renderCanvas() {
  const meme = getMeme()
  renderImg()
  drawText(meme.lines)
}

//TOGGLE THE MANE BAR
function toggleMenu() {
  document.body.classList.toggle("menu-open")
  elToggle = document.querySelector(".menu-toggle")

  if (document.body.classList.contains("menu-open")) {
    elToggle.innerHTML = `<i class="fa-solid fa-square-xmark"></i>`
  } else {
    elToggle.innerText = "☰"
  }
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

//RENDER THE MEME AREA
function onRenderMeme(el = 0) {
  var elMemeArea = document.querySelector(".meme-conteiner")
  if (el !== 0) {
    elMemeArea.style.display = "flex"
    gCurrImg = +el.id
  }
  var elFilter = document.querySelector(".filter-bg-layout")
  elFilter.style.display = "none"

  renderCanvas()
  hideGallery()
}

//HELPER FOR RNEDER MEME
function hideGallery() {
  // clean the gallery
  var elGallery = document.querySelector(".gallery")
  var elFilterBar = document.querySelector(".filter-bar")
  elGallery.style.display = "none"
  elFilterBar.style.display = "none"
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

//SAVAE CANVAS TO STORGE AND THE CURRENT MEME FOR KNOWN CURRENT POS,NEED TO BE IN SERVICE
function saveCanvasToStorage() {
  saveToStorage(STORAGE_KEY, gMeme)
  localStorage.setItem(gCtx, gCanvas.toDataURL())
}

//NEED TO BE IN SERVICE
function genCanvasFromStorage() {
  var dataURL = localStorage.getItem(gCtx)
  var img = new Image()
  img.src = dataURL
  img.onload = function () {
    gCtx.drawImage(img, 0, 0)
  }
  gMeme = loadFromStorage(STORAGE_KEY)
  // gCurrImg = gMeme.selectedImgId
  renderImg(gCurrImg)
}

//FILTER BY KEYWORD
function onSelecetedWord(text) {
  setFilterBy(text)
  var elTxt = document.querySelector(`.${text}`)
  gKeywordSearchCountMap[text]++
  elTxt.style.fontSize = `${gKeywordSearchCountMap[text]}` + `px`
  renderGallery()
  renderKeyWords()
  saveKeyWordsToStorage()
}

//NEED TO BE IN SERVICE
function saveKeyWordsToStorage() {
  saveToStorage(KEY_WORDS, gKeywordSearchCountMap)
}

//RENDER TO DHE DOM
function renderKeyWords() {
  console.log(gKeywordSearchCountMap)
  var elKeyBaby = document.querySelector(".baby")
  var elKeyMan = document.querySelector(".man")
  var elKeyAnimal = document.querySelector(".animal")
  var elKeyPredident = document.querySelector(".president")
  var elKeyObama = document.querySelector(".obama")
  var elKeyTrump = document.querySelector(".trump")

  elKeyBaby.style.fontSize = gKeywordSearchCountMap.baby + "px"
  elKeyMan.style.fontSize = gKeywordSearchCountMap.man + "px"
  elKeyAnimal.style.fontSize = gKeywordSearchCountMap.animal + "px"
  elKeyPredident.style.fontSize = gKeywordSearchCountMap.president + "px"
  elKeyObama.style.fontSize = gKeywordSearchCountMap.obama + "px"
  elKeyTrump.style.fontSize = gKeywordSearchCountMap.trump + "px"
}
