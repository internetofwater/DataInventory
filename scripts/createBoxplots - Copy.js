
function createBoxplot(agency, selectMetrics){
  
//read in scorecard
d3.csv("data/scorecard.csv", function(score){
  score.forEach(function(d){
        d.easeDiscover = +d.scoreEaseDiscover;
        d.methodDiscover = +d.scoreMethodDiscover;
        d.easeAccess = +d.scoreEaseAccess;
        d.methodAccess = +d.scoreMethodAccess;
        d.formatUse = +d.scoreFileFormat;
        d.metaStandard = +d.scoreMetadataStandards;
        d.dataDefn = +d.scoreDataDefinitions;
        d.metaAttribs = +d.scoreMetaAttributes;
        d.metaFormat = +d.scoreMetadataFormat;
        d.timeUse = +d.scoreTimeliness;
        d.lengthUse = +d.scoreLengthAvailable;
        d.discoverTotal = +d.discoverTotal;
        d.accessTotal = +d.accessTotal;
        d.usableTotal = +d.usableTotal;
        d.allTotal = +d.scoreTotal;
      });

scoreSelect =  score.filter(function (el){ return el.inventory === agency; });
//console.log(scoreSelect);
var inventorySelect = scoreSelect.map(function(a) {return a.webLabel;});
//number of unique agencies
var counts = {};
for (var i = 0; i < inventorySelect.length; i++) {
    counts[inventorySelect[i]] = 1 + (counts[inventorySelect[i]] || 0);
}
var uniqueAgency = Object.keys(counts);

//for each agency, create boxplot trace
var metricSelect = [];
var grabAgent; var agencySelect;
var newTrace;  
if (dataAgency.length>0) {  deleteTrace(dataAgency); }  //console.log("true");}

  for (j=0; j<uniqueAgency.length; j++){
    grabAgent = uniqueAgency[j];
    agencySelect = scoreSelect.filter(function(el){ return el.webLabel === grabAgent; });
    metricSelect = agencySelect.map(function(a){ return a[selectMetrics]; });   // way to grab column dynamically
    
    // create trace
    newTrace = {
        y: metricSelect,
        x: grabAgent,
        marker: {color:'#1C2B58', size: 2},
        type: 'box',
        name: grabAgent,
        boxpoints: 'all',
        jitter: 0.5,
        pointpos: -1.8,
    };
  dataAgency.push(newTrace);
  }
  
//set layout
  var layout = {
    yaxis: {
        title: 'Score',
        zeroline: true,
        showgrid: false,
        range: [0,102],
          tickfont: {
            size: 12,
            color: "black",
          },
        titlefont: {
            size: 12,
            color: "black",
          },
    },
        xaxis: {
      tickfont: {
        size: 12,
        color: "black",
      },
    },
    showlegend: false,
    height: 400,
    margin: {
        t: 25,
        b: 65,
        r: 30,
        l: 40
    },
    fixedrange: false
};
Plotly.newPlot('agencyScores', dataAgency, layout);
//plot
// ########################################################################################################
// END AGENCY PLOTS
// ########################################################################################################


// ########################################################################################################
// Federal Plots
// ########################################################################################################
var federalScore = score.filter(function (el){ return el.inventory === "federal"; });
  var federalMetric = federalScore.map(function(a){ return a[selectMetrics]; });   // way to grab column dynamically

var caScore = score.filter(function (el){ return el.inventory === "ca"; });
  var caMetric = caScore.map(function(a){ return a[selectMetrics]; });   // way to grab column dynamically

var nmScore = score.filter(function (el){ return el.inventory === "nm"; });
  var nmMetric = nmScore.map(function(a){ return a[selectMetrics]; });   // way to grab column dynamically

var ncScore = score.filter(function (el){ return el.inventory === "nc"; });
  var ncMetric = ncScore.map(function(a){ return a[selectMetrics]; });   // way to grab column dynamically

var txScore = score.filter(function (el){ return el.inventory === "tx"; });
  var txMetric = txScore.map(function(a){ return a[selectMetrics]; });   // way to grab column dynamically

var utScore = score.filter(function (el){ return el.inventory === "ut"; });
  var utMetric = txScore.map(function(a){ return a[selectMetrics]; });   // way to grab column dynamically


//draw traces
traceFed = {
        y: federalMetric,
        x: "Federal",
        marker: {color:'#1C2B58', size: 3},
        type: 'box',
        name: "Federal",
        boxpoints: 'all',
        jitter: 0.5,
        pointpos: -1.5,
    };

traceCA = {
        y: caMetric,
        x: "CA",
        marker: {color:'#67abc6', size: 3},
        type: 'box',
        name: "California",
        boxpoints: 'all',
        jitter: 0.5,
        pointpos: -1.5,
    };


traceNM = {
        y: nmMetric,
        x: "NM",
        marker: {color:'#67abc6', size: 3},
        type: 'box',
        name: "New Mexico",
        boxpoints: 'all',
        jitter: 0.5,
        pointpos: -1.5,
    };

traceNC = {
        y: ncMetric,
        x: "NC",
        marker: {color:'#67abc6', size: 3},
        type: 'box',
        name: "North Carolina",
        boxpoints: 'all',
        jitter: 0.5,
        pointpos: -1.5,
    };

traceTX = {
        y: txMetric,
        x: "TX",
        marker: {color:'#67abc6', size: 3},
        type: 'box',
        name: "Texas",
        boxpoints: 'all',
        jitter: 0.5,
        pointpos: -1.5,
    };

traceUT = {
        y: utMetric,
        x: "UT",
        marker: {color:'#67abc6', size: 3},
        type: 'box',
        name: "Utah",
        boxpoints: 'all',
        jitter: 0.5,
        pointpos: -1.5,
    };
var dataInventories = [traceFed, traceCA, traceNM, traceNC, traceTX, traceUT];
Plotly.newPlot('inventoryScores', dataInventories, layout);
//######################################################################################
// END
//######################################################################################

//######################################################################################
// CREATE TABLE
//######################################################################################
document.getElementById("scoreTableDiv").addEventListener("scroll", function(){
   var translate = "translate(0,"+this.scrollTop+"px)";
   this.querySelector("thead").style.transform = translate;
});

//create Table
var myTable= "<table id='scoreTable' class='table table-striped' data-filter-control='true' style='font-size: 14px;'>";
//create column header
myTable += "<thead style='background-color: white;'><tr><th data-field='abbrv' data-filter-control='input' data-sortable='true'>Abbrv</th>";
//myTable += "<th>Agency</th>";
//myTable += "<th>Host</th>";
myTable += "<th>Platform</th>";
myTable += "<th>Discover Ease</th>";  
myTable += "<th>Discover Methods</th>"; 
myTable += "<th>Access Ease</th>";   
myTable += "<th>Access Methods</th>";   
myTable += "<th>File Type</th>"; 
myTable += "<th>Data Glossary</th>"; 
myTable += "<th>Metadata Attributes</th>";     
myTable += "<th>Timeliness</th>";
myTable += "<th>Length of Record</th>"; 
myTable += "<th>Total Discoverability</th>";
myTable += "<th>Total Accessibility</th>";
myTable += "<th>Total Usability</th>";
myTable += "<th>Total Score</th>"+ "</tr></thead>";

//var tbodyScore = document.getElementById('tbodyScore');

for (i = 0, len = scoreSelect.length; i < len; i++) {
  myTable += "<tr>";
    myTable += "<td>" + scoreSelect[i].webLabel + "</td>";
    //myTable += "<td>" + scoreSelect[i].agency + "</td>";
    //myTable += "<td>" + scoreSelect[i].host + "</td>";
    myTable += "<td>" + scoreSelect[i].platform + "</td>";
    myTable += "<td>" + scoreSelect[i].easeDiscover + "</td>";
    myTable += "<td>" + scoreSelect[i].methodDiscover + "</td>";
    myTable += "<td>" + scoreSelect[i].easeAccess + "</td>";
    myTable += "<td>" + scoreSelect[i].methodAccess + "</td>";
    myTable += "<td>" + scoreSelect[i].formatUse + "</td>";
    myTable += "<td>" + scoreSelect[i].dataDefn + "</td>";
    myTable += "<td>" + scoreSelect[i].metaAttribs + "</td>";
    myTable += "<td>" + scoreSelect[i].timeUse + "</td>";
    myTable += "<td>" + scoreSelect[i].lengthUse + "</td>";
    myTable += "<td>" + scoreSelect[i].discoverTotal + "</td>";
    myTable += "<td>" + scoreSelect[i].accessTotal + "</td>";
    myTable += "<td>" + scoreSelect[i].usableTotal + "</td>";
    myTable += "<td>" + scoreSelect[i].allTotal + "</td>";
  myTable += "</tr>";
}
myTable += "</table>"; 

//load table
document.getElementById('scoreTableDiv').innerHTML = myTable;

}); //endD3
}//end create boxplot
//createBoxplot(agency, selectMetrics);




function deleteTrace(dataAgency){
  countLength = dataAgency.length;
  if (countLength>1){
    for (i=0; i<(countLength); i++){ 
      Plotly.deleteTraces('agencyScores', [dataAgency.length-1]);
    }
  }
}//end function deleteTrace