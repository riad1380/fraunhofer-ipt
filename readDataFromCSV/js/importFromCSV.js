var poly = d3.select("body").append("svg").attr("width",1000).attr("height",667);//.attr("id","yellowPolygon");
var tooltip = d3.select("body").append('div').attr("class", "tooltip").style("display","none");
var zoom = d3.behavior.zoom().scaleExtent ([1, 10]).on ("zoom", zoomed);
var container = poly.append("g").call(zoom);
var strokeWidthOfEachPolygonOriginal = .1;
var drawPOlygoncounter = 0;
var xCounter = 0;
var fillColor = "red";
var color;
var colorCalled = false;
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
var stressDataArray = [];

function drawPolygon(){
	drawPOlygoncounter = 3;
	var minStressData = 0;
	var maxStressData =0;
	var stressAvgValue = [];
	function colorRangeSelection(d){
		for(var i =0; i<d.length; i++){
			stressAvgValue [i] = d[i] [5];
		}
		
		stressAvgValue.sort(function (a,b) { return a-b});

 		var stressValueRange = (-22732.5- d3.min(stressAvgValue))/16;
 		var firstStressInterval = d3.min(stressAvgValue) + stressValueRange;
 		var secondStressInterval = firstStressInterval + stressValueRange;
 		var thirdStressInterval = secondStressInterval + stressValueRange;
 		var fourthStressInterval = thirdStressInterval + stressValueRange;
 		var fifthStressInterval = fourthStressInterval + stressValueRange;
 		var sixthStressInterval = fifthStressInterval + stressValueRange;
 		var seventhStressInterval = sixthStressInterval + stressValueRange;
 		var eighthStressInterval = seventhStressInterval + stressValueRange;
 		var ninthStressInterval = eighthStressInterval + stressValueRange;
 		var tenthStressInterval = ninthStressInterval + stressValueRange;
 		var eleventhStressInterval = tenthStressInterval + stressValueRange;
 		var twelfthStressInterval = eleventhStressInterval+ stressValueRange;
 		var thirteenthStressInterval = twelfthStressInterval + stressValueRange;
 		var fourteenthStressInterval = thirteenthStressInterval + stressValueRange;
 		var fifteenthStressInterval = fourteenthStressInterval  + stressValueRange;
 		var sixteenthStressInterval =  fifteenthStressInterval+ stressValueRange;

 		color = d3.scale.threshold()
 						.domain([firstStressInterval,secondStressInterval,thirdStressInterval,fourthStressInterval,fifthStressInterval,sixthStressInterval,seventhStressInterval,eighthStressInterval,ninthStressInterval,tenthStressInterval,eleventhStressInterval,twelfthStressInterval,thirteenthStressInterval,fourteenthStressInterval,fifteenthStressInterval])
 						.range(["#000000", "#808080", "#C0C0C0", "#FFFFFF", "#800000", "#FF0000", "#808000", "#FFFF00","#008000","#00FF00","#008080","#00FFFF","#000080","#0000FF","#800080","#FF00FF"]);
 		
 		if(colorCalled == false){
 			drawColorAxis(color);
 			colorCalled = true;
 		}
 		

	}
 	d3.csv("stress.csv",function(stressData){
 		for(var i =0; i<stressData.length; i++){
 			stressDataArray.push({
 				id : stressData [i].Id,
 				stressValue :stressData [i].stressValue
 			});
 			//minStressData = Math.min(stressData [i].stressValue,minStressData);
 			//maxStressData = Math.max(stressData [i].stressValue,maxStressData);
 		}

 		/*var stressValueRange = (maxStressData- minStressData)/16;
 		var firstStressInterval = 0 + stressValueRange;
 		var secondStressInterval = firstStressInterval + stressValueRange;
 		var thirdStressInterval = secondStressInterval + stressValueRange;
 		var fourthStressInterval = thirdStressInterval + stressValueRange;
 		var fifthStressInterval = fourthStressInterval + stressValueRange;
 		var sixthStressInterval = fifthStressInterval + stressValueRange;
 		var seventhStressInterval = fifthStressInterval + stressValueRange;
 		var eighthStressInterval = fifthStressInterval + stressValueRange;
 		var ninthStressInterval = fifthStressInterval + stressValueRange;
 		var tenthStressInterval = fifthStressInterval + stressValueRange;
 		var eleventhStressInterval = fifthStressInterval + stressValueRange;
 		var twelfthStressInterval = fifthStressInterval + stressValueRange;
 		var thirteenthStressInterval = fifthStressInterval + stressValueRange;
 		var fourteenthStressInterval = fifthStressInterval + stressValueRange;
 		var fifteenthStressInterval = fifthStressInterval + stressValueRange;
 		var sixteenthStressInterval = fifthStressInterval + stressValueRange;

 		var color = d3.scale.threshold()
 						.domain([firstStressInterval,secondStressInterval,thirdStressInterval,fourthStressInterval,fifthStressInterval,sixthStressInterval,seventhStressInterval,eighthStressInterval,ninthStressInterval,tenthStressInterval,eleventhStressInterval,twelfthStressInterval,thirteenthStressInterval,fourteenthStressInterval,fifteenthStressInterval,sixteenthStressInterval])
 						.range(["#000000", "#808080", "#C0C0C0", "#FFFFFF", "#800000", "#FF0000", "#808000", "#FFFF00","#008000","#00FF00","#008080","#00FFFF","#000080","#0000FF","#800080","#FF00FF"]);*/

   		d3.csv("node.csv",xydata,function(nodeData) {

		var newPoly = nodeData.map(function(d){// data is nodeData
			return [scaleX(d.x),scaleY(d.y)];
		});

		for (var i = 0; i< newPoly.length; i++){
			wholeData.push({
				id : nodeData [i].id,
				x  : nodeData [i].x,
				y  : nodeData [i].y,
				stressValue : parseFloat(stressDataArray [i].stressValue)
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
					links [4] = elementData [i].id; 
					links [5] = (wholeData[elementData [i].node1-1].stressValue + wholeData[elementData [i].node2-1].stressValue +  wholeData[elementData [i].node3-1].stressValue + wholeData[elementData [i].node4-1].stressValue)/4 ;
					polygonDatas [i] = links.slice(); 
				}

				colorRangeSelection(polygonDatas);

		    	var i = 0;
	 
				container.selectAll("g")
				.data(polygonDatas) // polygon data hole array of array of 4 objects, where each object has id, x and y
				.enter()
				.append("polygon")
				.attr("points",function(d){ // ekhane d hole each polygondatas [i]
					var polygonDraw = [];
					polygonDraw [0] = d[0];// ei array ta korsi element id show korar jonno
					polygonDraw [1] = d[1];
					polygonDraw [2] = d[2];
					polygonDraw [3] = d[3];
					return polygonDraw.map(function(d){ // ekhane d holo each polygon datas [i] [i]
						return [scaleX(d.x),scaleY(d.y)].join(",");
					})
				.join(" ");
				})
				.attr("stroke","black")
				.attr("fill",function (d) {
					return color(d[5])
				})
				.attr("stroke-width",strokeWidthOfEachPolygonOriginal)
				.on('mouseover',function (data){ 
					var tooltipText = '';
					//d.forEach(function (d){
						//tooltipText = tooltipText + 'node id: ' + d.id + " " + 'x co-ordinates: ' + d.x + " " + ' y co-ordinates : ' + d.y + "<br/>" ; 
						tooltipText = 'element number : ' + data [4] + "<br/>" + 'stressValue : ' + data [5];
						tooltip.transition()
							.duration(200)
							.style("display","inline");
						tooltip.html( tooltipText)
							.style("left",(d3.event.pageX) +"px")
							.style("top",(d3.event.pageY) + "px");
					//});
					d3.select(this).attr("fill","yellow");			        
				})
				.on('mouseout',function(d){
					d3.select(this).attr("fill",color(d[5]));
					div.style("display","none");	
				});

		    	var circles = container.selectAll("circles")
								.data (nodeData)
								.enter ()
								.append ("circle");

				var circleAttributes = 
					circles.attr("cx", function (d){ return scaleX(d.x)})
		       		.attr("cy",function (d){ return scaleY(d.y)})
		       		.attr("r",.8)
		       		.style("fill","green")
		       		.on('mouseover',function (d){
		       		tooltip.transition()
		       				.duration(200)
		       				.style("display","inline");
		       		tooltip.html('node number: ' + d.id + "<br/>"+ ' x co-ordinates : ' + d.x + "<br/>" +  ' y co-ordinates :' + d.y)
		       				.style("left",(d3.event.pageX) + "px")
		       				.style("top",(d3.event.pageY) + "px");
		       		})

	       	});
       });
    });
}

