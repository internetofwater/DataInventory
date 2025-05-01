//read in file
function drawDataNetwork(agency, selectHub, selectDiscover, selectDiscoverType, selectAccess, selectAccessType, selectFileType, selectDataDef,
        selectMetadata, selectTimely, selectLength){
//read in nodes
d3.csv("data/"+agency+"/platformNodes.csv").then(function(dnodes){
	 dnodes.forEach(function(d){
	 	d.id = d.platformID;
	 	d.size = +d.count + 5;
	 	d.tier1and2entityID = +d.tier1and2entityID;
	});

var i, j, zt, foo, yt; 

//create labels for drop downs
for (i=0; i < dnodes.length; i++){
	if (dnodes[i].host !== "NA"){
		dnodes[i].title = dnodes[i].webLabel + ": " + dnodes[i].platform + "<br><strong>Entity Hosting Data: </strong>" + dnodes[i].entity +
							 "<br><strong>Website: </strong><a href="+dnodes[i].website+"target=_blank>" + dnodes[i].website +"</a>";

		//---------- filter for discoverability-----////////////////////////////////////////////////////////////////////////////
		if (dnodes[i].easeDiscover === selectDiscover){ dnodes[i].group = "SelectedHubNL"; }

		//---------- filter for discoverability type-----////////////////////////////////////////////////////////////////////////////
		zt = dnodes[i].methodDiscover.split("; ");
		for (j=0; j<zt.length; j++){
			if (zt[j] === selectDiscoverType) {dnodes[i].group = "SelectedHubNL"; }
		}

		//---------- filter for accessibility-----////////////////////////////////////////////////////////////////////////////
		//if (selectAccess === "Permission"){
		//	if(dnodes[i].easeAccess !== "No" & dnodes[i].easeAccess !== "Yes") {dnodes[i].group = "SelectedHubNL"; }
		//}
		//if (selectAccess !== "Permission"){
		//	if(dnodes[i].easeAccess === selectAccess) {dnodes[i].group = "SelectedHubNL"; } 
		//}
		foo = dnodes[i].easeAccess.split("; ");
		for (j=0; j < foo.length; j++){
			if (foo[j] === "Training Required" | foo[j] === "Software Required" | foo[j] === "Permission Required") {foo[j] = "Permission";}
			if (foo[j] === selectAccess) {dnodes[i].group = "SelectedHubNL"; }
		}
		//console.log(foo);


		//---------- filter for accessibility type-----////////////////////////////////////////////////////////////////////////////
		foo = dnodes[i].methodAccess.split("; ");
		for (j=0; j < foo.length; j++){
			if (foo[j] === selectAccessType) {dnodes[i].group = "SelectedHubNL"; }
		}

		//---------- filter for file format-----////////////////////////////////////////////////////////////////////////////
		yt = dnodes[i].fileFormat.split("; ");
		for (j=0; j < yt.length; j++){
			if (yt[j] === selectFileType) {dnodes[i].group = "SelectedHubNL"; }
		}

		//---------- filter for metadata-----////////////////////////////////////////////////////////////////////////////
		xt = dnodes[i].metaAttributes.split("; ");
		for (j=0; j < xt.length; j++){
			if (xt[j] === selectMetadata) {dnodes[i].group = "SelectedHubNL"; }
		}

	//---------- filter for datadef----////////////////////////////////////////////////////////////////////////////
		if (dnodes[i].dataDefinitions === selectDataDef){ dnodes[i].group = "SelectedHubNL";}

		//---------- filter for metadata-----////////////////////////////////////////////////////////////////////////////
		if (dnodes[i].timeliness === selectTimely){ dnodes[i].group = "SelectedHubNL"; }

		//---------- filter for metadata-----////////////////////////////////////////////////////////////////////////////
		if (dnodes[i].lengthAvailable === selectLength){ dnodes[i].group = "SelectedHubNL"; }

	} // end hubs

	//---------- filter for data in water budget-----////////////////////////////////////////////////////////////////////////////
	if (dnodes[i].host === "NA"){
		dnodes[i].title = "Data Type <br><strong>Group: </strong>" + dnodes[i].entity + "<br><strong>Budget: </strong>" + dnodes[i].group;
	}


	//---------- style nodes based on if hub or data-----////////////////////////////////////////////////////////////////////////////
	if (selectHub.charAt(0)==="p") { // select edges coming FROM a data hub
		if (dnodes[i].id === selectHub){ dnodes[i].group = "SelectedHub"; }
	}
	if (selectHub.charAt(0)==="d") { // select edges coming TO a data hub
		if (dnodes[i].id === selectHub){ dnodes[i].group = "SelectedData"; }
	}
}//end for

//console.log(nodes);

d3.csv("data/"+agency+"/dataEdges.csv").then(function(edges){
//count number of edges
var edgesCount = edges.map(function(d) { return d.to; });

//find edges based on selected node
var connectedNodes = [];
for (i = 0; i < edges.length; i++){
	if (selectHub.charAt(0)==="p") { // select edges coming FROM a data hub
		if(edges[i].from === selectHub) {
			//console.log("Edge found")
			connectedNodes.push(edges[i].to);
		}
	}
	if (selectHub.charAt(0)==="d") { // select edges coming TO a data hub
		if(edges[i].to === selectHub) {
			connectedNodes.push(edges[i].from);
		}
	}
}//end for
//console.log(selectHub);
//console.log(connectedNodes);

for (i=0; i < dnodes.length; i++){
	for (j=0; j<connectedNodes.length; j++){
		if (selectHub.charAt(0)==="p") {  // opposite
			if (dnodes[i].id === connectedNodes[j]){ dnodes[i].group = "SelectedData"; }
		}
		if (selectHub.charAt(0)==="d") { 
			if (dnodes[i].id === connectedNodes[j]){ dnodes[i].group = "SelectedHub"; }
		}
	}
}


// ###############################################################################################################################
//  CREATE THE NETWORK
// ###############################################################################################################################
 // legend
var mynetwork = document.getElementById('networkPlot');
//var x = - mynetwork.clientWidth / 2 - 500; //500
//var y = - mynetwork.clientHeight / 2 + 25;
//var step = 80;
//dnodes.push({id: 1000, x: x, y: y, label: 'Data Access Point', group: 'hub', value: 1, fixed: true, physics:false, color: {background: "white", border: "black"}});
//dnodes.push({id: 1001, x: x, y: y + step, label: 'Data: Infrastructure', group: 'Infrastructure', value: 1, fixed: true, physics:false});
//dnodes.push({id: 1002, x: x, y: y + 2 * step, label: 'Data: Water Quality', group: 'Quality', value: 1, fixed: true, physics:false});
//dnodes.push({id: 1003, x: x, y: y + 3 * step, label: 'Data: Water Quantity', group: 'Quantity', value: 1, fixed: true, physics:false});
//dnodes.push({id: 1004, x: x, y: y + 4 * step, label: 'Data: Water Use', group: 'Use', value: 1, fixed: true, physics:false});


// set as vis.dataset
dataNodes = new vis.DataSet(dnodes);
dataEdges = new vis.DataSet(edges);
//console.log(dataNodes)

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
			inherit: 'to',
			opacity: 0.7  //must be in rgb or hex code to work
		},
		width: 2,
		smooth: false,
	},

	nodes: {
		shadow: false,
		font: {
			size: 25,
			align: 'left'
		},
	},

	groups: {
		hub: {
			color: {
				background: 'lightgray', 
				border: '#454545',
				highlight: { 
					background: '1C2B58', 
					border: 'blue'
				}
			},
			shape: 'square',
		},
		Quantity: {
			color: {
				background: '#A1C6D5', 
				border: '#72B2C3'
			},
			shape: 'triangle',
		},
		Quality: {
			color: {
				background: '#6C3483', 
				border: '#6C3483'
			},
			shape: 'triangle',
		},
		Use: {
			color: {
				background: '#138D75', 
				border: '#138D75'
			},
			shape: 'triangle',
			},
		Infrastructure: {
			color: {
				background: '#A93226', 
				border: '#A93226'
			},
			shape: 'star',
			},

		SelectedHub: {
			color: {
				background: 'gold', 
				border: 'black'
			},
			shape: 'square',
			size: 16,
			},

		SelectedHubNL: {
			color: {
				background: 'gold', 
				border: 'gray'
			},
			shape: 'square',
			size: 13,
			},

		SelectedData: {
			color: {
				background: 'gold', 
				border: 'black'
			},
			shape: 'triangle',
			size: 18,
			}
	},

		
	layout: {
		improvedLayout: true,
		//randomSeed: 777498 // good one for nc
		//randomSeed: 321730 //good one for federal
		randomSeed: 4    //draws network same
	},

			
	interaction: {
		dragNodes : true,
		navigationButtons : true,
		hover: true
	},
    physics: {
    	enabled: true,  // must be true for barnesHut
    	//enabled: false,

    	barnesHut:{
    		gravitationalConstant:-2000,
    		centralGravity: 0.3, //spreads network
    		//springLength: 125, //length of edges
    		//avoidOverlap: 10
    	},
         stabilization: {iterations: 500} 
    },
    
};
//console.log(dataNetwork)
//initialize network
var network = new vis.Network(container, dataNetwork, optionsNetwork);
//move network to x and y positions
//console.log(dataNetwork)

// draw a radius ###########################################################################
// While cool it breaks quickly
var radius = 500;
var ids = dataNetwork.nodes.getIds();
var d = 2 * Math.PI / ids.length; // Angular pitch
 // console.log(ids);

//network.on('initRedraw', function () {
  //ids.forEach(function(id, i) {  // these continue and don't break. causes network to stop working.
  /*for (i = 0; i < ids.length; i++) {
  	var id = ids[i];
  		//console.log(id);
  	var x = radius * Math.cos(d * i);
    var y = radius * Math.sin(d * i);
    //console.log(x);
    network.moveNode(id, x, y);
 } // end for loop
//});
*/
//end circular netowrk creation

//console.log(network.getSeed());
createNodesTable(dnodes);
 //end Edges
}); // end nodes
}); //end edges


}//end function

