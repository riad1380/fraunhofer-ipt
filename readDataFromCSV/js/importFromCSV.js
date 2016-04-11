var poly = d3.select("#polygon").append("svg").attr("width",1000).attr("height",667);
var xydata = function (d){
	return {
		x: d.x,
		y: d.y
	};
}


var scaleX = d3.scale.linear()
			.domain([0,0.028625])
			.range([0,600]);

var scaleY = d3.scale.linear()
			.domain([0,0.01449])
			.range([0,500]);

var wholeData = [];

var projectDatas =d3.csv("node.csv",xydata,function(data) {
	//console.log(data);
	wholeData = data;
	var newPoly = wholeData.map(function(d){
		return [scaleX(d.x),scaleY(d.y)];
	});
	console.log (wholeData);
	poly.selectAll("polygon")
			.data([newPoly])
			.enter()
			.append("polygon")
			.attr("points",function(d){
				return d.join(" ");})
			.attr("stroke","blue")
			.attr("fill","red")
			.attr("stroke-width",2)
});





