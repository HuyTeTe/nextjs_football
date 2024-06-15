function StyleEleCenter(elems) {
  elems.forEach(function (elem) {
    document.querySelectorAll(elem).forEach(function (elm) {
      elm.style.textAlign = "center";
    });
  });
}

function StyleElePadding(elemsObj) {
  elemsObj.forEach(function (elem) {
    document.querySelectorAll(elem.key).forEach(function (elm) {
      elm.style.padding = elem.value;
    });
  });
}

function StyleEleTextColor(elemsObj) {
  elemsObj.forEach(function (elem) {
    document.querySelectorAll(elem.key).forEach(function (elm) {
      elm.style.color = elem.value;
    });
  });
}

function StyleEleBackground(elemsObj) {
  elemsObj.forEach(function (elem) {
    document.querySelectorAll(elem.key).forEach(function (elm) {
      elm.style.background = elem.value;
    });
  });
}

function CheckImgLazy(elem) {
  try {
    var imgLazySetTime = setTimeout(() => {
      document.querySelectorAll(elem).forEach(function (elm) {
        if (!elm) {
          clearTimeout(imgLazySetTime);
        }
        let imgLazy = elm.getAttribute("data-original");
        let originImg = elm.getAttribute("src");
        elm.style.marginRight = "10px";
        if (imgLazy != originImg) {
          elm.setAttribute("src", imgLazy);
        }
      });
      // update style handpoint
      document.querySelectorAll('.handpoint.status span').forEach(function (elm) {
        StyleTagOdd(elm)
      })
      document.querySelectorAll('.handpoint.status').forEach(function (elm) {
        StyleTagOdd(elm)
      })
      
    }, "10000");
  } catch (err) {
    clearTimeout(imgLazySetTime);
  }
}

function FilterScore(score)
{
  if (score.includes("undefined")) {
    return "<span style='display:block;margin-bottom:6px'> - </span>";
  }
  let scoreTmp = score.split(" - ");
  return "<span style='display:block;margin-bottom:6px'>" + scoreTmp[0] + "</span><span style='display:block;margin-top:6px'>" + scoreTmp[1] + "</span>";
}

function AddBlingBackgroud(elem, originColor="white")
{
  try {
    if (!elem) {
      return;
    }
    elem.style.background = "#e6e600";
    var addBling = setTimeout(function(){
      elem.style.background = originColor;
    }, 7000);
    } catch (err) {
      clearTimeout(addBling);
    }
}

function IsTimeHidden(elem)
{
  if (elem.style.display != "none") {
    elem.style.display = "none";
    return false;
  }

  return true;
}

function StyleTagOdd(elem)
{
  elem.style.fontSize = "0.8rem";
  elem.style.fontWeight = "bold";
  elem.style.color = "#00a6fb";
  elem.style.textAlign = "center";

  return elem;
}

export {
  StyleEleCenter,
  StyleElePadding,
  StyleEleTextColor,
  StyleEleBackground,
  CheckImgLazy,
  FilterScore,
  AddBlingBackgroud,
  IsTimeHidden,
  StyleTagOdd
};
