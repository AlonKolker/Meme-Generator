var gCanvas
var gCtx
var gKeywordSearchCountMap = { funny: 12, happy: 16 }
var gImgs = [{ id: 1, url: "img/1.jpg", keywords: ["funny", "cat"] }]
var gCurrImg

function renderMeme(el) {
  gCanvas = document.getElementById("meme-Canvas")
  gCtx = gCanvas.getContext("2d")
  var elMemeArea = document.querySelector(".meme-conteiner")
  elMemeArea.style.display = "flex"

  //   console.log("imgNum", imgNum)
  //   var currImg = gImgs
  //   console.log(currImg[imgNum].url)

  hideGallery()
  //   renderImg(currImg[imgNum].url)
  gCurrImg = +el.id
  console.log(gCurrImg)

  renderImg(gCurrImg)
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

function renderImg(imgIdx) {
  var imgIdx = imgIdx - 1
  var currImg = gImgs[imgIdx].url

  //Draw the img on the canvas
  //   gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
  base_image = new Image()
  base_image.src = currImg
  base_image.onload = () => gCtx.drawImage(base_image, 0, 0)
}

function onTxtInput(text) {
  drawText(text, gCanvas.width / 2, gCanvas.height / 2)
}
function drawText(text, x, y) {
  // drawRect(text,x, y)

//   renderImg(gCurrImg)
  gCtx.lineWidth = 1.5
  gCtx.strokeStyle = "'white'"
  gCtx.fillStyle = "white"
  gCtx.font = "42px Impact"
  gCtx.fillText(text, x - gCtx.measureText(text).width / 2, y - 200) //Draws (fills) a given text at the given (x, y) position.
  gCtx.strokeText(text, x - gCtx.measureText(text).width / 2, y - 200) //Draws (strokes) a given text at the given (x, y) position.
}

// function drawRect(text='',x, y) {

//     var txtWidth = gCtx.measureText(text).width
//     console.log(txtWidth);
//     gCtx.beginPath()
//     gCtx.rect(x-10, -20, txtWidth+10, 50)

//     gCtx.strokeStyle = "red"
//     gCtx.stroke()
//   }

