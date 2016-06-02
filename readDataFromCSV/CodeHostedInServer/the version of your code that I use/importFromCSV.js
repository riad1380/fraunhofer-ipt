var drawAxisLocation = d3.select("#the-image").append("svg").attr("width",360).attr("height",80);
var theboard = d3.select("#the-image").append('div').attr("width",360).attr("height",180).style("font-size","8px");
var poly = d3.select("#the-image").append("svg").attr("width",480).attr("height",360).attr("id","polygon");
var tooltip = d3.select("#the-image").append('div').attr("class", "tooltip").style("display","none");
var zoom = d3.behavior.zoom().scaleExtent ([1, 10]).on ("zoom", zoomed);
var container = poly.append("g").call(zoom);
var strokeWidthOfEachPolygonOriginal = .3;
var drawPOlygoncounter = 0;
var xCounter = 0;
var fillColor = "red";
var color;
var colorCalled = false;
var noOfsecondInput = 0;
var minNodeXValue = 999999999999999;
var maxNodeXValue = -999999999999999;
var minNodeYValue = 999999999999999;
var maxNodeYValue = -999999999999999;
var differenceXValues = 0;
var differenceYValues = 0;
var scaleXFactor = 0;
var scaleYFactor = 0;
var scaleX;
var scaleY;
var newPoly;
var reload = false;
var stressDataArray = [];
var nodeXValue = [];
var nodeYValue = [];
var nodeStressValue = [];
var nodeTemperatureValue = [];
var stressAvgValue = [];
var tempAvgValue = [];
var allValues = [];
var allNodeValues = [];
var stressAvgValueCalled = false;
var links = [];
var nodeFileName;
var elementFileName;
var checkedParameterValues = 0;
var individualCounter = 1;

var xydata = function (d){
	return {
		id: d.id,
		x: d.x,
		y: d.y
	};
}
function isNumberKey(evt){
	var charCode = (evt.which) ? evt.which : event.keyCode
	if (charCode > 31 && (charCode <48 || charCode>57))
		return false;
	return true;
}
function submit(){
	console.log('insideSubmit');
	var preRequisite = true;
	noOfsecondInput = parseInt(document.getElementById("noOfsecond").value);
	console.log('noOfsecondInput ' + noOfsecondInput);
	if(noOfsecondInput >842){
		preRequisite = false;
		alert('please give the value between 0 and 842');
	}
	var checkedValue = [];
	var checkedValueInCheckBox = [];
	var inputElements = document.getElementsByName('parts');
	//var radioInputElements = $("input[name=Features]:checked").val();
	var radioInputElements = '';
	var radios = document.getElementsByName('Features');
	for (var i =0; i<radios.length ; i++){
		if(radios [i].checked){
			radioInputElements = radios[i].value;
			break;
		}
	}
	for(var i=0,j=0; i<inputElements.length; i++){
		if(inputElements[i].checked){
			checkedValueInCheckBox [j++] = inputElements[i].value;
		}		
	}
	if(checkedValueInCheckBox.length == 0){
		preRequisite = false;
		alert('please give the selectionParts');
	}
	if(preRequisite){
		OutputForTheGivenInput(checkedValueInCheckBox,radioInputElements);
	}
	
}

/*function strokewidthChange(){
	var e = document.getElementById("blackColorWidthId");
	strokeWidthOfEachPolygon = e.options[e.selectedIndex].value;
	if(strokeWidthOfEachPolygon != strokeWidthOfEachPolygonOriginal){
		strokeWidthOfEachPolygonOriginal = strokeWidthOfEachPolygon;
		drawPolygon();
	}
}*/

