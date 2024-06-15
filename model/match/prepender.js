function prependStarMatch(table, title, elem)
{
  let tmpElemAfter = elem;
  let tmpElemBefore = title?.previousSibling;
  let isHiddenTitle = true;
  let titleElem = title?.childNodes[1]?.childNodes[0]?.childNodes[1]?.innerText;
  for (let i = 0; i < 20; i++) {
    //check league after have same league
    if (tmpElemBefore?.classList && tmpElemBefore.classList.contains("Leaguestitle")) {
      let titlePreviousElem = tmpElemBefore?.childNodes[1]?.childNodes[0]?.childNodes[1]?.innerText;
      if (titlePreviousElem === titleElem) {
        isHiddenTitle = false;
      }
      break;
    }

    tmpElemBefore = tmpElemBefore?.previousSibling;
  }
  for (let i = 0; i < 20; i++) {
    //check league after have same league
    if (tmpElemAfter?.classList && tmpElemAfter.classList.contains("Leaguestitle") && tmpElemAfter.style.display !== "none") {
      break;
    }
    if (tmpElemAfter?.classList && tmpElemAfter.classList.contains("Leaguestitle") && tmpElemAfter.style.display === "none" && isHiddenTitle) {
      tmpElemAfter.style.display = "";
      break;
    }
    tmpElemAfter = tmpElemAfter?.nextSibling;
  }

  // hiep phu checking
  if (elem?.nextSibling?.style?.display == "" && elem?.nextSibling?.className.includes("adtext-bg")) {
    table.prepend(elem.nextSibling);
  }

  table.prepend(elem);
  if (title.style.display == "none") {
    title.style.display = "";
  }

  table.prepend(title);
}

function appendMatch(table, title, elem)
{
  let attachElem = false;
  if (elem?.nextSibling?.style?.display == "" && elem?.nextSibling?.className.includes("adtext-bg")) {
    attachElem = elem.nextSibling;
  }
  table.append(title);
  if (title.style.display == "none") {
    title.style.display = "";
  }
  table.append(elem);
  // hiep phu checking
  if (attachElem) {
    table.append(attachElem);
  }
}

export {
    prependStarMatch,
    appendMatch
  };