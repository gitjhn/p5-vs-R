// Graphic experiment using Raphael.js

// Globals
var ww = window.innerWidth;
var wh = window.innerHeight * 3;

// Creates canvas 
var r = Raphael(0, 0, ww, wh);

setup();

function loadFlags() {
    // Loads flag images
    for (var i = states.length - 1; i >= 0; i--) {
        flags[i] = new Image();
        flags[i].src = 'images/state_flags/' + states[i].imgname + '.png';
        flags[i].style.display = "none";
    }

    flags[0].onload = draw;
}

function setup(){
  loadFlags();
  // Draw red border
  r.rect(5, 5, ww - 10, wh - 10, 10).attr({ stroke: "#600" });

  // Draw blue legend box
  r.rect(ww / 2, wh / 2, ww / 2 - 10, wh / 2 - 10, 10).attr({ stroke: "#006", fill: "#004" });

  // Draw title
  r.text(ww * 0.7, 50, "US State Flags").attr({ fill: "#fff", "font-size": 36 });
}

function draw(){
    // Place flag images and names
    for (var i = 0, len = flags.length / 2; i < len; i++) {
        r.image(flags[i].src, (ww * 0.5 + 10), (wh * 0.5 + 10) + (30 * i), flags[i].width, flags[i].height);
        r.text((ww * 0.5 + 10) + 60, (wh * 0.5 + 10) + (30 * i) + 12, states[i].name).attr({
            fill: "#fff",
            "font-size": 20,
            "text-anchor": "start"
        });
        r.image(flags[i + len].src, (ww * 0.74 + 10), (wh * 0.5 + 10) + (30 * i), flags[i].width, flags[i].height);
        r.text((ww * 0.74 + 10) + 60, (wh * 0.5 + 10) + (30 * i) + 12, states[i + len].name).attr({
            fill: "#fff",
            "font-size": 20,
            "text-anchor": "start"
        });
    };

    // svg spline path
    var path = 'M 275.86207,94.603579 C 337.93104,123.05186 262.93103,149.776 262.93103,149.776 c 0,0 -43.96551,-4.31035 -45.68965,-47.4138 -1.711,-42.775132 64.65518,-57.758616 93.10345,-42.241374 28.44828,15.517241 35.34483,41.379314 16.37931,87.068974 -18.96552,45.68965 -35.20463,112.11064 -36.2069,124.13792 -1.72413,20.68966 -2.53741,53.07616 2.58621,81.89655 20.68966,116.37932 1.53099,69.28995 10.34483,108.6207 17.47012,77.95841 17.24138,42.24137 86.20689,93.10344';

    var p = r.path(path); 
    var plen = p.getTotalLength(); // pixel length of path
    var flen = plen / 49; // states - 1

    // place flags along path
    for (var i = 0; i < 50; i++) {
        var point = p.getPointAtLength(flen * i);
        r.image(flags[i].src, point.x, point.y, flags[i].width * 0.7, flags[i].height * 0.7).transform("r" + point.alpha + "r270");
    };

    var angle = 0,
        i = 0;

    // Create circular menu
    while (angle < 360) {
        var color = Raphael.getColor();
        (function(t, c) {
            r.text(282, 1420, states[i].name).attr({ 
                fill: "#fff",
                "font-size": 16,
                transform: t + "r90",
                "text-anchor": "start"
            }).mouseover(function() {
                this.animate({
                fill: c,
                "font-size": 28
                }, 200);
            }).mouseout(function() {
                this.animate({
                fill: "#fff",
                "font-size": 16
                }, 500);
            });

            r.circle(280, 1400, 10).attr({ 
                stroke: c,
                fill: c,
                transform: t,
                "fill-opacity": .4
            }).click(function() {
                //add click event here
            }).mouseover(function() {
                this.animate({
                    "fill-opacity": .95
                }, 200);
            }).mouseout(function() {
                this.animate({
                    "fill-opacity": .4
                }, 500);
            });
        })("r" + angle + " 280 1240", color);

        angle += 7.2; //     7.2 = 360/50 states
        if (i < 49) {
            ++i
        } else {
            i = 0
        };
    };
}