function OutputForTheGivenInput(checkedValueInCheckBox,radioInputElements){
	checkedParameterValues = checkedValueInCheckBox.length;
	individualCounter =1;
	console.log('OutputForTheGivenInput function');
	if(checkedValueInCheckBox.indexOf("Glass") != -1){
		nodeFileName = "DATACSV/"+noOfsecondInput+"/"+noOfsecondInput+"_glassPart.csv";
 		elementFileName = "DATACSV/Element/_elementGlass_part.csv";
 		drawPolygon(nodeFileName,elementFileName,radioInputElements);
 	
 	}
 	if(checkedValueInCheckBox.indexOf("Lower Cooling Plate") != -1){
 		nodeFileName = "DATACSV/"+noOfsecondInput+"/"+noOfsecondInput+"_lower_coolplate_part_1.csv";
 		elementFileName = "DATACSV/Element/_elementlower_CoolPlate_part.csv";
 		drawPolygon(nodeFileName,elementFileName,radioInputElements);
 	}
 	if(checkedValueInCheckBox.indexOf("Lower Mold Die") != -1){
 		nodeFileName = "DATACSV/"+noOfsecondInput+"/"+noOfsecondInput+"_lower_mold_part_1_region_1.csv";
 		elementFileName = "DATACSV/Element/_elementlower_Mold_part.csv";
 		drawPolygon(nodeFileName,elementFileName,radioInputElements);
 	}
 	
 	if(checkedValueInCheckBox.indexOf("Lower Mold Insert") != -1){
 		nodeFileName = "DATACSV/"+noOfsecondInput+"/"+noOfsecondInput+"_lower_mold_part_1_region_2.csv";
 		elementFileName = "DATACSV/Element/_elementlower_Mold_part.csv";
 		drawPolygon(nodeFileName,elementFileName,radioInputElements);
 	}
 	
 	if(checkedValueInCheckBox.indexOf("Upper Cooling Plate") != -1){
 		nodeFileName = "DATACSV/"+noOfsecondInput+"/"+noOfsecondInput+"_upper_coolplate_part_copy_1.csv";
 		elementFileName = "DATACSV/Element/_elementupper_CoolPlate_part_Copy.csv";
 		drawPolygon(nodeFileName,elementFileName,radioInputElements);
 	}

 	if(checkedValueInCheckBox.indexOf("Upper Mold Insert") != -1){
 		nodeFileName = "DATACSV/"+noOfsecondInput+"/"+noOfsecondInput+"_upper_mold_part_1_region_1.csv";
 		elementFileName = "DATACSV/Element/_elementupper_Mold_part.csv";
 		drawPolygon(nodeFileName,elementFileName,radioInputElements);
 	}
 	if(checkedValueInCheckBox.indexOf("Upper Mold Die") != -1){
 		nodeFileName = "DATACSV/"+noOfsecondInput+"/"+noOfsecondInput+"_upper_mold_part_1_region_2.csv";
 		elementFileName = "DATACSV/Element/_elementupper_Mold_part.csv";
 		drawPolygon(nodeFileName,elementFileName,radioInputElements);
 	}
}

