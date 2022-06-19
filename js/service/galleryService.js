const KEY_WORDS = "keywords_db"
var gKeywordSearchCountMap = {}
var gFilterBy = ""
var gImgs = []
var gMeme

// BUILD IMG OBJECT
function buildGimgs(nums = 16) {
  const keywords = [
    ["president", "man", "trump"],
    ["dog", "animal"],
    ["baby", "animal", "dog"],
    ["animal", "cat"],
    ["baby"],
    ["man"],
    ["baby"],
    ["man"],
    ["baby"],
    ["president", "obama;"],
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
  gImgs.forEach((img, idx) => (img["keyword"] = keywords[idx]))
  return gImgs
}

//NEED TO BE IN THE CONTROLLER
function onloadKeyWords() {
  gKeywordSearchCountMap = loadFromStorage(KEY_WORDS)
  if (!gKeywordSearchCountMap || gKeywordSearchCountMap === {}) {
    gKeywordSearchCountMap = {
      president: 16,
      man: 16,
      animal: 16,
      baby: 16,
      cat: 16,
      dog: 16,
      obama: 16,
      trump: 16,
    }
  }

  saveKeyWordsToStorage()

  renderKeyWords()
}
function initGmeme() {
  gMeme = {
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
        isDrag: false,
        width: 250,
      },
    ],
  }
}


function setFilterBy(txt) {
  gFilterBy = txt
}

function filterBy() {
  var imgsFilter = gImgs
  if (gFilterBy) {
    imgsFilter = gImgs.filter((img) =>
      img.keyword.some((keyword) =>
        keyword.toUpperCase().includes(gFilterBy.toUpperCase())
      )
    )
  }
  return imgsFilter
}
