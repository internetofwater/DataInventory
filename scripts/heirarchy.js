//read in file
function agencyNetwork(agency){
	
//read in nodes
d3.csv("data/"+agency+"/orgNodes.csv").then(function(orgNodes){
	 orgNodes.forEach(function(d){
	 	d.id = d.entityID;  //the nodes have to be "id"
		d.order = +d.tier1and2entityID;
		d.level = +d.level;
		d.label = d.entity.split(" ").join("\n");  // create multi=line labels
	});

	//convert to visnetwork
	for (i=0; i < orgNodes.length; i++){
		orgNodes[i].color = "#A4C6C0",
		orgNodes[i].title = orgNodes[i].entity + "<br><strong>Mission: </strong>" + orgNodes[i].mission +
							 "<br><strong>Website: </strong><a href="+orgNodes[i].website+"target=_blank>" + orgNodes[i].website +"</a>";
	}
	//console.log(orgNodes);

	//read in edges
	d3.csv("data/"+agency+"/orgEdges.csv").then(function(orgEdges){
	//console.log(orgEdges);
		orgNodes = new vis.DataSet(orgNodes);
		orgEdges = new vis.DataSet(orgEdges);
	//console.log(orgNodes);

	drawNetwork(orgNodes, orgEdges);

	});//end orgEdges
});//end orgNodes

}//end agencyNetwork function
agencyNetwork(agency);



function drawNetwork(orgNodes, orgEdges){
// Create the network	
var container = document.getElementById('heirPlot');
//provide data in vis format
var data = {
	nodes: orgNodes,
	edges: orgEdges
};

var options = {
	//height: '100%',
	//width: '100%',
	edges: {
		color: {
			color: "#A4C6C0",
			inherit: false
		},
		width: 2
	},

	nodes: {
		scaling: {
			min: 10, max: 30,
			label: {min: 8, max: 30}
		},
		font: {
			size: 16,
			face: 'Tahoma'
		},
		shape: "square",
		//color: "#A4C6C0",
		size: 35,
		borderWidth: 2,
		shadow: true,
	},

		
	layout: {
		hierarchical: {
			edgeMinimization: true,
			levelSeparation: 250,
			nodeSpacing: 150,
			direction: "UD",
			sortMethod: "directed"
		}, //end hierarchical
	},//end layout
	interaction: {
		dragNodes :false,
		navigationButtons : true
	},
    physics: {enabled: false},

};

//initialize network
var network = new vis.Network(container, data, options);
allNodes = orgNodes.get({returnType: "Object"});
allEdges = orgEdges.get({returnType: "Object"});
network.on('click', neighbourhoodHighlight);
//console.log(network)
//////////////////////////////////////////////////////////////////////////////////////////////////////////




// function to highlight connected nodes when a node is selected. To work, this function has to be within the D3
// https://github.com/almende/vis/blob/master/examples/network/exampleApplications/neighbourhoodHighlight.html
function neighbourhoodHighlight(params){
//console.log(allNodes);
//resets all nodes to original color
 if (highlightActive === true) {
	  // reset all nodes
	  for (var nodeId in allNodes) {
	    allNodes[nodeId].color = "#A4C6C0";
	  }
	highlightActive = false;
}//end else if

highlightActive = true;
var i,j;
var selectedNode = params.nodes[0];
	//console.log(selectedNode);

var level = allNodes[selectedNode].level;
var degrees = 5;

var connectedNodes = network.getConnectedNodes(selectedNode);
var connectedEdges = network.getConnectedEdges(selectedNode);

var allConnectedNodes = [];
var allConnectedEdges = [];
      
for (j = 0; j < connectedNodes.length; j++) {
     allConnectedNodes = allConnectedNodes.concat(network.getConnectedNodes(connectedNodes[j]));
     allConnectedEdges = allConnectedEdges.concat(network.getConnectedEdges(connectedNodes[j]));
}

      // all second degree nodes get a different color and their label back
for (i = 0; i < allConnectedNodes.length; i++) {
    allNodes[allConnectedNodes[i]].color = '#1C2B58';
    if(allNodes[allConnectedNodes[i]].level === level) 
    	{ allNodes[allConnectedNodes[i]].color = "#A4C6C0";	}
}// end for statement

      
// all first degree nodes get their own color and their label back
for (i = 0; i < connectedNodes.length; i++) {
    allNodes[connectedNodes[i]].color = '#1C2B58';
} // end for

// the main node gets its own color and its label back.
allNodes[selectedNode].color = "gold";

// transform the object into an array
var updateArray = [];
for (nodeId in allNodes) {
    if (allNodes.hasOwnProperty(nodeId)) {
        updateArray.push(allNodes[nodeId]);
    }
}//end for
orgNodes.update(updateArray);
 

drawNetwork(orgNodes, orgEdges);
	} // end highlight neighbourhood function	
}