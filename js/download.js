function downloadImg(elLink) {
  gIsDownload = true
  renderCanvas()
  gIsDownload = false
  var imgContent = gCanvas.toDataURL("image/jpeg") // image/jpeg the default format
  elLink.href = imgContent
}
