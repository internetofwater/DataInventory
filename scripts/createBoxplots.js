function createTraceInventory(target){
  checked = [];
  $("input[name='checkState']:checked").each(function() {
    checked.push($(this).val());
  });
  console.log(checked);
  createBoxplot(agency, selectMetrics, checked);
  return checked;
}


function median(values){
  if(values.length ===0) return 0;

  values.sort(function(a,b){ return a-b;  });
  var half = Math.floor(values.length / 2);

  if (values.length % 2)
    return values[half];

  return (values[half - 1] + values[half]) / 2.0;
}


function createBoxplot(agency, selectMetrics, checked){
//read in scorecard
d3.csv("data/scorecard.csv").then(function(score){
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
// COMPARE INVENTORY SCORES
// ########################################################################################################
var federalScore = score.filter(function (el){ return el.inventory === "federal"; });
  var federalMetric = federalScore.map(function(a){ return a[selectMetrics]; });   // way to grab column dynamically

var azScore = score.filter(function (el){ return el.inventory === "az"; });
  var azMetric = azScore.map(function(a){ return a[selectMetrics]; });   // way to grab column dynamically
   
var caScore = score.filter(function (el){ return el.inventory === "ca"; });
  var caMetric = caScore.map(function(a){ return a[selectMetrics]; });   // way to grab column dynamically

var coScore = score.filter(function (el){ return el.inventory === "co"; });
  var coMetric = coScore.map(function(a){ return a[selectMetrics]; });   // way to grab column dynamically

var nmScore = score.filter(function (el){ return el.inventory === "nm"; });
  var nmMetric = nmScore.map(function(a){ return a[selectMetrics]; });   // way to grab column dynamically

var ncScore = score.filter(function (el){ return el.inventory === "nc"; });
  var ncMetric = ncScore.map(function(a){ return a[selectMetrics]; });   // way to grab column dynamically

var orScore = score.filter(function (el){ return el.inventory === "or"; });
  var orMetric = orScore.map(function(a){ return a[selectMetrics]; });   // way to grab column dynamically

var txScore = score.filter(function (el){ return el.inventory === "tx"; });
  var txMetric = txScore.map(function(a){ return a[selectMetrics]; });   // way to grab column dynamically

var utScore = score.filter(function (el){ return el.inventory === "ut"; });
  var utMetric = utScore.map(function(a){ return a[selectMetrics]; });   // way to grab column dynamically

var wyScore = score.filter(function (el){ return el.inventory === "wy"; });
  var wyMetric = wyScore.map(function(a){ return a[selectMetrics]; });   // way to grab column dynamically

//draw traces
traceFed = {
        y: federalMetric,    x: "Federal",
        marker: {color:'#1C2B58', size: 3},
        type: 'box',        name: "Federal",    
        boxpoints: 'all',   jitter: 0.5,        pointpos: -1.5,
    };

traceAZ = {
        y: azMetric,        x: "AZ",
        marker: {color:'#67abc6', size: 3},
        type: 'box',        name: "Arizona",
        boxpoints: 'all',   jitter: 0.5,        pointpos: -1.5,
    };

traceCA = {
        y: caMetric,        x: "CA",
        marker: {color:'#67abc6', size: 3},
        type: 'box',        name: "California",
        boxpoints: 'all',   jitter: 0.5,        pointpos: -1.5,
    };

traceCO = {
        y: coMetric,        x: "CO",
        marker: {color:'#67abc6', size: 3},
        type: 'box',        name: "Colorado",
        boxpoints: 'all',   jitter: 0.5,        pointpos: -1.5,
    };

traceNM = {
        y: nmMetric,        x: "NM",
        marker: {color:'#67abc6', size: 3},
        type: 'box',        name: "New Mexico",
        boxpoints: 'all',   jitter: 0.5,        pointpos: -1.5,
    };

traceNC = {
        y: ncMetric,        x: "NC",
        marker: {color:'#67abc6', size: 3},
        type: 'box',        name: "North Carolina",
        boxpoints: 'all',   jitter: 0.5,        pointpos: -1.5,
    };

traceOR = {
        y: orMetric,        x: "OR",
        marker: {color:'#67abc6', size: 3},
        type: 'box',        name: "Oregon",
        boxpoints: 'all',   jitter: 0.5,        pointpos: -1.5,
    };

traceTX = {
        y: txMetric,        x: "TX",
        marker: {color:'#67abc6', size: 3},
        type: 'box',        name: "Texas",
        boxpoints: 'all',   jitter: 0.5,        pointpos: -1.5,
    };

traceUT = {
        y: utMetric,        x: "UT",
        marker: {color:'#67abc6', size: 3},
        type: 'box',        name: "Utah",
        boxpoints: 'all',   jitter: 0.5,        pointpos: -1.5,
    };

  traceWY = {
        y: wyMetric,        x: "WY",
        marker: {color:'#67abc6', size: 3},
        type: 'box',        name: "Wyoming",
        boxpoints: 'all',   jitter: 0.5,        pointpos: -1.5,
    };


var dataInventories = [];

if (checked.includes("traceFed")===true) {dataInventories.push(traceFed); }
if (checked.includes("traceAZ")===true) {dataInventories.push(traceAZ); }
if (checked.includes("traceCA")===true) {dataInventories.push(traceCA); }
if (checked.includes("traceCO")===true) {dataInventories.push(traceCO); }
if (checked.includes("traceNM")===true) {dataInventories.push(traceNM); }
if (checked.includes("traceNC")===true) {dataInventories.push(traceNC); }
if (checked.includes("traceOR")===true) {dataInventories.push(traceOR); }
if (checked.includes("traceTX")===true) {dataInventories.push(traceTX); }
if (checked.includes("traceUT")===true) {dataInventories.push(traceUT); }
if (checked.includes("traceWY")===true) {dataInventories.push(traceWY); }
//console.log(dataInventories)
//dataInventories = [traceFed, traceCA, traceNM, traceNC, traceTX, traceUT];

Plotly.newPlot('inventoryScores', dataInventories, layout);
//######################################################################################
// END
//######################################################################################


//######################################################################################
// CREATE BARPLOT
//######################################################################################

//Calculate median overall scores
   //var fedOverall = federalScore.map(function(a) {return a.allTotal; });
   //var medFedOverall = Math.round(d3.quantile(fedOverall, 0.50)*10)/10;  //THIS GIVES A BAD ANSWER
   //var medFedOverall = median(fedOverall);
   var medFedOverall = median(federalScore.map(function(a) {return a.allTotal; }));
   var medAZOverall = median(azScore.map(function(a) {return a.allTotal; }));
   var medCAOverall = median(caScore.map(function(a) {return a.allTotal; }));
   var medCOOverall = median(coScore.map(function(a) {return a.allTotal; }));
   var medNMOverall = median(nmScore.map(function(a) {return a.allTotal; }));
   var medNCOverall = median(ncScore.map(function(a) {return a.allTotal; }));
   var medOROverall = median(orScore.map(function(a) {return a.allTotal; }));
   var medTXOverall = median(txScore.map(function(a) {return a.allTotal; }));
   var medUTOverall = median(utScore.map(function(a) {return a.allTotal; }));
   var medWYOverall = median(wyScore.map(function(a) {return a.allTotal; }));

//calculate median discover score
   var medFedDiscover = median(federalScore.map(function(a) {return a.discoverTotal; }));
   var medAZDiscover = median(azScore.map(function(a) {return a.discoverTotal; }));
   var medCADiscover = median(caScore.map(function(a) {return a.discoverTotal; }));
   var medCODiscover = median(coScore.map(function(a) {return a.discoverTotal; }));
   var medNMDiscover = median(nmScore.map(function(a) {return a.discoverTotal; }));
   var medNCDiscover = median(ncScore.map(function(a) {return a.discoverTotal; }));
   var medORDiscover = median(orScore.map(function(a) {return a.discoverTotal; }));
   var medTXDiscover = median(txScore.map(function(a) {return a.discoverTotal; }));
   var medUTDiscover = median(utScore.map(function(a) {return a.discoverTotal; }));
   var medWYDiscover = median(wyScore.map(function(a) {return a.discoverTotal; }));

//calculate median accessible score
   var medFedAccess = median(federalScore.map(function(a) {return a.accessTotal; }));
   var medAZAccess = median(azScore.map(function(a) {return a.accessTotal; }));
   var medCAAccess = median(caScore.map(function(a) {return a.accessTotal; }));
   var medCOAccess = median(coScore.map(function(a) {return a.accessTotal; }));
   var medNMAccess = median(nmScore.map(function(a) {return a.accessTotal; }));
   var medNCAccess = median(ncScore.map(function(a) {return a.accessTotal; }));
   var medORAccess = median(orScore.map(function(a) {return a.accessTotal; }));
   var medTXAccess = median(txScore.map(function(a) {return a.accessTotal; }));
   var medUTAccess = median(utScore.map(function(a) {return a.accessTotal; }));
   var medWYAccess = median(wyScore.map(function(a) {return a.accessTotal; }));

//calculate median usable score
   var medFedUse = median(federalScore.map(function(a) {return a.usableTotal; }));
   var medAZUse = median(azScore.map(function(a) {return a.usableTotal; }));
   var medCAUse = median(caScore.map(function(a) {return a.usableTotal; }));
   var medCOUse = median(coScore.map(function(a) {return a.usableTotal; }));
   var medNMUse = median(nmScore.map(function(a) {return a.usableTotal; }));
   var medNCUse = median(ncScore.map(function(a) {return a.usableTotal; }));
   var medORUse = median(orScore.map(function(a) {return a.usableTotal; }));
   var medTXUse = median(txScore.map(function(a) {return a.usableTotal; }));
   var medUTUse = median(utScore.map(function(a) {return a.usableTotal; }));
   var medWYUse = median(wyScore.map(function(a) {return a.usableTotal; }));


var overallScore = []; var discoverScore = []; var accessScore = [];   var useScore = [];
var xValue = [];
var medianDataTraces = [];

if (checked.includes("traceFed")===true) {
    overallScore.push(medFedOverall);     discoverScore.push(medFedDiscover); 
    accessScore.push(medFedAccess);       useScore.push(medFedUse);
    xValue.push("Federal");
}
if (checked.includes("traceAZ")===true) {
    overallScore.push(medAZOverall);      discoverScore.push(medAZDiscover); 
    accessScore.push(medAZAccess);        useScore.push(medAZUse);
    xValue.push("Arizona");
}
if (checked.includes("traceCA")===true) {
    overallScore.push(medCAOverall);      discoverScore.push(medCADiscover); 
    accessScore.push(medCAAccess);        useScore.push(medCAUse);
    xValue.push("California");
}
if (checked.includes("traceCO")===true) {
    overallScore.push(medCOOverall);      discoverScore.push(medCODiscover); 
    accessScore.push(medCOAccess);        useScore.push(medCOUse);
    xValue.push("Colorado");
}
if (checked.includes("traceNM")===true) {
    overallScore.push(medNMOverall);      discoverScore.push(medNMDiscover); 
    accessScore.push(medNMAccess);        useScore.push(medNMUse);
    xValue.push("New Mexico");
}
if (checked.includes("traceNC")===true) {
    overallScore.push(medNCOverall);      discoverScore.push(medNCDiscover); 
    accessScore.push(medNCAccess);        useScore.push(medNCUse);
    xValue.push("North Carolina");
}
if (checked.includes("traceOR")===true) {
    overallScore.push(medOROverall);      discoverScore.push(medORDiscover); 
    accessScore.push(medORAccess);        useScore.push(medORUse);
    xValue.push("Oregon");
}
if (checked.includes("traceTX")===true) {
    overallScore.push(medTXOverall);      discoverScore.push(medTXDiscover); 
    accessScore.push(medTXAccess);        useScore.push(medTXUse);
    xValue.push("Texas");
}
if (checked.includes("traceUT")===true) {
    overallScore.push(medUTOverall);      discoverScore.push(medUTDiscover); 
    accessScore.push(medUTAccess);        useScore.push(medUTUse);
    xValue.push("Utah");
}
if (checked.includes("traceWY")===true) {
    overallScore.push(medWYOverall);      discoverScore.push(medWYDiscover); 
    accessScore.push(medWYAccess);        useScore.push(medWYUse);
    xValue.push("Wyoming");
}
//console.log(xValue);
//console.log(overallScore);   console.log(discoverScore);  console.log(accessScore);   console.log(useScore);

//create new color
var count = 0; var xLabel;
for(k=0; k < xValue.length; k++){
  var yValue=[];
  var colorPlot;
  count = k+1;
  if (k==1 | count==8) {colorPlot = "#1C2B58";}
    if (count==2 | count==9) {colorPlot = "#EC7029";}
      if (count==3 | count==10 ) {colorPlot = "#a1c6d5";}
        if (count==4 | count==11) {colorPlot = "#E6000B";}
          if (count==5 | count==12) {colorPlot = "#008078";}
            if (count==6 | count==13) {colorPlot = "#9D51A0";}
              if (count==7 | count==14) {colorPlot = "#B4D239";}
                if (count >=15) {colorPlot = "#666666";}

  yValue.push(overallScore[k], discoverScore[k], accessScore[k], useScore[k]);
  xLabel = xValue[k];
  //console.log(yValue);
  //add Trace
  newTrace = {
    type: 'bar',
    x: ["Overall", "Discoverable", "Accessible", "Usable"],
    y: yValue,
    name: xLabel,
    marker: { color: colorPlot }
  };

medianDataTraces.push(newTrace);
//console.log(count); console.log(colorPlot);
}//end k loop

//SET UP PLOTLY GRAPH
  var layoutMedian = {
    yaxis: {
        title: 'Median Score',
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
    barmode: 'group',
    showlegend: true,
    height: 400,
    margin: { t: 25, b: 65,  r: 30, l: 40 },
    fixedrange: false
};
Plotly.newPlot('barInventoryScores', medianDataTraces, layoutMedian);




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