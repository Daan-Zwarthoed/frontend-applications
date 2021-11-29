let nextCell;

function clearPattern() {
  document.querySelectorAll(".patternLine").forEach((element) => {
    element.classList.remove("patternLine");
  });
}

function returnNextCell(path) {
  switch (path) {
    case "right":
      if (nextCell.nextSibling) return nextCell.nextSibling;
      break;
    case "left":
      if (nextCell.previousSibling) return nextCell.previousSibling;
      break;
    case "up":
      if (nextCell.parentElement.previousSibling)
        return nextCell.parentElement.previousSibling.children[
          nextCell.className.split(" ")[0]
        ];
      break;
    case "down":
      if (nextCell.parentElement.nextSibling)
        return nextCell.parentElement.nextSibling.children[
          nextCell.className.split(" ")[0]
        ];
      break;
    case "upRight":
      if (nextCell.parentElement.previousSibling)
        return nextCell.parentElement.previousSibling.children[
          +nextCell.className.split(" ")[0] + 1
        ];
      break;
    case "upLeft":
      if (nextCell.parentElement.previousSibling)
        return nextCell.parentElement.previousSibling.children[
          nextCell.className.split(" ")[0] - 1
        ];
      break;
    case "downRight":
      if (nextCell.parentElement.nextSibling)
        return nextCell.parentElement.nextSibling.children[
          +nextCell.className.split(" ")[0] + 1
        ];
      break;
    case "downLeft":
      if (nextCell.parentElement.nextSibling)
        return nextCell.parentElement.nextSibling.children[
          nextCell.className.split(" ")[0] - 1
        ];
      break;
    default:
      return;
  }
}

function returnNextCellActivator(step) {
  const returntedNextCell = returnNextCell(step.path);
  if (returntedNextCell) {
    return returntedNextCell;
  } else if (step.elsePath) {
    return returnNextCell(step.elsePath);
  }
}

function nextCellActivator(patternStartOrPath, doRepeat) {
  let patternDone = false;
  for (let iPatternRepeat = 0; iPatternRepeat < 1000; iPatternRepeat++) {
    if (!doRepeat) iPatternRepeat = 1001;
    // eslint-disable-next-line no-loop-func
    patternStartOrPath.forEach((step) => {
      if (!patternDone) {
        for (let i = 0; i < step.amount; i++) {
          const returntedNextCell = returnNextCellActivator(step);
          if (returntedNextCell) {
            nextCell = returntedNextCell;
            if (!step.display) nextCell.classList.add("patternLine");
          } else if (step.display) {
            patternDone = true;
            iPatternRepeat = 10001;
          } else {
            step.amount = 10001;
          }
        }
      }
    });
  }
}

export default function drawPattern(chosenPattern, patternJSON) {
  clearPattern();
  nextCell = document.querySelector(".Grid").children[0].children[0];
  patternJSON.forEach((pattern) => {
    if (pattern.pattern === chosenPattern) {
      nextCellActivator(pattern.start, false);
      nextCellActivator(pattern.path, true);
    }
  });
}