if(drawPOlygoncounter == 0){
	drawPolygon();
}

function zoomed () {
	container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

function drawColorAxis(color){
	var colorAxis = color.domain().slice();
	for(var i=0; i<colorAxis.length; i++){
		colorAxis [i] = colorAxis [i]/10000;
	}
	var axisScale = d3.scale.linear().domain([(d3.min(colorAxis)-2),d3.max(colorAxis)]).range([0,500]);
	var xAxis = d3.svg.axis().scale(axisScale).orient("bottom").tickSize(13).tickValues(colorAxis);
	var g= poly.append("g").attr("class","key").attr("transform","translate(40,40)");
	g.selectAll("rect")
		.data(color.range().map(function(d,i){
			return {
				x0 : i ? axisScale(colorAxis[i-1]) : axisScale.range()[0],
				x1 : i < colorAxis.length ? axisScale(colorAxis[i]) : axisScale.range()[1],
				z: d
			};
		}))
		.enter().append("rect")
		  .attr("height",8)
		  .attr("x",function(d){return d.x0; })
		  .attr("width",function(d){return d.x1 - d.x0; })
		  .style("fill",function(d) { return d.z; });
	var xAxisGroup = g.call(xAxis).append("text").attr("class","caption").attr("y",-6).text("Color Schema(Original stressValue divided By 10000):");
}









	



