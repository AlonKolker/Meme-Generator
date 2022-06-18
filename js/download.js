function downloadImg(elLink) {
  gIsDownload = true
renderCanvas()
gIsDownload = false
  var imgContent = gCanvas.toDataURL('image/jpeg')// image/jpeg the default format
    elLink.href = imgContent

  }
  // The next 2 functions handle IMAGE UPLOADING to img tag from file system: 
  function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
  }