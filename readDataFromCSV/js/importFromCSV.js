// smooth zooming in d3.js , transform transition, contries
var zoom = d3.behavior.zoom().scaleExtent ([1, 10]).on ("zoom", zoomed);
var poly = d3.select("body").append("svg").attr("width",1000).attr("height",667).append("g").call(zoom);
var container = poly.append("g");

var xydata = function (d){
	return {
		id: d.id,
		x: d.x,
		y: d.y
	};
}


var scaleX = d3.scale.linear()
			.domain([0,0.028625])
			.range([0,800]);

var scaleY = d3.scale.linear()
			.domain([0,0.01449])
			.range([650,0]);

var wholeData = [];


var projectDatas =d3.csv("node.csv",xydata,function(data) {

	var newPoly =data.map(function(d){
		return [scaleX(d.x),scaleY(d.y)];
	});

	for (var i = 0; i< newPoly.length; i++){
		wholeData.push({
			id : data [i].id,
			x  : data [i].x,
			y  : data [i].y
		});
	}

	var links = [];
	var polygonDatas = [];
	d3.csv("element.csv",function(data){
	for(var i =0; i< data.length; i++){
		links [0] = wholeData[data [i].node1-1];
		links [1] = wholeData[data [i].node2-1];
		links [2] = wholeData[data [i].node3-1];
		links [3] = wholeData[data [i].node4-1];
		polygonDatas [i] = links.slice(); 
	}

	 container.selectAll("g")
			.data(polygonDatas)
			.enter()
			.append("polygon")
			.attr("points",function(d){
				return d.map(function(d){ 
					return [scaleX(d.x),scaleY(d.y)].join(",");
					})
				.join(" ");
				})
			.attr("stroke","blue")
			.attr("fill","red")
			.attr("stroke-width",2);
});
});

function zoomed () {
	container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}








	



