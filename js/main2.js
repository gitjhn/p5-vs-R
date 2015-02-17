// main2 javascritpt file
// your code goes here

var states, flags = [], img;
var ww = window.innerWidth;
var wh = window.innerHeight*3;

// Creates canvas 
var r = Raphael(0, 0, ww, wh);

loadJSON('data/states.json', function(response) {
  // Parse JSON string into object
  var actual_JSON = JSON.parse(response);
  states = actual_JSON.States;
	console.log('Number of states: '+states.length);
	console.log('1st state name= '+states[0].name);

	for (var i = states.length - 1; i >= 0; i--) {
		flags[i] = document.createElement("img");
		flags[i].src = 'images/state_flags/'+states[i].imgname+'.png';
		flags[i].style.display = "none";
		document.body.appendChild(flags[i]);
		//r.image(flags[i].src, (ww/2+10)+(0), (wh/2+10)+(30*i), flags[i].width, flags[i].height);
	};

  for (var i = 0, len = flags.length/2; i < len; i++) {
  	r.image(flags[i].src, (ww*0.5+10), (wh*0.5+10)+(30*i), flags[i].width, flags[i].height);
  	r.text( (ww*0.5+10)+60, (wh*0.5+10)+(30*i)+12, states[i].name).attr({fill: "#fff", "font-size": 20, "text-anchor": "start"});
  	r.image(flags[i+len].src, (ww*0.74+10), (wh*0.5+10)+(30*i), flags[i].width, flags[i].height);
  	r.text( (ww*0.74+10)+60, (wh*0.5+10)+(30*i)+12, states[i+len].name).attr({fill: "#fff", "font-size": 20, "text-anchor": "start"});
  };


var path = 'M 275.86207,94.603579 C 337.93104,123.05186 262.93103,149.776 262.93103,149.776 c 0,0 -43.96551,-4.31035 -45.68965,-47.4138 -1.711,-42.775132 64.65518,-57.758616 93.10345,-42.241374 28.44828,15.517241 35.34483,41.379314 16.37931,87.068974 -18.96552,45.68965 -35.20463,112.11064 -36.2069,124.13792 -1.72413,20.68966 -2.53741,53.07616 2.58621,81.89655 20.68966,116.37932 1.53099,69.28995 10.34483,108.6207 17.47012,77.95841 17.24138,42.24137 86.20689,93.10344';

var p = r.path(path);	//.transform("s4");
//p.attr({transform: "s1.5"});
//r.path(path).attr({stroke: "#0ff", transform: "s1.5"});
var plen = p.getTotalLength();
		//.getTotalLength(path)
var flen = plen / 49;	// states - 1
//var pflags = flags.slice();

	for (var i = 0; i < 50; i++) {
		var point = p.getPointAtLength( flen*i);
		//console.log('i = '+i);
		r.image(flags[i].src, point.x, point.y, flags[i].width*0.7, flags[i].height*0.7).transform("r"+point.alpha+"r270");
        //r.text(point.x, point.y, states[i].capital).attr({fill: "#fff", "font-size": 12, transform: "r"+point.alpha+"r270", "text-anchor": "start"});
  	//r.image(flags[i].src, i, i, flags[i].width, flags[i].height);   {transform: "r" + angle}
		//r.rect(point.x, point.y, 10, 10, 5).attr({stroke: "#600", fill: "#090"});
	};

                var angle = 0, i = 0;
                       // r.text(300, 1450, states[i].name).attr({fill: "#fff", "font-size": 20});
                while (angle < 360) {
                    var color = Raphael.getColor();
                    (function (t, c) {
                        r.text(282, 1448, states[i].name).attr({fill: "#fff", "font-size": 16, transform: t+"r90", "text-anchor": "start"});
                        r.circle(280, 1450, 10).attr({stroke: c, fill: c, transform: t, "fill-opacity": .4}).click(function () {
                            //s.animate({transform: t, stroke: c}, 2000, "bounce");
                        }).mouseover(function () {
                            this.animate({"fill-opacity": .95}, 200);
                        }).mouseout(function () {
                            this.animate({"fill-opacity": .4}, 500);
                        });
                    })("r" + angle + " 280 1240", color);
                    angle += 7.2; //     7.2 = 360/50 states
                    if ( i < 49 ) {++i} else{i=0};
                };



});


r.rect(5, 5, ww-10, wh-10, 10).attr({stroke: "#600"});
r.rect(ww/2, wh/2, ww/2-10, wh/2-10, 10).attr({stroke: "#006", fill: "#004"});
r.text(ww*0.7, 50, "US State Flags").attr({fill: "#fff", "font-size": 32});

/*
                var angle = 0, i = 0;
                        r.text(300, 1450, states[i].name).attr({fill: "#fff", "font-size": 20});
                while (angle < 360) {
                    var color = Raphael.getColor();
                    (function (t, c) {
                        //r.text(300, 1450, states[i].name).attr({fill: "#fff", "font-size": 20});
                        r.circle(300, 1450, 10).attr({stroke: c, fill: c, transform: t, "fill-opacity": .4}).click(function () {
                            //s.animate({transform: t, stroke: c}, 2000, "bounce");
                        }).mouseover(function () {
                            this.animate({"fill-opacity": .95}, 200);
                        }).mouseout(function () {
                            this.animate({"fill-opacity": .4}, 500);
                        });
                    })("r" + angle + " 300 1240", color);
                    angle += 7.2; //     7.2 = 360/50 states
                    if ( i < 49 ) {++i} else{i=0};
                };

*/

/*
var path = 'M 275.86207,94.603579 C 337.93104,123.05186 262.93103,149.776 262.93103,149.776 c 0,0 -43.96551,-4.31035 -45.68965,-47.4138 -1.711,-42.775132 64.65518,-57.758616 93.10345,-42.241374 28.44828,15.517241 35.34483,41.379314 16.37931,87.068974 -18.96552,45.68965 -35.20463,112.11064 -36.2069,124.13792 -1.72413,20.68966 -2.53741,53.07616 2.58621,81.89655 20.68966,116.37932 1.53099,69.28995 10.34483,108.6207 17.47012,77.95841 17.24138,42.24137 86.20689,93.10344';

var p = r.path(path);
r.path(path).attr({stroke: "#0ff"});
var plen = p.getTotalLength();
		//.getTotalLength(path)
var flen = plen / 49;	// states - 1
//var pflags = flags.slice();

	for (var i = 0; i < 50; i++) {
		var point = p.getPointAtLength( flen*i);
		console.log('i = '+i);
		//r.image(flags[i].src, point.x, point.y, flags[i].width, flags[i].height);
  	r.image(flags[i].src, i, i, flags[i].width, flags[i].height);
		//r.rect(point.x, point.y, 10, 10, 5).attr({stroke: "#600", fill: "#090"});
	};
*/

/*
// Creates circle at x = 50, y = 40, with radius 10
var circle = r.circle(50, 40, 10);
// Sets the fill attribute of the circle to red (#f00)
circle.attr("fill", "#f00");

// Sets the stroke attribute of the circle to white
circle.attr("stroke", "#00f");

*/