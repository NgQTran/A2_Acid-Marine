let maxVelocity = 5;
let g = 1;
let dt = 0.1;
let pendulums = []; let cols, rows; let size = 3;

function setup() {
  createCanvas(1920, 1080, SVG);
  let button = select("#myButton");
  button.mousePressed((x) => save("background.svg"));
  noLoop();
  
  cols = width/size;
  rows = height/size;
  
  for (let i=0; i<cols; i++) {
    pendulums[i] = []
    for (let j=0; j<rows; j++) {
    let cx = size/2 + i*size;
    let cy = size/2 + j*size;
    let angle1 = map(i, 0, cols, -PI, PI);
    let angle2 = map(j, 0, rows, -PI, PI);
    pendulums[i][j] = new Pendulum(cx, cy, angle1, angle2, size, size);
    }
  }
}

function draw() {
  background(220);
  
  for (let i=0; i<cols; i++) {
    for (let j=0; j<rows; j++) {
      pendulums[i][j].update();
      pendulums[i][j].displayColor();
      //pendulums[i][j].displayArrow();
      
  }
}
  

  
  //angleA1 = (-g * (2 * m1 +m2) * sin(angle1) + -m2 * g * sin(angle1 - 2 * angle2) + (-2 * sin(angle1 - angle2) * m2) * (angleV2 * angleV2 * cos(angle1 - angle2))) / (length1 * (2 * m1 + m2 - m2 * sin(2 * angle1 - 2 * angle2))
  
  //angleA2 = (2 * sin(angle1 - angle2)) * (angleV1 * angleV1 * length1 * (m1 + m2) + g * (m1 + m2) * cos(angle1) + angleV2 * angleV2 * length2 * m2 * cos(angle1 - angle2)) * (length2 * (2 * m1 + m2 - m2 * cos(2 * angle1 - 2 * angle2)));
  
}