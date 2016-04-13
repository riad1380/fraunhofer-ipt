// smooth zooming in d3.js , transform transition, contries

var poly = d3.select("#polygon").append("canvas").attr("width",1000).attr("height",667);
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
	console.log(data);
	/*wholeData = data;
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
			.attr("stroke-width",2)*/


	var newPoly =data.map(function(d){
		return [scaleX(d.x),scaleY(d.y)];
	});
	/*
	circle draw korar somoi eita korsilam point korar jonno
	*/
	/*for (var i = 0; i<newPoly.length; i++){
		wholeData.push({
			id: data [i].id,
			x: newPoly[i] [0],
			y: newPoly[i] [1]
		});
	}*/

	for (var i = 0; i< newPoly.length; i++){
		wholeData.push({
			id : data [i].id,
			x  : data [i].x,
			y  : data [i].y
		});
	}

	console.log(newPoly);
	console.log("--------------------------");
	console.log(wholeData);
	/*poly.selectAll("polygon")
		.data(wholeData)
		.enter()
		.append("svg:circle")
		.attr("cx",function(d) {return d.x; })
		.attr("cy",function(d) {return d.y; })
		.attr("r",1)
		.attr("fill","black");*/


	var links = [];
	var polygonDatas = [];
	d3.csv("element.csv",function(data){
	for(var i =0; i< data.length; i++){
		links [0] = wholeData[data [i].node1-1];
		links [1] = wholeData[data [i].node2-1];
		links [2] = wholeData[data [i].node3-1];
		links [3] = wholeData[data [i].node4-1];
		console.log(links);
		polygonDatas [i] = links.slice(); 
	}

	console.log("polygon datas ---------");
	console.log(polygonDatas);
	poly.selectAll("polygon")
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
	
	
	/*poly.selectAll(".line")
	.data(links)
	.enter()
	.append("line")
	.attr("x1",function(d){return d.source.x})
	.attr("y1",function(d){return d.source.y})
	.attr("x2",function(d){return d.target.x})
	.attr("y2",function(d){return d.target.y})
	.style("stroke", "rgb(6,120,155)");*/
});
})





	



