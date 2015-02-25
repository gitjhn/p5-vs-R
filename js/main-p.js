// Graphic experiment using p5.js

// Globals
var states, flags = [];

// loadJSON callback
function statesCallback(response) {
    states = response.States;

    // load flag images
    for (var i = states.length - 1; i >= 0; i--) {
        flags[i] = loadImage("images/state_flags/" + states[i].imgname + ".png");
    };
}

function setup() {
    var url = 'data/states.json';
    loadJSON(url, statesCallback);

    // Create the canvas
    createCanvas(windowWidth, 3000);
    background(0);
    noFill();

    // Set colors
    fill(20, 20, 220, 60);
    stroke(20, 20, 220);

    rect(width * 0.6, height * 0.6, width * 0.38, height * 0.38);

    textSize(60);
    stroke(250);
    fill(250);
    text('US State Flags', width / 2, 100);

}

function draw() {

    noFill();
    stroke(255);
    bezier(350, 350, -400, 400, 800, -800, width / 2, height * 0.7);
    stroke(255, 102, 0);
    steps = 49; // 16
    for (var i = 0; i <= steps; i++) {
        t = i / steps;
        x = bezierPoint(350, -400, 800, width / 2, t);
        y = bezierPoint(350, 400, -800, height * 0.7, t);
        tx = bezierTangent(350, -400, 800, width / 2, t);
        ty = bezierTangent(350, 400, -800, height * 0.7, t);
        a = atan2(ty, tx);
        a -= HALF_PI;
        image(flags[i], x, y);
    }

    textSize(20);
    stroke(250);
    fill(250);
    for (var i = 0, len = flags.length / 2; i < len; i++) {
        image(flags[i], (width * 0.62), (height * 0.62) + (40 * i), flags[i].width, flags[i].height);
        text(states[i].name, (width * 0.62) + 50, (height * 0.62) + (40 * i) + 20);
        image(flags[i + len], (width * 0.62) + (width * 0.38 / 2), (height * 0.62) + (40 * i), flags[i].width, flags[i].height);
        text(states[i + len].name, (width * 0.62) + (width * 0.38 / 2) + 50, (height * 0.62) + (40 * i) + 20);
    };
}