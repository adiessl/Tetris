/**
 * TODOs:
 * – cleanup of variables ...
 * – cleanup of methods ...
 * – change colors?
 * – save progress to local storage
 * – load progress from local storage
 * – display timer
 */

const basePixelSize = 20;
const borderSize = basePixelSize * 1.5;
const columns = 18;
const rows = 20;
const sideMenuWidth = 5 * basePixelSize;
const nextTileHeight = 6 * basePixelSize;
const gameAreaWidth = columns * basePixelSize + 1;
const gameAreaHeight = rows * basePixelSize + 1;
const canvasWidth = borderSize + gameAreaWidth + borderSize + sideMenuWidth + borderSize;
const canvasHeight = borderSize + gameAreaHeight + borderSize;
const hintAreaHeight = gameAreaHeight - nextTileHeight - borderSize;
let tile;
let nextTile;
const nextTileOffsetX = gameAreaWidth + 2 * borderSize + sideMenuWidth / 2 - basePixelSize / 2;
const nextTileOffsetY = borderSize + 4 * basePixelSize;
let stack;
let speed;
let level;
let score;
let levelScore;
const levelThreshold = 2500;
let highscore = 0;
let paused = false;
let gameOver = false;
let shapeGenerator;
const textLineHeight = basePixelSize;
const textPadding = basePixelSize / 2;
const textLeftAlign = canvasWidth - borderSize - sideMenuWidth + textPadding;
const textRightAlign = canvasWidth - borderSize - textPadding;
const textTopStart = borderSize + 2 * textPadding;
const textBottomStart = 2 * borderSize + nextTileHeight + 2 * textPadding;
const verticalBorderLength = canvasHeight - 2 * borderSize;
const textSizeSmall = Math.floor(basePixelSize * 0.6)
const textSizeBig = Math.floor(basePixelSize * 0.8)

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  background(0);
  frameRate(30);
  shapeGenerator = new ShapeGenerator();
  nextTile = GetNewTile();
  Restart();
}

function draw() {
  background(0);
  DrawTexts();
  if (!focused) {
    TogglePause();
  }

  stack.draw(basePixelSize, borderSize, borderSize);
  tile.draw(basePixelSize, borderSize, borderSize);
  nextTile.draw(basePixelSize, nextTileOffsetX, nextTileOffsetY);

  if (frameCount % speed === 0) {
    tile.moveDown(stack);
  }

  keyEvents();
  DrawBorders();
  if (paused) {
    DrawMessage("Game paused!", "Continue by pressing 'P'.");
  }
}

function levelUp() {
  level += 1;
  speed = floor(12 / level) + 1
}

function keyEvents() {
  if (frameCount % 2 === 0) {
    if (keyIsDown(RIGHT_ARROW)) {
      tile.moveRight(stack);
    } else if (keyIsDown(LEFT_ARROW)) {
      tile.moveLeft(stack);
    }
  }

  if (keyIsDown(DOWN_ARROW)) {
    tile.moveDown(stack);
  }
}

function keyPressed() {
  if (keyCode === 80) {
    TogglePause();
  } else if (keyCode === 82) {
    loop();
    Restart();
  } else if (keyCode === 17) {
    tile.rotateCounterClockwise();
  } else if (keyCode === 32) {
    tile.rotateClockwise();
  }
}

function TogglePause() {
  if (focused && paused && !gameOver) {
    loop();
  } else {
    noLoop();
  }
  paused = !paused;
}

function NextTile() {
  tile = nextTile;
  tile.setCoordinates(floor(columns / 2), 0)
  nextTile = GetNewTile();
}

function GetNewTile() {
  return new Tile(0, 0, shapeGenerator.getShape());
}

function Restart() {
  gameOver = false;
  paused = false;
  score = 0;
  levelScore = 0;
  level = 0;
  levelUp();
  stack = new Stack(columns, rows);
  NextTile();
}

function AddToScore(removedRowCount) {
  const plus = level * removedRowCount * (removedRowCount + 1) * 50;
  score += plus;
  levelScore += plus;
  if (score > highscore) {
    highscore = score;
  }
  if (levelScore - levelThreshold > 0) {
    levelUp();
    levelScore -= levelThreshold;
  }
}

function GameOver() {
  DrawMessage("Game over!", "Restart by pressing 'R'.");
  noLoop();
  gameOver = true;
}

function DrawMessage(message, hint) {
  textSize(textSizeBig);
  textAlign(CENTER, CENTER);
  const w = Math.max(textWidth(message), textWidth(hint)) + borderSize;

  fill('rgba(100,100,100, 0.8)');
  noStroke();
  rect((canvasWidth - w) / 2, canvasHeight / 2 - 2 * textLineHeight, w, 4 * textLineHeight);

  fill(255);
  text(message, canvasWidth / 2, canvasHeight / 2 - textLineHeight);
  text(hint, canvasWidth / 2, canvasHeight / 2 + textLineHeight);
}

function DrawTexts() {
  fill(255);
  textSize(textSizeSmall);
  textLeading(textLineHeight);

  const texts = [
    {
      left: 'Level:',
      right: level
    }, {
      left: 'Score:\n',
      right: '\n' + score
    }, {
      left: 'Highscore:\n',
      right: '\n' + highscore
    }, {
      left: '\nMove:\n',
      right: '\n\nArrow keys'
    }, {
      left: 'Rotate:\n',
      right: '\nCtrl/Space'
    }, {
      left: 'Pause:',
      right: 'P'
    }, {
      left: 'Restart:',
      right: 'R'
    }
  ];

  let leftText = '';
  let rightText = '';

  texts.forEach(function (element) {
    leftText += element.left + '\n';
    rightText += element.right + '\n';
  }, this);

  textAlign(LEFT, BASELINE);
  text('Next:', textLeftAlign, textTopStart);
  text(leftText, textLeftAlign, textBottomStart);
  textAlign(RIGHT, BASELINE);
  text(rightText, textRightAlign, textBottomStart);
}

function DrawBorders() {
  fill(100);
  noStroke();
  rect(0, 0, canvasWidth, borderSize);
  rect(0, canvasHeight - borderSize, canvasWidth, borderSize);
  rect(0, borderSize, borderSize, verticalBorderLength);
  rect(borderSize + gameAreaWidth, borderSize, borderSize, verticalBorderLength);
  rect(canvasWidth - borderSize, borderSize, borderSize, verticalBorderLength);
  rect(2 * borderSize + gameAreaWidth, borderSize + nextTileHeight, sideMenuWidth, borderSize);
}
