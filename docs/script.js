var x = 0;
var y = 0;
var stepSize = 5.0;

var font = 'Zen Old Mincho';

var letters1 = "私は、夜を讃美し、夜を怖れる。...";
var letters2 = "別のテキスト...";
var letters3 = "さらに別のテキスト...";
var letters4 = "もう一つ別のテキスト...";
var letters = letters1;

var titles = ["タイトル1", "タイトル2", "タイトル3", "タイトル4"];
var authors = ["著者1", "著者2", "著者3", "著者4"];
var currentTitle = titles[0];
var currentAuthor = authors[0];

var fontSizeMin = 15;
var angleDistortion = 0.0;

var counter = 0;
var fadingTexts = []; // テキストとその透明度を保持する配列
var titleFadingText = null; // タイトル用の透明度情報を保持するオブジェクト
var authorFadingText = null; // 著者名用の透明度情報を保持するオブジェクト

var titleX;
var titleY;
var authorX;
var authorY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  cursor(CROSS);

  x = mouseX;
  y = mouseY;

  textFont(font);
  textAlign(CENTER); // 中央揃えに設定

  titleX = width / 2; // タイトルのx座標を画面の中央に
  titleY = height / 2 - 40; // タイトルのy座標を画面の中央より少し上に
  authorX = width / 2; // 著者名のx座標を画面の中央に
  authorY = height / 2; // 著者名のy座標を画面の中央に

  fill(0);
}

function draw() {
  background(255); // 透明度のパラメータを取り除く

  // 残りの文字数インジケーターの描画
  var remaining = letters.length - counter;
  var progress = remaining / letters.length; // 残りの文字数の割合を計算
  fill(0);
  noStroke();
  rect(0, 0, width * progress, 10); // 残りの文字数に応じてインジケーターの幅を調整

  // タイトルの描画と透明度の更新
  if (titleFadingText) {
    fill(0, 0, 0, titleFadingText.alpha);
    textSize(32); // タイトルのフォントサイズ
    text(titleFadingText.letter, titleX, titleY); // タイトルの座標を指定
    titleFadingText.alpha -= 2; // 透明度を2ずつ減らす
    if (titleFadingText.alpha <= 0) {
      titleFadingText = null; // 透明度が0になったらオブジェクトを破棄
    }
  }

  // 著者名の描画と透明度の更新
  if (authorFadingText) {
    fill(0, 0, 0, authorFadingText.alpha);
    textSize(24); // 著者名のフォントサイズ
    text(authorFadingText.letter, authorX, authorY); // 著者名の座標を指定
    authorFadingText.alpha -= 2; // 透明度を2ずつ減らす
    if (authorFadingText.alpha <= 0) {
      authorFadingText = null; // 透明度が0になったらオブジェクトを破棄
    }
  }

  // 保存されたテキストの描画と透明度の更新
  fadingTexts.forEach(ft => {
    fill(0, 0, 0, ft.alpha);
    textSize(ft.size);
    text(ft.letter, ft.x, ft.y);
    ft.alpha -= 2; // 透明度を2ずつ減らす
  });

  // 透明度が0になったテキストを配列から削除
  fadingTexts = fadingTexts.filter(ft => ft.alpha > 0);

  if (mouseIsPressed && mouseButton == LEFT) {
    var d = dist(x, y, mouseX, mouseY);
    var adjustedSize = sqrt(d) * 2;
    var fontSize = fontSizeMin + adjustedSize;
    var newLetter = letters.charAt(counter);
    stepSize = textWidth(newLetter);

    if (d > stepSize) {
      var angle = atan2(mouseY - y, mouseX - x);

      push();
      translate(x, y);
      fill(0);
      text(newLetter, 0, 0);
      pop();

      // 新しいテキスト情報を保存
      fadingTexts.push({
        letter: newLetter,
        x: x,
        y: y,
        size: fontSize,
        alpha: 255 // 初期透明度は255
      });

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

function keyPressed() {
  if (key === '1') {
    letters = letters1;
    currentTitle = titles[0];
    currentAuthor = authors[0];
  } else if (key === '2') {
    letters = letters2;
    currentTitle = titles[1];
    currentAuthor = authors[1];
  } else if (key === '3') {
    letters = letters3;
    currentTitle = titles[2];
    currentAuthor = authors[2];
  } else if (key === '4') {
    letters = letters4;
    currentTitle = titles[3];
    currentAuthor = authors[3];
  }
  counter = 0;
  titleFadingText = {
    letter: currentTitle,
    alpha: 255 // タイトルの初期透明度
  };
  authorFadingText = {
    letter: currentAuthor,
    alpha: 255 // 著者名の初期透明度
  };
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  // キャンバスがリサイズされた時に中央揃えの座標を再計算
  titleX = width / 2;
  titleY = height / 2 - 40;
  authorX = width / 2;
  authorY = height / 2;
}
