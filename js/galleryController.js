var gInitalEvent
var gIsDownload = false

function onInit(ev) {
  buildGimgs(16)
  initGmeme()
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
  var elMainContentGallery = document.querySelector(".main-content")
  var elMemePage =  document.querySelector(".meme-page")


    elMainContentGallery.style.display = "block"
    elMemePage.style.display = 'none'
    elGallery.innerHTML = strHtml
    initGmeme()
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

//FILTER BY KEYWORD
function onSelecetedWord(text) {
  setFilterBy(text)
  if (text) {
    gKeywordSearchCountMap[text]++
    saveKeyWordsToStorage()
  }
  renderKeyWords()
  renderGallery()
}

function saveKeyWordsToStorage() {
  saveToStorage(KEY_WORDS, gKeywordSearchCountMap)
}

//RENDER TO THE DOM
function renderKeyWords() {
  for (const key in gKeywordSearchCountMap) {
    currEl = document.querySelector(`.${key}`)
    currEl.style.fontSize = gKeywordSearchCountMap[key] + `px`
  }
}
