//read in file
function drawDataNetwork(agency, selectHub){
//read in nodes
d3.csv("data/"+agency+"/"+agency+"_data_NODES.csv", function(nodes){
	 
//create label
for (i=0; i < nodes.length; i++){
	if (nodes[i].host !== "NA"){
		nodes[i].title = nodes[i].node + "<br><strong>Agency Hosting Data: </strong>" + nodes[i].host +
							 "<br><strong>Website: </strong><a href="+nodes[i].website+"target=_blank>" + nodes[i].website +"</a>";
	// filter by selectHub
	if (nodes[i].id === selectHub){ nodes[i].group = "SelectedHub"; }
	
	}
	if (nodes[i].host === "NA"){
		nodes[i].title = "<strong>Group: </strong>" + nodes[i].node + "<br><strong>Budget: </strong>" + nodes[i].dataBudget;
	}
}

//console.log(nodes);

d3.csv("data/"+agency+"/"+agency+"_data_EDGES2.csv", function(edges){
//find edges based on selected node
for (i = 0; i < edges.length; i++){
	edges[i].color = "lightblue";
	if (selectHub.charAt(0)=="p") { // select edges coming FROM a data hub
		if(edges[i].from === selectHub) {edges[i].color = "black"; console.log("true")}
	}
}
console.log(edges);




 // legend
var mynetwork = document.getElementById('networkPlot');
var x = - mynetwork.clientWidth / 2 - 400;
var y = - mynetwork.clientHeight / 2 + 50;
var step = 80;
nodes.push({id: 1000, x: x, y: y, label: 'Data Access Point', group: 'hub', value: 1, fixed: true, physics:false});
nodes.push({id: 1001, x: x, y: y + step, label: 'Data: Infrastructure', group: 'Infrastructure', value: 1, fixed: true, physics:false});
nodes.push({id: 1002, x: x, y: y + 2 * step, label: 'Data: Water Quality', group: 'Quality', value: 1, fixed: true, physics:false});
nodes.push({id: 1003, x: x, y: y + 3 * step, label: 'Data: Water Quantity', group: 'Quantity', value: 1, fixed: true, physics:false});
nodes.push({id: 1004, x: x, y: y + 4 * step, label: 'Data: Water Use', group: 'Use', value: 1, fixed: true, physics:false});


// set as vis.dataset
dataNodes = new vis.DataSet(nodes);
dataEdges = new vis.DataSet(edges);


// create a network
var container = document.getElementById('networkPlot');
//provide data in vis format
var dataNetwork = {
	nodes: dataNodes,
	edges: dataEdges
};

var optionsNetwork = {
	edges: {
		color: {
			//color: "lightgray",
			inherit: true
		},
		width: 2,
		smooth: false,
	},

	nodes: {
		//size: 20,
		//borderWidth: 1,
		shadow: false,
		font: {
			size: 20,
			align: 'left'
		}
	},

	groups: {
		hub: {
			color: {
				background: 'lightgray', 
				border: 'lightgray'
			},
			shape: 'square',
			size: 12,
		},
		Quantity: {
			color: {
				background: '#A1C6D5', 
				border: 'black'
			},
			shape: 'triangle',
			size: 15,
		},
		Quality: {
			color: {
				background: '#9D52A0', 
				border: 'black'
			},
			shape: 'triangle',
			size: 15,
		},
		Use: {
			color: {
				background: '#02AFA9', 
				border: 'black'
			},
			shape: 'triangle',
			size: 15,
			},
		Infrastructure: {
			color: {
				background: '#F53F45', 
				border: 'black'
			},
			shape: 'star',
			size: 15,
			},
		SelectedHub: {
			color: {
				background: 'black', 
				border: 'black'
			},
			shape: 'square',
			size: 20,
			}
	},

	layout: {
		randomSeed: 2    //draws network same
	},

		
	interaction: {
		dragNodes : false,
		navigationButtons : true,
		hover: true
	},
    physics: {
    	enabled: true,
        //barnesHut:{gravitationalConstant:-5000},
        //stabilization: {iterations:2500}
    },
    
};

//initialize network
var network = new vis.Network(container, dataNetwork, optionsNetwork);


/*
// Highlight when a data access point is selected
var allNodes = dataNodes.get({returnType: "Object"});
var selectedNode = selectHub;
	console.log(selectedNode);
var updateArray = [];
var nodeId;

//check to see if currently loaded;
var check = allNodes[selectedNode];
//console.log(check);

// highlight selected nodes
if (selectedNode !== "none" & check !== undefined) {
var i;
var connectedNodes = network.getConnectedNodes(selectedNode);
var connectedEdges = network.getConnectedEdges(selectedNode);
//console.log(connectedNodes);  console.log(connectedEdges);

 for (i = 0; i < connectedNodes.length; i++) {
        allNodes[connectedNodes[i]].color = "goldenrod";
        allNodes[connectedNodes[i]].shadow = true;
        allNodes[connectedNodes[i]].borderWidth = 2;
        allNodes[connectedNodes[i]].size = 25;
        updateArray.push(allNodes[nodeId]);
      }// end for statement
    console.log(allNodes[selectedNode]);  
	allNodes[selectedNode].group = "Selected";

dataNodes.update(updateArray);
console.log(dataNodes);
//console.log(allNodes);
} // end if something selected

if (selectedNode === "none"){
	for (nodeId in allNodes) {
		if (allNodes.hasOwnProperty(nodeId)) {
		allNodes[nodeId].color = "#A4C6C0";	
    	allNodes[nodeId].shadow = true;
    	allNodes[nodeId].borderWidth = 2;
    	allNodes[nodeId].size = 35;

    	updateArray.push(allNodes[nodeId]);
    	}
	}
///orgNodes.update(updateArray);
} // end if something no selected
orgNodes.update(updateArray);



*/


 //end Edges
}); // end nodes
}); //end edges
} // end function
//drawDataNetwork(agency);
/*
var orgNodes; 
var orgEdges;
//filter by data type
if (selectData === "all"){
	orgNodes = nodes;
	orgEdges = edges;
}

if (selectData==="operational"){ 
	orgNodes = nodes.filter(function(d){ return d.operational !== "No"; });

	//for (i=0; i < orgNodes.length; i++)
	orgEdges = edges.filter(function(element) {
		var res = $.grep(orgNodes, function(el) {
			return element.to === el.id & element.from === el.id;
		});
		if(res.length == 0) return element;
	});
}


if (selectData==="decision"){ 
	orgNodes = nodes.filter(function(d){ return d.decision !== "No"; });

	//for (i=0; i < orgNodes.length; i++)
	orgEdges = edges.filter(function(element) {
		var res = $.grep(orgNodes, function(el) {
			return element.to === el.id & element.from === el.id;
		});
		if(res.length == 0) return element;
	});
}

if (selectData==="regulatory"){ 
	orgNodes = nodes.filter(function(d){ return d.regulatory !== "No"; });

	//for (i=0; i < orgNodes.length; i++)
	orgEdges = edges.filter(function(element) {
		var res = $.grep(orgNodes, function(el) {
			return element.to === el.id & element.from === el.id;
		});
		if(res.length == 0) return element;
	});
}

if (selectData==="research"){ 
	orgNodes = nodes.filter(function(d){ return d.research !== "No"; });

	//for (i=0; i < orgNodes.length; i++)
	orgEdges = edges.filter(function(element) {
		var res = $.grep(orgNodes, function(el) {
			return element.to === el.id & element.from === el.id;
		});
		if(res.length == 0) return element;
	});
}
//console.log(orgNodes);
//console.log(orgEdges);


allNodes = orgNodes.get({returnType: "Object"});
	var selectedNode = selectNode;
	console.log(selectedNode);
var updateArray = [];
var nodeId;

//check to see if currently loaded;
var check = allNodes[selectedNode];
console.log(check);
var cluster;

// pull out those related to selected node
if (selectedNode !== "none" & check !== undefined) {
	cluster = allNodes[selectedNode].order;
	//console.log(cluster);

//convert to visnetwork
 for (nodeId in allNodes) {
    if (allNodes.hasOwnProperty(nodeId)) {
    	if(allNodes[nodeId].order === cluster) { 
    		allNodes[nodeId].color = "#A4C6C0";	
    		allNodes[nodeId].shadow = true;
    		allNodes[nodeId].borderWidth = 2;
    		allNodes[nodeId].size = 35;
    	}
		if(allNodes[nodeId].order !== cluster) { 
			allNodes[nodeId].color = "lightgray";	
			allNodes[nodeId].shadow = false;
			allNodes[nodeId].borderWidth = 1;
			allNodes[nodeId].size = 25;
		}
		allNodes[selectedNode].color = "gold";

//executive branch
		allNodes['n01'].color = "#A4C6C0";
		allNodes['n01'].size = 35;
		allNodes['n01'].shadow = true;


     updateArray.push(allNodes[nodeId]);
    }
    }//end for
//orgNodes.update(updateArray);
//console.log(allNodes);
} // end if something selected

if (selectedNode === "none"){
	for (nodeId in allNodes) {
		if (allNodes.hasOwnProperty(nodeId)) {
		allNodes[nodeId].color = "#A4C6C0";	
    	allNodes[nodeId].shadow = true;
    	allNodes[nodeId].borderWidth = 2;
    	allNodes[nodeId].size = 35;

    	updateArray.push(allNodes[nodeId]);
    	}
	}
///orgNodes.update(updateArray);
} // end if something no selected
orgNodes.update(updateArray);



}//end agencyNetwork function
//selectAgencyNetwork(agency, selectNode, selectData);

*/