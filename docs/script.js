var x = 0;
var y = 0;
var stepSize = 5.0;

var font = 'Georgia';
var letters = "透明人間　影のような男 怪物！そうだ、怪物にちがいない。怪物でなくて、なんだろう？　科学が発達した、いまの世の中に、東洋の忍術使いじゃあるまいし、姿がみえない人間がいるなんて、これは、たしかに変だ。奇怪だ！　しかし、それは、ほんとうの話だった。怪物ははじめに、ものさびしい田舎にあらわれた。それからまもなく、あちこちの町にも出没するようになったのである。たいへんな騒ぎになったことは、いうまでもない。　その怪物の姿は、まるっきり見えないのである。すきとおっていて、ガラス、いや空気のように透明なのだ。諸君は、そんなことがあるもんか――と、いうだろう。だが、待ちたまえ！　怪物が、はじめて田舎のその村にやってきたのは、たしか二月もおわりに近い、ある寒い朝のことだった。身をきるような風がふいて、朝から粉雪がちらちら舞っていた。こんな寒い日は、土地のものだって外を出あるいたりはしない。　その男は、丘をこえて、ブランブルハースト駅から歩いてきたとみえ、あつい手袋をはめた手に、黒いちいさな皮かばんをさげていた。からだじゅうを、オーバーとえりまきでしっかり包んで、ぼうしのつばをぐっとまぶかにおろし、空気にふれているところといったら、寒さで赤くなっている鼻さきだけであった。なんともいいようのない、ぞっとするようなふんいきを、あたりにただよわせながら、黒馬旅館のドアをおしひらいてはいってきたのである。「こう寒くちゃあやりきれない。火だ！　さっそくへやに、火をおこしてもらいたいな」　酒場へ、ずかずかとはいってくるなり、ぶるるんと、からだをゆさぶって雪をはらいおとし、黒馬旅館の女あるじに向かって、そう言った。　いまどき、めずらしい客である。こんな冬の季節に、しかもこんなへんぴな土地に、旅の商人だってめったにきたことはないのだ。おかみさんは、びっくりもし、なげだされた二枚の金貨をみると、すっかりよろこんでしまった。「とうぶん、とめてもらうから」 客をへやに案内すると、暖炉に火をもやしてたきぎをくべ、台所でお手伝いにてつだわせて、おかみさんはせっせと食事のしたくをした。　スープ皿、コップなどを客室にはこんで、食卓のよういをととのえた。暖炉の火はさかんにもえて、ぱちぱちと音をたてている。　ところが、火にあたっている客はこちらに背をむけたまま、ぼうしもオーバーもぬごうとはしないで、つっ立っている。中庭にふりつもる雪をみつめながら、なにか考えているようだった。オーバーの雪がとけて、しずくが床のじゅうたんの上にしたたり落ちていた。「もし、あのう、おぼうしとオーバーを、おぬぎになりましたら？　台所でかわかしてまいりますわ」";
var fontSizeMin = 15;
var angleDistortion = 0.0;

var counter = 0;

function setup() {
  createCanvas(displayWidth, displayHeight);
  background(255);
  cursor(CROSS);
  x = mouseX;
  y = mouseY;
  textFont(font);
  textAlign(LEFT);
}

function draw() {
  fill(240);
  rect(0, 0, width, height);
  fill(0, 6);
  
  if (mouseIsPressed && mouseButton == LEFT) {
    var d = dist(x, y, mouseX, mouseY);
    textSize(fontSizeMin + d / 2);
    var newLetter = letters.charAt(counter);
    stepSize = textWidth(newLetter);

    if (d > stepSize) {
      var angle = atan2(mouseY - y, mouseX - x);

      // 色をランダムに選択
      var r = random(255);
      var g = random(255);
      var b = random(255);
      fill(r, g, b);

      push();
      translate(x, y);
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
