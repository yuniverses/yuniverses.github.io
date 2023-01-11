/******************
Code by Vamoss
Original code link:
https://www.openprocessing.org/sketch/697891

Author links:
http://vamoss.com.br
http://twitter.com/vamoss
http://github.com/vamoss
******************/

const textToWrite = "啊要  吃什麼";
const SEGMENTS = 200;

//auto start variables
let centerX, centerY, fontSize, INNER_RADIUS, RADIUS_VARIATION;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style("z-index", "-1");
  canvas.style("position", "absolute");
  canvas.style("transition", " all 0.5s ease;");
  centerX = windowWidth / 3;
  centerY = windowHeight / 2;

  document.querySelector("#randombtn").onclick = function () {
    canvas.style("display", "none");
  };
  document.querySelector(".material-symbols-outlined").onclick = function () {
    canvas.style("display", "none");
  };

  let screenPct = min(height, width) / 2000;
  fontSize = screenPct * 100;
  INNER_RADIUS = screenPct * 200;
  RADIUS_VARIATION = screenPct * 200;

  textFont("Mochiy Pop P One");
  textSize(fontSize);
}

//code adapted from @GoToLoop
//generates a circular noise with perfect looping
//https://forum.processing.org/one/topic/how-to-make-perlin-noise-loop.html
function pointForIndex(pct) {
  const NOISE_SCALE = 1;
  let angle = pct * TWO_PI + 180;
  let cosAngle = cos(angle);
  let sinAngle = sin(angle);
  let time = frameCount / 200;
  let noiseValue = noise(
    NOISE_SCALE * cosAngle + NOISE_SCALE,
    NOISE_SCALE * sinAngle + NOISE_SCALE,
    time
  );
  let radius = INNER_RADIUS + RADIUS_VARIATION * noiseValue;
  return {
    x: radius * cosAngle + centerX,
    y: radius * sinAngle + centerY,
  };
}

function draw() {
  background(0);
  fill(242, 120, 82);
  noStroke();

  //draw sphere
  beginShape();
  for (let i = 0; i < SEGMENTS; i++) {
    let p0 = pointForIndex(i / SEGMENTS);
    vertex(p0.x, p0.y);
  }
  endShape(CLOSE);

  //draw text
  let pct = atan2(mouseY - centerY, mouseX - centerX) / TWO_PI; //follow mouse
  // let pct = 0; //dont follow mouse
  let pixToAngularPct = 1 / ((INNER_RADIUS + RADIUS_VARIATION / 20) * TWO_PI);
  for (var i = 0; i < textToWrite.length; i++) {
    let charWidth = textWidth(textToWrite.charAt(i));
    pct += (charWidth / 3) * pixToAngularPct;

    //calculate angle
    let leftP = pointForIndex(pct - 0.01);
    let rightP = pointForIndex(pct + 0.01);
    let angle = atan2(leftP.y - rightP.y, leftP.x - rightP.x) + PI;

    push();
    let p = pointForIndex(pct);
    //apply angle
    translate(p.x, p.y);
    rotate(angle);
    translate(-p.x, -p.y);

    text(textToWrite.charAt(i), p.x - charWidth / 2, p.y);
    pop();

    pct += (charWidth / 1.7) * pixToAngularPct;
  } //for
}
