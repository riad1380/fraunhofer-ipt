var poly = d3.select("body").append("svg").attr("width",1000).attr("height",667);//.attr("id","yellowPolygon");
var tooltip = d3.select("body").append('div').attr("class", "tooltip").style("display","none");
var zoom = d3.behavior.zoom().scaleExtent ([1, 10]).on ("zoom", zoomed);
var container = poly.append("g").call(zoom);
var strokeWidthOfEachPolygonOriginal = .1;
var drawPOlygoncounter = 0;
var xCounter = 0;

var xydata = function (d){
	return {
		id: d.id,
		x: d.x,
		y: d.y
	};
}
function strokewidthChange(){
	var e = document.getElementById("blackColorWidthId");
	strokeWidthOfEachPolygon = e.options[e.selectedIndex].value;
	if(strokeWidthOfEachPolygon != strokeWidthOfEachPolygonOriginal){
		strokeWidthOfEachPolygonOriginal = strokeWidthOfEachPolygon;
		drawPolygon();
	}
}
var scaleX = d3.scale.linear()
			.domain([0,0.028625])
			.range([0,800]);

var separateScaleX = d3.scale.pow()
						.domain([0,0.028625])
						.range([0,40]);

var scaleY = d3.scale.linear()
			.domain([0,0.01449])
			.range([650,0]);

var separateScaleY = d3.scale.pow()
						.domain([0,0.01449])
						.range([40,0]);

var wholeData = [];


function drawPolygon(){
	drawPOlygoncounter = 3;
	console.log("-------");
	console.log(strokeWidthOfEachPolygonOriginal);
var projectDatas =d3.csv("node.csv",xydata,function(nodeData) {

	var newPoly =nodeData.map(function(d){// data is nodeData
		return [scaleX(d.x),scaleY(d.y)];
	});

	for (var i = 0; i< newPoly.length; i++){
		wholeData.push({
			id : nodeData [i].id,
			x  : nodeData [i].x,
			y  : nodeData [i].y
		});
	}

	var links = [];
	var polygonDatas = [];
	d3.csv("element.csv",function(elementData){
		for(var i =0; i< elementData.length; i++){
			links [0] = wholeData[elementData [i].node1-1];//elementData
			links [1] = wholeData[elementData [i].node2-1];//elementData
			links [2] = wholeData[elementData [i].node3-1];//elementData
			links [3] = wholeData[elementData [i].node4-1];//elementData
			polygonDatas [i] = links.slice(); 
		}

		var i = 0;
	

			container.selectAll("g")
			.data(polygonDatas) // polygon data hole array of array of 4 objects, where each object has id, x and y
			.enter()
			.append("polygon")
			.attr("points",function(d){ // ekhane d hole each polygondatas [i]
				return d.map(function(d){ // ekhane d holo each polygon datas [i] [i]
					return [scaleX(d.x),scaleY(d.y)].join(",");
					})
				.join(" ");
				})
			.attr("stroke","black")
			.attr("fill","red")
			.attr("stroke-width",strokeWidthOfEachPolygonOriginal)
			.on('mouseover',function (d){ 
				d.forEach(function (d){
					tooltip.transition()
							.duration(200)
							.style("display","inline");
					tooltip.html( 'node number : ' + d.id + "<br/>"+ ' x co-ordinates : ' + d.x + "<br/>" +  ' y co-ordinates :' + d.y)
							.style("left",(d3.event.pageX) +"px")
							.style("top",(d3.event.pageY) + "px");
				});
				
				d3.select(this).attr("fill","yellow");			        
			})
			.on('mouseout',function(d){
				d3.select(this).attr("fill","red");
				div.style("display","none");	
			});

		var circles = poly.selectAll("circles")
								.data (nodeData)
								.enter ()
								.append ("circle");

		var circleAttributes = 
		circles.attr("cx", function (d){ return scaleX(d.x)})
		.attr("cy",function (d){ return scaleY(d.y)})
		.attr("r",2)
		.style("fill","green");

	});
});
}

if(drawPOlygoncounter == 0){
	console.log("counter" + drawPOlygoncounter);
	drawPolygon();
}

function zoomed () {
	container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}







	