function colorRangeSelection(d,radioInputElements){
	var colorCalled = false; 
	console.log('colorRangeSelection inside');
	console.log(d);
	for(var i =0 ; i< d.length ; i++){
		d[i].forEach(function (d){
			if(radioInputElements == 'Stress'){
				stressAvgValue.push (d[5]);
			}
			else if(radioInputElements == 'Temperature'){
				tempAvgValue.push (d[6]);
			}
		})
	}

	
	var valueRange = 0;
	var minValue = 0;
	var maxValue = 0;
	if(radioInputElements == 'Stress'){
		stressAvgValue.sort(function (a,b) { return a-b});
 		valueRange = (d3.max(stressAvgValue)- d3.min(stressAvgValue))/16;
 		minValue = (d3.min(stressAvgValue));
		maxValue = d3.max(stressAvgValue)+0.01;
 		console.log('minStressValue ' + minValue);
		console.log('maxStressValue ' + maxValue);
 	} 		

	else if(radioInputElements == 'Temperature'){
		tempAvgValue.sort(function (a,b) { return a-b});
		valueRange = (d3.max(tempAvgValue)- d3.min(tempAvgValue))/16;
		minValue = (d3.min(tempAvgValue));
		maxValue = d3.max(tempAvgValue)+0.01;
 		console.log('minTempValue ' + minValue);
		console.log('maxTempValue ' + maxValue);
 	}
		console.log('valueRange' + valueRange);
		console.log(typeof valueRange);
		console.log(typeof minValue);
 		var firstInterval = minValue + valueRange;
		console.log('first Interval ' + firstInterval);
 		var secondInterval = firstInterval + valueRange;
 		var thirdInterval = secondInterval + valueRange;
 		var fourthInterval = thirdInterval + valueRange;
 		var fifthInterval = fourthInterval + valueRange;
 		var sixthInterval = fifthInterval + valueRange;
 		var seventhInterval = sixthInterval + valueRange;
 		var eighthInterval = seventhInterval + valueRange;
 		var ninthInterval = eighthInterval + valueRange;
 		var tenthInterval = ninthInterval + valueRange;
 		var eleventhInterval = tenthInterval + valueRange;
 		var twelfthInterval = eleventhInterval+ valueRange;
 		var thirteenthInterval = twelfthInterval + valueRange;
 		var fourteenthInterval = thirteenthInterval + valueRange;
		var fifteenthInterval =  fourteenthInterval+ valueRange;
		
 		color = d3.scale.threshold()
 					.domain([minValue,firstInterval,secondInterval,thirdInterval,fourthInterval,fifthInterval,sixthInterval,seventhInterval,eighthInterval,ninthInterval,tenthInterval,eleventhInterval,twelfthInterval,thirteenthInterval,fourteenthInterval,fifteenthInterval,maxValue])
 					.range(["#FFFFFF", "#3311bb", "#4444dd", "#11aabb", "#12bdb9", "#22ccaa", "#69d025", "#aacc22", "#d0c310","#ccbb33","#feae2d","#ff9933","#ff6644","#ff4422","#ff3311","#f80c12","#ee1100"]);
 		
 		//drawColorAxis(color);
 		
 		if(individualCounter == checkedParameterValues){
 			drawColorAxis(color,radioInputElements);
 			//colorCalled = true;
 		}
 		//individualCounter++;
}

