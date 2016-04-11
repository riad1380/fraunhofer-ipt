var w = 1000;
var h = 500;
var num = 20;
var radius = w / num / 6;
var ylevel = 30;
var color = 'darked'

var colorlist =[color,'blue'];


var functionlist =[d3.interpolateRgb, d3.interpolateHsl, d3.interpolateHcl];

var createsvg = function (w,h) {
	svg = d3.select("body")
		.append("svg")
		.attr("width", w)
		.attr("height", h);
}

var s = [];
for (var i=0; i<functionlist.length; i++){
	s.push(d3.scale.linear()
			.domain([0,num])
			.interpolate(functionlist[i])
			.range([colorlist[0],colorlist[1]])
		);
}

var expanddata = function (arrayoffunc, num, startingX, startingY,radius,ySep){
	var data = [];
	for (var i = 0;i<arrayoffunc.length; i++) {
		var ylevel = startingY + i *ySep;
			for(var j =0; j<num; j++){
			data.push([arrayoffunc[i](j),startingX + j*2*radius,ylevel])
			}
	}
	return data;
}

createsvg()
svg.selectAll('x')
	.data(expanddata(s, num, radius, ylevel, radius, 4 * radius))
	.enter()
	.append("circle")
	.attr("cx", function (d){
		return d[1]
	})
	.attr("cy",function (d){
		return d[2]
	})
	.attr("r",radius)
	.attr("opacity", 1)
	.attr("fill", function (d){
		return d [0]
	});

var overview = document.getElementById('overview');
overview.innerHTML = '<p>interpolation between ' + colorlist[0] + 'and' + colorlist[1] + 'using RGB, HSL, or HCL </p>'; 


