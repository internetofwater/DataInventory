//read in file
function selectAgencyNetwork(agency, selectNode, selectData){
//read in nodes
d3.csv("data/"+agency+"/orgNodes.csv").then(function(nodes){
	 nodes.forEach(function(d){
	 	d.id = d.entityID;
		d.order = +d.tier1and2entityID;
		d.level = +d.level;
	});
//read in edges
d3.csv("data/"+agency+"/orgEdges.csv").then(function(edges){

var orgNodes; 
var orgEdges;
//filter by data type
if (selectData === "none"){
	orgNodes = nodes;
	orgEdges = edges;
}

if (selectData==="operational"){ 
	orgNodes = nodes.filter(function(d){ return d.operational !== "No"; });

	orgEdges = edges.filter(function(element) {
		var res = $.grep(orgNodes, function(el) {
			return element.to === el.id & element.from === el.id;
		});
		if(res.length == 0) return element;
	});
}
//console.log(orgNodes);
//console.log(orgEdges);

if (selectData==="decision"){ 
	orgNodes = nodes.filter(function(d){ return d.decision !== "No"; });

	orgEdges = edges.filter(function(element) {
		var res = $.grep(orgNodes, function(el) {
			return element.to === el.id & element.from === el.id;
		});
		if(res.length == 0) return element;
	});
}

if (selectData==="regulatory"){ 
	orgNodes = nodes.filter(function(d){ return d.regulatory !== "No"; });

	orgEdges = edges.filter(function(element) {
		var res = $.grep(orgNodes, function(el) {
			return element.to === el.id & element.from === el.id;
		});
		if(res.length == 0) return element;
	});
}

if (selectData==="research"){ 
	orgNodes = nodes.filter(function(d){ return d.research !== "No"; });

	orgEdges = edges.filter(function(element) {
		var res = $.grep(orgNodes, function(el) {
			return element.to === el.id & element.from === el.id;
		});
		if(res.length == 0) return element;
	});
}
//console.log(orgNodes);
//console.log(orgEdges);

// create multi=line labels
orgNodes.forEach(function(node){
	node.label = node.entity.split(" ").join("\n");
});

for (i=0; i < orgNodes.length; i++){
orgNodes[i].title = orgNodes[i].entity + "<br><strong>Mission: </strong>" + orgNodes[i].mission +
						 "<br><strong>Website: </strong><a href="+orgNodes[i].website+"target=_blank>" + orgNodes[i].website +"</a>";
}


// set as vis.dataset
orgNodes = new vis.DataSet(orgNodes);
orgEdges = new vis.DataSet(orgEdges);

allNodes = orgNodes.get({returnType: "Object"});
	var selectedNode = selectNode;
	//console.log(allNodes)
	console.log(selectedNode);
var updateArray = [];
var nodeId;

//check to see if currently loaded;
var check = allNodes[selectedNode];
//console.log(check);
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
//console.log(orgNodes)

var container = document.getElementById('heirPlot');
//provide data in vis format
var data = {
	nodes: orgNodes,
	edges: orgEdges
};

var options = {
	edges: {
		color: {
			color: "lightgray",
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
		//size: 35,
	},

		
	layout: {
		hierarchical: {
			//improvedLayout: true,
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
createTable(agency, cluster, selectData, selectNode);

//} //end draw network

});//end orgEdges
});//end orgNodes

}//end agencyNetwork function
//selectAgencyNetwork(agency, selectNode, selectData);




//function to create table based on agency selected or data purpose selected
function createTable(agency, cluster, selectData, selectNode){
var canvas = document.getElementById('agencyTableDiv');
             canvas.innerHTML="";

//read in data
d3.csv("data/"+agency+"/orgNodes.csv").then(function(nodes){

// filter by selected node
if (cluster > 0){
	nodes2 = nodes.filter(function(d){ return d.tier1and2entityID === cluster.toString(); });
}

if (cluster === undefined){
	nodes2 = nodes;
}
//console.log(nodes)
//console.log(nodes2);

//filter by data type
if (selectData === "none"){ nodes = nodes2;	}
if (selectData==="operational"){ 
	nodes = nodes2.filter(function(d){ return d.operational !== "No"; });
}

if (selectData==="decision"){ 
	nodes = nodes2.filter(function(d){ return d.decision !== "No"; });
}

if (selectData==="regulatory"){ 
	nodes = nodes2.filter(function(d){ return d.regulatory !== "No"; });
}

if (selectData==="research"){ 
	nodes = nodes2.filter(function(d){ return d.research !== "No"; });
}
//console.log(nodes)

//check to see that selected agency and purpose co-exist. If not, remove nodes.
if (selectNode !== "none"){
	var entityPurpose = nodes.filter(function(d){ return d.entityID === selectNode; });
	if (entityPurpose.length === 0){ nodes = []; }
}

var header = document.getElementById("agencyTableHeader");
header.innerHTML = "<h2><span style='color: #008078;'>Public entities collecting water data based on drop-down selections: " +
	nodes.length + " shown</span></h2>";


document.getElementById("agencyTableDiv").addEventListener("scroll", function(){
   var translate = "translate(0,"+this.scrollTop+"px)";
   this.querySelector("thead").style.transform = translate;
});

//create Table
var myTable= "<table id='agencyTableDiv' class='table table-striped'>";
//create column header
myTable += "<thead style='background-color: white;'><tr><th>Entity</th>";
myTable += "<th>Department</th>";
myTable += "<th>Mission</th>";
myTable += "<th>Website</th>" + "</tr></thead>";

var tbody = document.getElementById('tbody');
//loop through and add rows
//http://jsfiddle.net/mjE7R/3/
for (var i = 0, len = nodes.length; i < len; i++) {
  myTable += "<tr>";
	  myTable += "<td>" + nodes[i].entity + "</td>";
	  myTable += "<td>" + nodes[i].tier1and2entity + "</td>";
	  myTable += "<td>" + nodes[i].mission + "</td>";
	  myTable += "<td><a href="+ nodes[i].website + " target='_blank'>" + nodes[i].website + "</a></td>";
  myTable += "</tr>";
}
myTable += "</table>"; 


//load table
document.getElementById('agencyTableDiv').innerHTML = myTable;

}); // close d3
}
createTable(agency, cluster, selectData);