function drawPolygon(nodeFileName,elementFileName,radioInputElements){
	
	if(reload){
		console.log('inside of reloading!!!');
		container.selectAll(".polygong").remove();
		drawAxisLocation.selectAll(".key").remove();
	}
	
	console.log('Inside of drawPolygon');
	console.log(nodeFileName);
	d3.csv(nodeFileName,function(nodeData){
		console.log('Node Data ' +  nodeData.length);
 		for(var i =0 ; i<nodeData.length ; i++){
   		nodeXValue[i]          = parseFloat(nodeData [i].xCoordinates);
   		nodeYValue[i]          = parseFloat(nodeData [i].yCoordinates);
   		nodeStressValue[i]     = parseFloat(nodeData [i].Stress);
   		nodeTemperatureValue[i]= parseFloat(nodeData [i].Temperature);
   	}
   	minNodeXValue = Math.min(minNodeXValue,d3.min(nodeXValue));
   	console.log('minNodeXValue ' + minNodeXValue );
   	maxNodeXValue = Math.max(maxNodeXValue,d3.max(nodeXValue));
   	console.log('maxNodeXValue ' + maxNodeXValue );
   	minNodeYValue = Math.min(minNodeYValue,d3.min(nodeYValue));
   	console.log('minNodeYValue ' + minNodeYValue );
   	maxNodeYValue = Math.max(maxNodeYValue,d3.max(nodeYValue));
   	console.log('maxNodeYValue ' + maxNodeYValue );
   	differenceXValues = maxNodeXValue - minNodeXValue;
   	differenceYValues = maxNodeYValue - minNodeYValue;
   	scaleXFactor = 480/differenceXValues;
   	scaleYFactor = 360/differenceYValues;
   	if(scaleXFactor > scaleYFactor){
   		scaleX = d3.scale.linear()
			.domain([minNodeXValue,maxNodeXValue])
			.range([0,(scaleYFactor*differenceXValues)]);

		scaleY = d3.scale.linear()
			.domain([minNodeYValue,maxNodeYValue])
			.range([360,0]);
   	}

   	else {
   		scaleX = d3.scale.linear()
			.domain([minNodeXValue,maxNodeXValue])
			.range([0,480]);

		scaleY = d3.scale.linear()
			.domain([minNodeYValue,maxNodeYValue])
			.range([(scaleXFactor*differenceYValues),0]);
   	}


   

	newPoly = nodeData.map(function(d){// data is nodeData
			return [scaleX(d.xCoordinates),scaleY(d.yCoordinates)];
	});
	var wholeData = [];
	var nodeIdArray =[];
	for (var i = 0; i< newPoly.length; i++)
		{
			wholeData.push({
				id : nodeData [i].NodeLabel,
				x  : nodeData [i].xCoordinates,
				y  : nodeData [i].yCoordinates,
				stressValue : nodeData [i].Stress,
				temp : nodeData [i].Temperature
			});
		}

	console.log('wholeData array');
	console.log(wholeData);
	d3.csv(elementFileName,function(elementData){
		var polygonDatas = [];
		console.log('inside of elementData');
		for(var i =0 ;i <wholeData.length ;i++){
			nodeIdArray [i] = parseInt(wholeData[i].id);
		}
		console.log(nodeIdArray);

 		for(var i =0,j=0; i<elementData.length; i++)
 		{
 			var node1Pos =nodeIdArray.indexOf(parseInt(elementData[i].Node1));
 			var node2Pos =nodeIdArray.indexOf(parseInt(elementData[i].Node2));
 			var node3Pos =nodeIdArray.indexOf(parseInt(elementData[i].Node3));
 			var node4Pos =nodeIdArray.indexOf(parseInt(elementData[i].Node4));
	 		if((node1Pos != -1) && ( node2Pos!= -1) && (node3Pos != -1) && (node4Pos != -1)){
 				links [0] = wholeData[node1Pos];
 				links [1] = wholeData[node2Pos];
 				links [2] = wholeData[node3Pos];
 				links [3] = wholeData[node4Pos];
 				links [4] = elementData [i].ElementId; 
 				links [5] = (parseFloat(wholeData[node1Pos].stressValue) + parseFloat(wholeData[node2Pos].stressValue) + parseFloat(wholeData[node3Pos].stressValue) + parseFloat(wholeData[node4Pos].stressValue))/4;
 				links [6] = (parseFloat(wholeData[node1Pos].temp) + parseFloat(wholeData[node2Pos].temp) + parseFloat(wholeData[node3Pos].temp) + parseFloat(wholeData[node4Pos].temp))/4;
 				
 				polygonDatas [j++] = links.slice(); 
 			}
		}
		console.log('relevant polygonDatas');
		console.log(polygonDatas);
		if(individualCounter == 1){
			stressAvgValue = [];
			tempAvgValue = [];
			allValues = [];
			allNodeValues = [];
		}
		allValues.push(polygonDatas);
		allNodeValues.push(nodeData);
		console.log('all Node Values!!!!!');
		console.log(allNodeValues);
		if(individualCounter == checkedParameterValues){
 			colorRangeSelection(allValues,radioInputElements);
 			drawPortions(allValues);
			drawNodePortions(allNodeValues);
 			//colorCalled = true;
 		}
 		individualCounter++;
		//console.log(reload);
		//colorRangeSelection(polygonDatas,radioInputElements);
		var i = 0;

		//console.log('inside drawPortions!!!');
		function drawPortions(d){
			console.log('inside drawPortions!!!');
			console.log(d);
			for(var i=0; i<d.length; i++){
				container.selectAll("g")
						.data(d[i]) // polygon data hole array of array of 4 objects, where each object has id, x and y
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
						//.attr("fill","red")
						.attr("fill",function (d) {
							if(radioInputElements == 'Stress')
								return color(d[5])
							else if(radioInputElements == 'Temperature')
								return color(d[6])
						})
						.attr("class","polygong")
						.attr("stroke-width",strokeWidthOfEachPolygonOriginal)
						.on('mouseover',function (data){ 
							var tooltipText = '';
							if(radioInputElements == 'Stress')
								tooltipText = 'Element Number: ' + data [4] + " | " + 'Stress: ' + (data [5]/1000000).toFixed(1) + ' MPa';
							else if(radioInputElements == 'Temperature')
								tooltipText = 'Element Number: ' + data [4] + " | " + 'Temprature: ' + (data [6]).toFixed(1) + ' °C';
							
							tooltip.transition()
									.duration(200)
									.style("display","inline");
							theboard.html("<p>"+tooltipText+"</p>");
//									.style("left",((d3.event.pageX)+12) +"px")
//									.style("top",((d3.event.pageY)+12) + "px");
							//d3.select(this).attr("fill","yellow");
							d3.select(this).attr("fill","red");	
							d3.select(this).attr("stroke","blue");		
							d3.select(this).attr("stroke-width",.1);        
						})
						.on('mouseout',function(d){
							//d3.select(this).attr("fill","red");
							if(radioInputElements == 'Stress')
								d3.select(this).attr("fill",color(d[5]));
							else if(radioInputElements == 'Temperature')
								d3.select(this).attr("fill",color(d[6]));
							d3.select(this).attr("stroke","black");
							d3.select(this).attr("stroke-width",strokeWidthOfEachPolygonOriginal);
							div.style("display","none");	
						});
						
			}
		}
		
		function drawNodePortions(d){
			for(var i = 0; i<d.length ;i++){
				var circles = container.selectAll("circles")
									.data (d[i])
									.enter ()
									.append ("circle");

				var circleAttributes = 
								circles.attr("cx", function (d){ return scaleX(d.xCoordinates)})
									.attr("cy",function (d){ return scaleY(d.yCoordinates)})
									.attr("r",.5)
									.attr("class","polygong")
									.style("fill","black")
									.on('mouseover',function (d){
									tooltip.transition()
										.duration(200)
										.style("display","inline");
									theboard.html('<p>Node Number: ' + d.NodeLabel + " | "+ ' X: ' + parseFloat(d.xCoordinates*1000).toFixed(4) + ' mm' + " | " +  ' Y: ' + parseFloat(d.yCoordinates*1000).toFixed(4) + ' mm</p>');
										//.style("left",(d3.event.pageX) + "px")
										//.style("top",(d3.event.pageY) + "px");
								})
								reload=true;
			}
		}
		
 	})	
	});
}


