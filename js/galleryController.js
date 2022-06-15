
function onInit(ev) {
    ev.preventDefault()
    strHtml = `<img src="img/1.jpg" alt="" class="gallery-img img1" id="1" onclick="renderMeme(this)"/>
    <img src="img/2.jpg" alt="" class="gallery-img img2" id="2" onclick="renderMeme(this)" />
    <img src="img/3.jpg" alt="" class="gallery-img img3" id="3" onclick="renderMeme(this)"/>
    <img src="img/4.jpg" alt="" class="gallery-img img4" id="4"onclick="renderMeme(this)"/>
    <img src="img/5.jpg" alt="" class="gallery-img img5" id="5" onclick="renderMeme(this)"/>
    <img src="img/6.jpg" alt="" class="gallery-img img6" id="6" onclick="renderMeme(this)"/>
    <img src="img/7.jpg" alt="" class="gallery-img img7" id="7" onclick="renderMeme(this)"/>
    <img src="img/8.jpg" alt="" class="gallery-img img8" id="8" onclick="renderMeme(this)"/>
    <img src="img/9.jpg" alt="" class="gallery-img img9" id="9" onclick="renderMeme(this)"/>
    <img src="img/10.jpg" alt="" class="gallery-img img10" id="10" onclick="renderMeme(this)"/>
    <img src="img/11.jpg" alt="" class="gallery-img img11" id="11"onclick="renderMeme(this)"/>
    <img src="img/12.jpg" alt="" class="gallery-img img12" id="12" onclick="renderMeme(this)"/>
    <img src="img/13.jpg" alt="" class="gallery-img img13" id="13"onclick="renderMeme(this)" />
    <img src="img/14.jpg" alt="" class="gallery-img img14" id="14"onclick="renderMeme(this)"/>
    <img src="img/15.jpg" alt="" class="gallery-img img15" id="15" onclick="renderMeme(this)"/>
    <img src="img/16.jpg" alt="" class="gallery-img img16" id="16" onclick="renderMeme(this)"/>`

  var elGallery = document.querySelector(".gallery")
  elGallery.innerHTML = strHtml
  elGallery.style.display = 'grid'
  var elFilterBar = document.querySelector(".filter-bar")
  elFilterBar.style.display = 'flex'
  var elDetails = document.querySelector(".my-details")
  elDetails.style.display = 'block'
  var elMemeArea = document.querySelector('.meme-conteiner')
  elMemeArea.style.display = 'none'
}
