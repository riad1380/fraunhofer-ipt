// smooth zooming in d3.js , transform transition, contries
 // new line 3 
//var separatezoneRecrangle = d3.select("body").append("div");
var poly = d3.select("body").append("svg").attr("width",1000).attr("height",667);
var tooltip = d3.select("body").append('div').attr("class", "tooltip").style("display","none");
var zoom = d3.behavior.zoom().scaleExtent ([1, 10]).on ("zoom", zoomed);
var container = poly.append("g").call(zoom);
// more or less adding html
//separatezoneRecrangle.style("height","40px").style("width","60px");
//separatezoneRecrangle.html('<p> dnddf </p>');
//separatezoneRecrangle.append("g");
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

	console.log(polygonDatas);
	console.log(polygonDatas [0] );
	console.log(polygonDatas [0] [0] .id);
	 container.selectAll("g")
			.data(polygonDatas) // polygon data hole array of 4 objects, where each object has id, x and y
			.enter()
			.append("polygon")
			.attr("points",function(d){ // ekhane d hole each polygondatas
				return d.map(function(d){ // ekhane d holo each polygon datas [i]
					return [scaleX(d.x),scaleY(d.y)].join(",");
					})
				.join(" ");
				})
			.attr("stroke","blue")
			.attr("fill","red")
			.attr("stroke-width",2)
			.on('mouseover',function (d){ 
				d.forEach(function (d){
					tooltip.transition()
							.duration(200)
							.style("display","inline");
					tooltip.text(d.x +',' + d.y )
							.style("left",(d3.event.pageX) +"px")
							.style("top",(d3.event.pageY) + "px");
				})
			})
			.on('mouseout',function(d){
				div.style("display","none");	
			})
			//.on('click',function(d){
			//	console.log();
			//})


});
});




function zoomed () {
	container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}







	