function zoomed () {
	container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

function drawColorAxis(color,radioInputElements){
	console.log('color---------');
	var colorAxis = color.domain().slice();
	var colorShowAxis = [];
	if(radioInputElements ==  'Stress') {
		for(var i=0; i<colorAxis.length; i++){
			colorAxis [i] = colorAxis [i]/1000000;
		}
		
		for(var i=0,j=0; i<colorAxis.length; i++){
			if(i%2 == 0){
				colorShowAxis [j++] = colorAxis [i];
			}	
		}	
	}
	if(radioInputElements == 'Temperature'){
		for(var i=0,j=0; i<colorAxis.length; i++){
			if(i%2 == 0){
				colorShowAxis [j++] = colorAxis [i];
			}	
		}	
	}
	console.log('colorAxis' +colorAxis);
	var axisScale = d3.scale.linear().domain([d3.min(colorAxis),d3.max(colorAxis)]).range([0,300]);
	var xAxis = d3.svg.axis().scale(axisScale).orient("bottom").tickSize(13).tickValues(colorShowAxis).tickFormat(function(d){
		return (d3.format (".1f") (d))
		});
	var g= drawAxisLocation.append("g").attr("class","key").attr("transform","translate(40,40)");
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
		  .attr("x",function(d){
		  	return d.x0; 
		  })
		  .attr("width",function(d){
		  	//console.log(d);
		  	return d.x1 - d.x0; 
		  })
		  .style("fill",function(d) { return d.z; });

	if(radioInputElements == 'Stress')
		var xAxisGroup = g.call(xAxis).append("text").attr("class","caption").attr("y",-6).text("STRESS [MPa]");
	else if(radioInputElements == 'Temperature')
		var xAxisGroup = g.call(xAxis).append("text").attr("class","caption").attr("y",-6).text("TEMP [°C]");

}









	



