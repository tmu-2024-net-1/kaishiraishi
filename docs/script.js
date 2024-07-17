var x = 0;
var y = 0;
var stepSize = 5.0;

var font = 'Zen Old Mincho';


var letters = "透明人間";
var fontSizeMin = 15;
var angleDistortion = 0.0;

var counter = 0;

function setup() {
  // use full screen size
  createCanvas(displayWidth, displayHeight);
  background(255);
  cursor(CROSS);

  x = mouseX;
  y = mouseY;

  textFont(font);
  textAlign(LEFT);
  fill(255);
  

}

function draw() {

  
  if (mouseIsPressed && mouseButton == LEFT) {
    var d = dist(x, y, mouseX, mouseY);
    // 平方根を用いてフォントサイズの変化を滑らかに
    var adjustedSize = sqrt(d) * 2; // ここでの係数2は、変化の程度を調整します
    textSize(fontSizeMin + adjustedSize);
    var newLetter = letters.charAt(counter);
    stepSize = textWidth(newLetter);

    if (d > stepSize) {
      var angle = atan2(mouseY - y, mouseX - x);
      push();
      translate(x, y);
      fill(0);
      text(newLetter, 0, 0);
      pop();

      counter++;
      if (counter >= letters.length) counter = 0;

      x = x + cos(angle) * stepSize;
      y = y + sin(angle) * stepSize;
    }
  }
}

function mousePressed() {
  x = mouseX;
  y = mouseY;
}
