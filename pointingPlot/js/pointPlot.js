/*
	the following adds the nodes in the graph and draw the circle upto line 17
*/
var nodes =[{id:1, x:30, y:50},
			{id:2, x:50, y:80},
			{id:3, x:90, y:120}]
var vis = d3.select("#graph").append("svg").attr("width",200).attr("height",200);

//console.log(vis[0]);
//console.log(vis[0][0]);
vis.selectAll("circle.nodes1")
	.data(nodes)
	.enter()
	.append("svg:circle")
	.attr("class","nodes")
	.attr("cx",function(d){return d.x; })
	.attr("cy",function(d){return d.y; })
	.attr("r","10px")
	.attr("fill","black")

/*
	the following adds the nodes in the graph and draw the polygon
*/

var poly = d3.select("#polygon").append("svg").attr("width",1000).attr("height",667);
var scaleX = d3.scale.linear()
			.domain([-30,30])
			.range([0,600]);
var scaleY = d3.scale.linear()
			.domain([0,50])
			.range([500,0]);

var points =  [{"x":0.0, "y": 25.0},
				{"x": 8.5, "y": 23.4},
				{"x": 13.0, "y": 21.0},
				{"x": 19.0, "y": 15.5},
				{"x": 23.0, "y":89.8},
				{"x": 45.0, "y":90.0}];

console.log(points);

var newPoly = points.map(function(d) {
	return [scaleX(d.x),scaleY(d.y)]; 
});

console.log(newPoly);
/*
the following comment out code is required for drawing lines.
*/
/*var lineFunction = d3.svg.line().x(function(d) {return d.x})
								.y(function(d) {return d.y})
								.interpolate("linear");*/
poly.selectAll("polygon")
		.data([newPoly])
		.enter()
		.append("polygon")
		.attr("points",function(d){
			return d.join(" ");})
		.attr("stroke","blue")
		.attr("fill","red")
		.attr("stroke-width",2);


/*
	here i am adding straight line with the nodes
*/

var links = [
{source: nodes [0], target: nodes [1]},
{source: nodes [2], target: nodes [1]}
]

vis.selectAll(".line")
	.data(links)
	.enter()
	.append("line")
	.attr("x1",function(d){return d.source.x})
	.attr("y1",function(d){return d.source.y})
	.attr("x2",function(d){return d.target.x})
	.attr("y2",function(d){return d.target.y})
	.style("stroke", "rgb(6,120,155)");

