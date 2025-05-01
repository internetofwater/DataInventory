
//read in file
function agencyNetwork(agency){
//read in nodes
d3.csv("data/"+agency+"/organization_NODES.csv", function(orgNodes){
	orgNodes.forEach(function(d){
		d.order = +d.order;
		d.level = +d.level;
	});

// create multi=line labels
orgNodes.forEach(function(node){
	node.label = node.agency.split(" ").join("\n");
});

//read in edges
d3.csv("data/"+agency+"/organization_EDGES.csv", function(orgEdges){
//console.log(orgEdges);


//convert to visnetwork
for (i=0; i < orgNodes.length; i++){
	orgNodes[i].color = "#A4C6C0",
	orgNodes[i].title = orgNodes[i].agency + "<br><strong>Mission: </strong>" + orgNodes[i].mission +
						 "<br><strong>Website: </strong><a href="+orgNodes[i].website+"target=_blank>" + orgNodes[i].website +"</a>";
}

orgNodes = new vis.DataSet(orgNodes);
orgEdges = new vis.DataSet(orgEdges);
console.log(orgNodes);




// Create the network	
var container = document.getElementById('heirPlot');
//provide data in vis format
var data = {
	nodes: orgNodes,
	edges: orgEdges
};

var options = {
	nodes: {
		scaling: {
			min: 10, max: 30,
			label: {min: 8, max: 30}
		},
		font: {
			size: 14,
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

network.on('click', neighbourhoodHighlight);



// function to highlight connected nodes when a node is selected. To work, this function has to be within the D3
// https://github.com/almende/vis/blob/master/examples/network/exampleApplications/neighbourhoodHighlight.html
function neighbourhoodHighlight(params){
	if(params.nodes.length > 0){
		highlightActive = true;
		var i,j;
		var selectedNode = params.nodes[0];
		console.log(selectedNode);
		var degrees = 2;


		//mark all nodes as hard to read
		for (var nodeId in allNodes) {
			 allNodes[nodeId].color = 'rgba(200,200,200,0.5)';
        	if (allNodes[nodeId].hiddenLabel === undefined) {
          		allNodes[nodeId].hiddenLabel = allNodes[nodeId].label;
          		allNodes[nodeId].label = undefined;
        	}// end if
      	} //end for

      var connectedNodes = network.getConnectedNodes(selectedNode);
      //console.log(connectedNodes);
      var allConnectedNodes = [];
      
      // get the second to fifth degree nodes
      for (i = 1; i < degrees; i++) {
        for (j = 0; j < connectedNodes.length; j++) {
          allConnectedNodes = allConnectedNodes.concat(network.getConnectedNodes(connectedNodes[j]));
        }
        // console.log(allConnectedNodes);
      }//end for statement

      // all second degree nodes get a different color and their label back
      for (i = 0; i < allConnectedNodes.length; i++) {
        allNodes[allConnectedNodes[i]].color = 'rgba(150,150,150,0.75)';
        if (allNodes[allConnectedNodes[i]].hiddenLabel !== undefined) {
          allNodes[allConnectedNodes[i]].label = allNodes[allConnectedNodes[i]].hiddenLabel;
          allNodes[allConnectedNodes[i]].hiddenLabel = undefined;
        }
        //console.log(orgNodes)
      }// end for statement


       // all first degree nodes get their own color and their label back
      for (i = 0; i < connectedNodes.length; i++) {
        allNodes[connectedNodes[i]].color = undefined;
        if (allNodes[connectedNodes[i]].hiddenLabel !== undefined) {
          allNodes[connectedNodes[i]].label = allNodes[connectedNodes[i]].hiddenLabel;
          allNodes[connectedNodes[i]].hiddenLabel = undefined;
        }
      } // end for


	// the main node gets its own color and its label back.
      allNodes[selectedNode].color = undefined;
      if (allNodes[selectedNode].hiddenLabel !== undefined) {
        allNodes[selectedNode].label = allNodes[selectedNode].hiddenLabel;
        allNodes[selectedNode].hiddenLabel = undefined;
      } // end if
	}//end very first if

	else if (highlightActive === true) {
	  // reset all nodes
	  for (var nodeId in allNodes) {
	    allNodes[nodeId].color = undefined;
	    if (allNodes[nodeId].hiddenLabel !== undefined) {
	      allNodes[nodeId].label = allNodes[nodeId].hiddenLabel;
	      allNodes[nodeId].hiddenLabel = undefined;
	    }
	  }
	highlightActive = false;
	}//end else if

// transform the object into an array
    var updateArray = [];
    for (nodeId in allNodes) {
      if (allNodes.hasOwnProperty(nodeId)) {
        updateArray.push(allNodes[nodeId]);
      }
    }//end for
    orgNodes.update(updateArray);
   
  
network = new vis.Network(container, data, options);		
} // end highlight neighbourhood function	


});//end orgEdges
});//end orgNodes


}//end agencyNetwork function
agencyNetwork(agency);
