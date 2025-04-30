class Pendulum {
  constructor(cx, cy, angle1, angle2, length1, length2) {
    this.cx = cx;
    this.cy = cy;
    this.angle1 = angle1;
    this.angle2 = angle2;
    this.angleV1 = 0;
    this.angleV2 = 0;
    this.angleA1 = 0;
    this.angleA2 = 0;
    this.m1 = 0.1;
    this.m2 = 0.1;
    this.length1 = length1;
    this.length2 = length2;
  }

  update() {
    this.angleA1 = (-g * (2 * this.m1 + this.m2) * sin(this.angle1) +
                    -this.m2 * g * sin(this.angle1 - 2 * this.angle2) +
                    (-2 * sin(this.angle1 - this.angle2) * this.m2) *
                    (this.angleV2 * this.angleV2 * this.length2 +
                     this.angleV1 * this.angleV1 * this.length1 * cos(this.angle1 - this.angle2))) /
                   (this.length1 * (2 * this.m1 + this.m2 - this.m2 * cos(2 * this.angle1 - 2 * this.angle2)));
    
    this.angleA2 = (2 * sin(this.angle1 - this.angle2) *
                   (this.angleV1 * this.angleV1 * this.length1 * (this.m1 + this.m2) +
                    g * (this.m1 + this.m2) * cos(this.angle1) +
                    this.angleV2 * this.angleV2 * this.length2 * this.m2 * cos(this.angle1 - this.angle2))) /
                   (this.length2 * (2 * this.m1 + this.m2 - this.m2 * cos(2 * this.angle1 - 2 * this.angle2)));

    this.angleV1 += this.angleA1 * dt;
    this.angleV2 += this.angleA2 * dt;
    this.angleV1 = constrain(this.angleV1, -maxVelocity, maxVelocity);
    this.angleV2 = constrain(this.angleV2, -maxVelocity, maxVelocity);
    this.angle1 += this.angleV1 * dt;
    this.angle2 += this.angleV2 * dt;
  }

  displayArrow() {
    fill(0);
    stroke(0);
    let x = this.cx + this.length1 * cos(this.angle1);
    let y = this.cy + this.length2 * sin(this.angle2);
    line(this.cx, this.cy, x, y);
    ellipse(x, y, 10, 10); // Adjusted size for visibility
  }

  displayColor() {
    noStroke();
    let c1 = color('#171722');
    let c2 = color('#20407f');
    let c3 = color('#f7971d');

    // Interpolating colors based on angle1 and angle2
    let interColor1 = lerpColor(c1, c3, map(sin(this.angle1), -1, 1, 0, 1));
    let interColor2 = lerpColor(c2, c1, map(sin(this.angle2), -1, 1, 0, 1));

    // Filling with a blend of the interpolated colors
    fill(lerpColor(interColor1, interColor2, 0.5));
    rectMode(CENTER);
    rect(this.cx, this.cy, size, size);
  }
}