// ######################################################################################################################
//      CREATE A TABLE USING SELECTED HubNL group
// ######################################################################################################################
function createNodesTable(dnodes){
document.getElementById('nodeTableDiv').innerHTML="";
document.getElementById('dataTableHeader').innerHTML="";


var tableNodes = dnodes.filter(function(d) {return d.group === "SelectedHub" | d.group === "SelectedHubNL"; });
//console.log(tableNodes);

document.getElementById("nodeTableDiv").addEventListener("scroll", function(){
   var translate = "translate(0,"+this.scrollTop+"px)";
   this.querySelector("thead").style.transform = translate;
});


var header = document.getElementById("dataTableHeader");
header.innerHTML = "<h2><span style='color: #008078;'>Data platforms based on drop-down selections: " +
	tableNodes.length + " selected</span></h2>";

//console.log(tableNodes)

//create Table
var myTable= "<table id='nodeTableDiv' class='table table-striped' style='font-size: 14px;'>";
//create column header
myTable += "<thead style='background-color: white;'><tr><th>Entity</th>";
myTable += "<th>Platform</th>";
//myTable += "<th>Ease of Finding</th>";  
myTable += "<th>Method to Find</th>"; 
myTable += "<th>How Obtain Data</th>";   
myTable += "<th>File Type(s)</th>"; 
myTable += "<th>Metadata Format</th>"; 
myTable += "<th>Metadata Attributes</th>";   
myTable += "<th>Data Dictionary</th>";   
myTable += "<th>Timeliness</th>";
myTable += "<th>Length of Record</th>"+ "</tr></thead>";

var tbody = document.getElementById('tbody2');
//loop through and add rows
//http://jsfiddle.net/mjE7R/3/
for (var i = 0, len = tableNodes.length; i < len; i++) {
  myTable += "<tr>";
	  myTable += "<td>" + tableNodes[i].entity + "</td>";
	  myTable += "<td><a href="+tableNodes[i].website + " target=_blank'>" + tableNodes[i].platform + "</td>";
	  //myTable += "<td>" + tableNodes[i].easeDiscover + "</td>";
	  myTable += "<td>" + tableNodes[i].methodDiscover + "</td>";
	  myTable += "<td>" + tableNodes[i].methodAccess + "</td>";
	  myTable += "<td>" + tableNodes[i].fileFormat + "</td>";
	  myTable += "<td>" + tableNodes[i].metadataFormat + "</td>";
	  myTable += "<td>" + tableNodes[i].metaAttributes + "</td>";
	  myTable += "<td>" + tableNodes[i].dataDefinitions + "</td>";
	  myTable += "<td>" + tableNodes[i].timeliness + "</td>";
	  myTable += "<td>" + tableNodes[i].lengthAvailable + "</td>";
	  
  myTable += "</tr>";
}

myTable += "</table>"; 

//load table
document.getElementById('nodeTableDiv').innerHTML = myTable;
} // end function
