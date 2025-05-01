//read in file
function heatMapMetrics(agency){

//try to read in matrix for plotly heat map - move to metrics.js when done
d3.csv("data/"+agency+"/heatmap.csv").then(function(heat){
	heat.forEach(function(d){
        d.Built = +d.Built;
        d.Natural = +d.Natural;
        d.Quality = +d.Quality;
        d.Regulatory = +d.Regulatory;
        d.Use = +d.Use;
        d.Hydropower = +d.Hydropower;
        d.Irrigation = +d.Irrigation;
        d.Evapotranspiration = +d.Evapotranspiration;
        d.ExtremeEvents = +d.ExtremeEvents;
        d.GlacialandSnow = +d.GlacialandSnow;
        d.Groundwater = +d.Groundwater;
        d.Meteorology = +d.Meteorology;
        d.Precipitation = +d.Precipitation;
        d.Reservoir = +d.Reservoir;
        d.Soil = +d.Soil;
        d.SurfaceWater = +d.SurfaceWater;
        d.Utilities = +d.Utilities;
        d.ManagementPlans = +d.ManagementPlans;
      });
  

  var heatID = heat.map(function(d) { return d.platformID; });
  var hub = heat.map(function(d) { return d.platform; });
  //console.log(heatID);
  var built = heat.map(function(d) {return +d.Built; });
  var natural = heat.map(function(d) {return +d.Natural; });

  var quality = heat.map(function(d) {return +d.Quality; });
  var regulatory = heat.map(function(d) {return +d.Regulatory; });
  
  var use = heat.map(function(d){ return +d.Use; });
  var hydro = heat.map(function(d) {return +d.Hydropower; });
  var irrigation = heat.map(function(d) {return +d.Irrigation; });
  var util = heat.map(function(d) {return +d.Utilities; });
  var plans = heat.map(function(d) {return +d.ManagementPlans; });

  var et = heat.map(function(d){ return +d.Evapotranspiration; });
  var extreme = heat.map(function(d) {return +d.ExtremeEvents; });
  var glacial = heat.map(function(d) {return +d.GlacialandSnow; });
  var gw = heat.map(function(d) {return +d.Groundwater; });
  var meteo = heat.map(function(d) {return +d.Meteorology; });
  var pcp = heat.map(function(d) {return +d.Precipitation; });
  var reservoir = heat.map(function(d) {return +d.Reservoir; });
  var soil = heat.map(function(d) {return +d.Soil; });
  var sw = heat.map(function(d) { return +d.SurfaceWater; });

  //create colorscale based on type and zero, ones
  /*
  var colorscaleValue = [];
  for (i = 0; i < built.length; i++) {
    if(soil[i]==0) {colorscaleValue[i] = '#E0E2E1'; }
    if(soil[i]==1) {colorscaleValue[i] = '#A1C6D5'; }

    if(sw[i]==0) {colorscaleValue[i+built.length] = '#E0E2E1'; }
    if(sw[i]==1) {colorscaleValue[i+built.length] = '#A1C6D5'; }

    if(reservoir[i]==0) {colorscaleValue[i+(built.length*2)] = '#E0E2E1'; }
    if(reservoir[i]==1) {colorscaleValue[i+(built.length*2)] = '#A1C6D5'; }

    if(pcp[i]==0) {colorscaleValue[i+(built.length*3)] = '#E0E2E1'; }
    if(pcp[i]==1) {colorscaleValue[i+(built.length*3)] = '#A1C6D5'; }

    if(meteo[i]==0) {colorscaleValue[i+(built.length*4)] = '#E0E2E1'; }
    if(meteo[i]==1) {colorscaleValue[i+(built.length*4)] = '#A1C6D5'; }

    if(glacial[i]==0) {colorscaleValue[i+(built.length*5)] = '#E0E2E1'; }
    if(glacial[i]==1) {colorscaleValue[i+(built.length*5)] = '#A1C6D5'; }

    if(extreme[i]==0) {colorscaleValue[i+(built.length*6)] = '#E0E2E1'; }
    if(extreme[i]==1) {colorscaleValue[i+(built.length*6)] = '#A1C6D5'; }

    if(et[i]==0) {colorscaleValue[i+(built.length*7)] = '#E0E2E1'; }
    if(et[i]==1) {colorscaleValue[i+(built.length*7)] = '#A1C6D5'; }

    if(gw[i]==0) {colorscaleValue[i+(built.length*8)] = '#E0E2E1'; }
    if(gw[i]==1) {colorscaleValue[i+(built.length*8)] = '#A1C6D5'; }

    if(quality[i]==0) {colorscaleValue[i+(built.length*9)] = '#E0E2E1'; }
    if(quality[i]==1) {colorscaleValue[i+(built.length*9)] = '#9D52A0'; }

    if(regulatory[i]==0) {colorscaleValue[i+(built.length*10)] = '#E0E2E1'; }
    if(regulatory[i]==1) {colorscaleValue[i+(built.length*10)] = '#9D52A0'; }

    if(plans[i]==0) {colorscaleValue[i+(built.length*11)] = '#E0E2E1'; }
    if(plans[i]==1) {colorscaleValue[i+(built.length*11)] = '#02AFA9'; }

    if(util[i]==0) {colorscaleValue[i+(built.length*12)] = '#E0E2E1'; }
    if(util[i]==1) {colorscaleValue[i+(built.length*12)] = '#02AFA9'; }

    if(hydro[i]==0) {colorscaleValue[i+(built.length*13)] = '#E0E2E1'; }
    if(hydro[i]==1) {colorscaleValue[i+(built.length*13)] = '#02AFA9'; }

    if(irrigation[i]==0) {colorscaleValue[i+(built.length*14)] = '#E0E2E1'; }
    if(irrigation[i]==1) {colorscaleValue[i+(built.length*14)] = '#02AFA9'; }

    if(use[i]==0) {colorscaleValue[i+(built.length*15)] = '#E0E2E1'; }
    if(use[i]==1) {colorscaleValue[i+(built.length*15)] = '#02AFA9'; }

    if(natural[i]==0) {colorscaleValue[i+(built.length*16)] = '#E0E2E1'; }
    if(natural[i]==1) {colorscaleValue[i+(built.length*16)] = '#F53F45'; }

    if(built[i]==0) {colorscaleValue[i+(built.length*17)] = '#E0E2E1'; }
    if(built[i]==1) {colorscaleValue[i+(built.length*17)] = '#F53F45'; }
  }//end colorscale
  console.log(colorscaleValue);
  */
  //gets weird because must be centered around zero value
  //https://plot.ly/javascript/colorscales/#custom-discretized-heatmap-colorscale
  //it is a percent of the range:
  var colorscaleValue = [
    [0, '#E0E2E1'], //nothing
    [0.25, '#F53F45'],  //infra
    [0.5, '#A1C6D5'], //quant
    [0.75, '#9D52A0'],  //quality
    [1.0, '#02AFA9'], //use
    //[1, '#1C2B58']
  ];

  var heatMapData = [
    {
      x: hub,
      y: ['Soil', 'Surface Water', 'Reservoir', 'Precipitation', 'Meteorology', 'Glacial/Snow','Extremes', 'Evapotransp.', 'Groundwater',
        'Quality', 'Regulatory',
        'Use-Plans','Use-Utilities', 'Use-Hydropower','Use-Irrigation', 'Use',
        'Inf-Natural', 'Inf-Built'],
      z: [soil, sw, reservoir, pcp, meteo, glacial, extreme, et, gw, quality, regulatory, plans, util, hydro, irrigation, use, natural, built],
      xgap: 1,
      ygap: 1,
      type: 'heatmap',
      text: hub,
      //colorscale: colorscaleValue,
      colorscale: colorscaleValue,
      showscale: false,
      hoverinfo: 'y'+'text'
    }
  ];


var layout;
//if (agency === "federal"){
  layout = {
     xaxis: {
      showline: true,
      title: '',
      titlefont: {color: 'rgb(0, 0, 0)', size: 10},
      tickfont: {color: 'rgb(0, 0, 0)', size: 10},
    },
    yaxis: {
      showline: true,
      title: '',
      titlefont: {color: 'rgb(0, 0, 0)', size: 10},
      tickfont: {color: 'rgb(0, 0, 0)', size: 10},
    },
  	margin: { t: 40, r: 40, b: 100, l: 100 },
  	height: 500, 
    shapes: [
    {
        type: 'line',
        xref: 'paper',
        //yref: 'paper',
        x0: -1,
        y0: -0.5,
        x1: sw.length,
        y1: -0.5,
        line: {
          color: '#A1C6D5',
          width: 1,
        }
      },
      {
        type: 'line',
        xref: 'paper',
        //yref: 'paper',
        x0: -1,
        y0: 8.5,
        x1: sw.length,
        y1: 8.5,
        line: {
          color: '#9D52A0',
          width: 1,
        }
      },
      {
        type: 'line',
        xref: 'paper',
        x0: -1,
        y0: 10.5,
        x1: sw.length,
        y1: 10.5,
        line: {
          color: '#02AFA9',
          width: 1,
        }
      },
      {
        type: 'line',
        xref: 'paper',
        x0: -1,
        y0: 15.5,
        x1: sw.length,
        y1: 15.5,
        line: {
          color: '#F53F45',
          width: 1,
        }
      },
    ]
	}; //end layout
//}//end if federal
//console.log(heatMapData);
Plotly.newPlot('heatMapPlot', heatMapData, layout);
// ########################################################################################################################################
//
// ########################################################################################################################################

//Create the number of data types
var nBuilt = built.reduce(function(a,b) { return a+b; }, 0);
var nNatural = natural.reduce(function(a,b) { return a+b; }, 0);

//Divide quality by 3 because of heat map
var nQuality = quality.reduce(function(a,b) { return a+b; }, 0)/3;
var nRegulatory = regulatory.reduce(function(a,b) { return a+b; }, 0)/3;

//Divide by 4 four use
var nUse = use.reduce(function(a,b) { return a+b; }, 0)/4;
var nHydro = hydro.reduce(function(a,b) { return a+b; }, 0)/4;
var nIrrigation = irrigation.reduce(function(a,b) { return a+b; }, 0)/4;
var nUtilities = util.reduce(function(a,b) {return a+b; }, 0)/4;
var nPlans = plans.reduce(function(a,b) {return a+b; }, 0)/4;

//Divide by 2 for quantity
var nSoil = soil.reduce(function(a,b) { return a+b; }, 0)/2;
var nExtreme = extreme.reduce(function(a,b) { return a+b; }, 0)/2;
var nET = et.reduce(function(a,b) { return a+b; }, 0)/2;
var nGlacial = glacial.reduce(function(a,b) { return a+b; }, 0)/2;
var nMeteo = meteo.reduce(function(a,b) { return a+b; }, 0)/2;
var nPCP = pcp.reduce(function(a,b) { return a+b; }, 0)/2;
var nReservoir = reservoir.reduce(function(a,b) { return a+b; }, 0)/2;
var nSW = sw.reduce(function(a,b) { return a+b; }, 0)/2;
var nGW = gw.reduce(function(a,b) { return a+b; }, 0)/2;

var dataTotal = [nBuilt, nNatural, nIrrigation, nHydro, nUtilities, nUse, nPlans, nRegulatory, nQuality, nSoil, nExtreme, nET, nGlacial,
				nMeteo, nPCP, nReservoir, nSW, nGW];
var dataColor = ['#F53F45','#F53F45', '#02AFA9', '#02AFA9', '#02AFA9', '#02AFA9', '#02AFA9', '#9D52A0', '#9D52A0', '#A1C6D5', '#A1C6D5', '#A1C6D5', '#A1C6D5',
                '#A1C6D5','#A1C6D5','#A1C6D5','#A1C6D5','#A1C6D5'];
//console.log(dataTotal);

Array.prototype.max = function() {return Math.max.apply(null, this); };
maxVal = dataTotal.max();

var dataTotalPlot = [
    {
      y: dataTotal,
      x: ['Built', 'Natural', 'Irrigation', 'Hydropower', 'Utilties', 'Use', 'Mgmt. Plans', 'Regulatory', 'Quality', 'Soil', 'Extremes', 'Evaporation', 
      'Glacial/Snow', 'Meteorology', 'Precipitation','Reservoir','Surface Water', 'Groundwater'],
      type: 'bar',
      marker: {color: dataColor}
      //hoverinfo: 'x'+'text'
    }
  ];


var layout2 = {
    yaxis: {
        title: 'Number of Sites Providing Data',
        titlefont: {color: 'rgb(0, 0, 0)', size: 14},
        tickfont: {color: 'rgb(0, 0, 0)', size: 14},
        showline: true,
        showgrid: false,
        range: [0, maxVal+5]
    },
    xaxis: {
      showline: true,
      title: '',
      titlefont: {color: 'rgb(0, 0, 0)', size: 10},
      tickfont: {color: 'rgb(0, 0, 0)', size: 12},
      //range: [1895, 2020]
    },
    height: 400,
    showlegend: false,
    margin: { t: 20, b: 110, r: 20, l: 45 }
};

Plotly.newPlot('dataBarPlot', dataTotalPlot, layout2);
// ########################################################################################################################################
//
// ########################################################################################################################################


//create number of hubs
var hubTotal = [];
for (i=0; i<heat.length; i++){
var hub1 = 	heat[i].Built + heat[i].Natural +
			heat[i].Quality/3 + heat[i].Regulatory/3 +
			heat[i].Use/4 + heat[i].Hydropower/4 + heat[i].Irrigation/4 + heat[i].ManagementPlans/4 + heat[i].Utilities/4 + 
			heat[i].Evapotranspiration/2 + heat[i].ExtremeEvents/2 + heat[i].GlacialandSnow/2 + heat[i].Groundwater/2 + 
			heat[i].Meteorology/2 + heat[i].Precipitation/2 + heat[i].Reservoir/2 + heat[i].Soil/2 + heat[i].SurfaceWater/2;
//console.log(hub1);
hubTotal[i] = hub1;
}
//console.log(hubTotal);
maxVal2 = hubTotal.max();

var hubTotalPlot = [
    {
      y: hubTotal,
      x: hub,
      type: 'bar',
      marker: {color: '#1C2B58',
  			   opacity: 0.80},
  	  text: hub,
      hoverinfo: 'x'+'text'
    }
  ];

var layout3 = {
    yaxis: {
        title: 'Number of types of data provided',
        titlefont: {color: 'rgb(0, 0, 0)', size: 14},
        tickfont: {color: 'rgb(0, 0, 0)', size: 14},
        showline: true,
        showgrid: false,
        range: [0, maxVal2+5]
    },
    xaxis: {
      showline: true,
      title: '',
      titlefont: {color: 'rgb(0, 0, 0)', size: 10},
      tickfont: {color: 'rgb(0, 0, 0)', size: 11},
      //range: [1895, 2020]
    },
    height: 400,
    showlegend: false,
    margin: { t: 20, b: 110, r: 30, l: 45 }
};
Plotly.newPlot('hubBarPlot', hubTotalPlot, layout3);

}); //END d3 
} // end function
//heatMapMetrics(agency);
