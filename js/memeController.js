function renderMeme(el) {
  console.log(el)
  console.log(el.id)
  // clean the gallery
  var elGallery = document.querySelector(".gallery")
  var elFilterBar = document.querySelector(".filter-bar")
  var elMemeArea = document.querySelector(".meme-conteiner")
  // elGallery.innerHTML = ``
  elGallery.style.display = "none"
  elFilterBar.style.display = "none"

  //
  var elMemeArea = document.querySelector(".meme-conteiner")
  elMemeArea.style.display = "flex"
}
