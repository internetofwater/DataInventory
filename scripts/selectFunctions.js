   //when selection is made
  function setAgencyThis(target){
    selectNode = document.getElementById('setAgency').value; //getElementById did not work, but Name does work
    
    selectAgencyNetwork(agency, selectNode, selectData);
    return selectNode;
  }

  function setDataThis(target){
    selectData = document.getElementById('setData').value;
    
    selectAgencyNetwork(agency, selectNode, selectData);
    createTable(agency, cluster, selectData);
    return selectData;
  }

  function setMetricsThis(target){
    selectMetrics = document.getElementById('setMetricDraw').value;
    createBoxplot(agency, selectMetrics, checked);
    return selectMetrics;
  }

 // when selected
    function setDataAccessThis(target){
      //reset dropdown menus
      document.getElementById('setDataType').selectedIndex=0;
      document.getElementById('setDiscover').selectedIndex=0;      selectDiscover = "none";
      document.getElementById('setDiscoverType').selectedIndex=0;  selectDiscoverType = "none";
      document.getElementById('setAccess').selectedIndex=0;        selectAccess = "none";    
      document.getElementById('setAccessType').selectedIndex=0;    selectAccessType = "none";  
      document.getElementById('setFileType').selectedIndex=0;      selectFileType = "none";  
      document.getElementById('setMetadata').selectedIndex=0;      selectMetadata = "none";     
      document.getElementById('setDataDef').selectedIndex=0;       selectDataDef = "none";   
      document.getElementById('setAvailable').selectedIndex=0;     selectLength = "none";                             
      
      selectHub = document.getElementById('setDataAccess').value; //getElementById did not work, but Name does work
      drawDataNetwork(agency, selectHub, selectDiscover, selectDiscoverType, selectAccess, selectAccessType, selectFileType, selectDataDef,
        selectMetadata, selectTimely, selectLength);
      return selectHub;
    }

    function setDataTypeThis(target){
      //reset dropdown menus
      document.getElementById('setDataAccess').selectedIndex=0;
      document.getElementById('setDiscover').selectedIndex=0;      selectDiscover = "none";
      document.getElementById('setDiscoverType').selectedIndex=0;  selectDiscoverType = "none";
      document.getElementById('setAccess').selectedIndex=0;        selectAccess = "none";    
      document.getElementById('setAccessType').selectedIndex=0;    selectAccessType = "none"; 
      document.getElementById('setFileType').selectedIndex=0;      selectFileType = "none";           
      document.getElementById('setMetadata').selectedIndex=0;      selectMetadata = "none";          
      document.getElementById('setTimely').selectedIndex=0;        selectTimely = "none"; 
      document.getElementById('setDataDef').selectedIndex=0;       selectDataDef = "none"; 
      document.getElementById('setAvailable').selectedIndex=0;     selectLength = "none";                             
      
      selectHub = document.getElementById('setDataType').value; //getElementById did not work, but Name does work
      drawDataNetwork(agency, selectHub, selectDiscover, selectDiscoverType, selectAccess, selectAccessType, selectFileType, selectDataDef,
        selectMetadata, selectTimely, selectLength);
      return selectHub;
    }

    function setDiscoverThis(target){
      //reset dropdown menus
      document.getElementById('setDataAccess').selectedIndex=0;      selectHub = "none";
      document.getElementById('setDataType').selectedIndex=0;
      document.getElementById('setDiscoverType').selectedIndex=0;    selectDiscoverType = "none";      
      document.getElementById('setAccess').selectedIndex=0;        selectAccess = "none";    
      document.getElementById('setAccessType').selectedIndex=0;    selectAccessType = "none";    
      document.getElementById('setFileType').selectedIndex=0;      selectFileType = "none"; 
      document.getElementById('setMetadata').selectedIndex=0;      selectMetadata = "none";          
      document.getElementById('setTimely').selectedIndex=0;        selectTimely = "none";
      document.getElementById('setDataDef').selectedIndex=0;       selectDataDef = "none";  
      document.getElementById('setAvailable').selectedIndex=0;     selectLength = "none";                             

      selectDiscover = document.getElementById('setDiscover').value; //getElementById did not work, but Name does work
      drawDataNetwork(agency, selectHub, selectDiscover, selectDiscoverType, selectAccess, selectAccessType, selectFileType, selectDataDef,
        selectMetadata, selectTimely, selectLength);
      return selectDiscover;
    }

    function setDiscoverTypeThis(target){
      //reset dropdown menus and resent values
      document.getElementById('setDataAccess').selectedIndex=0;    selectHub = "none";
      document.getElementById('setDataType').selectedIndex=0;
      document.getElementById('setDiscover').selectedIndex=0;      selectDiscover = "none"; 
      document.getElementById('setAccess').selectedIndex=0;        selectAccess = "none";        
      document.getElementById('setAccessType').selectedIndex=0;    selectAccessType = "none";
      document.getElementById('setFileType').selectedIndex=0;      selectFileType = "none";   
      document.getElementById('setMetadata').selectedIndex=0;      selectMetadata = "none";     
      document.getElementById('setTimely').selectedIndex=0;        selectTimely = "none";        
      document.getElementById('setDataDef').selectedIndex=0;       selectDataDef = "none"; 
      document.getElementById('setAvailable').selectedIndex=0;     selectLength = "none";                             

      selectDiscoverType = document.getElementById('setDiscoverType').value; //getElementById did not work, but Name does work
      drawDataNetwork(agency, selectHub, selectDiscover, selectDiscoverType, selectAccess, selectAccessType, selectFileType, selectDataDef,
        selectMetadata, selectTimely, selectLength);
      return selectDiscoverType;
    }

    function setAccessThis(target){
      //reset dropdown menus
      document.getElementById('setDataAccess').selectedIndex=0;    selectHub = "none";
      document.getElementById('setDataType').selectedIndex=0;
      document.getElementById('setDiscover').selectedIndex=0;      selectDiscover = "none";
      document.getElementById('setDiscoverType').selectedIndex=0;  selectDiscoverType = "none";
      document.getElementById('setAccessType').selectedIndex=0;    selectAccessType = "none";
      document.getElementById('setFileType').selectedIndex=0;      selectFileType = "none";    
      document.getElementById('setMetadata').selectedIndex=0;      selectMetadata = "none";    
      document.getElementById('setTimely').selectedIndex=0;        selectTimely = "none";    
      document.getElementById('setDataDef').selectedIndex=0;       selectDataDef = "none";   
      document.getElementById('setAvailable').selectedIndex=0;     selectLength = "none";                             

      selectAccess = document.getElementById('setAccess').value; //getElementById did not work, but Name does work
      drawDataNetwork(agency, selectHub, selectDiscover, selectDiscoverType, selectAccess, selectAccessType, selectFileType, selectDataDef,
        selectMetadata, selectTimely, selectLength);
      return selectAccess;
    }

    function setAccessTypeThis(target){
      //reset dropdown menus
      document.getElementById('setDataAccess').selectedIndex=0;    selectHub = "none";
      document.getElementById('setDataType').selectedIndex=0;
      document.getElementById('setDiscover').selectedIndex=0;      selectDiscover = "none";
      document.getElementById('setDiscoverType').selectedIndex=0;  selectDiscoverType = "none";
      document.getElementById('setAccess').selectedIndex=0;        selectAccess = "none";        
      document.getElementById('setFileType').selectedIndex=0;      selectFileType = "none";      
      document.getElementById('setMetadata').selectedIndex=0;      selectMetadata = "none";          
      document.getElementById('setTimely').selectedIndex=0;        selectTimely = "none"; 
      document.getElementById('setDataDef').selectedIndex=0;       selectDataDef = "none";
      document.getElementById('setAvailable').selectedIndex=0;     selectLength = "none";                             

      selectAccessType = document.getElementById('setAccessType').value; //getElementById did not work, but Name does work
      drawDataNetwork(agency, selectHub, selectDiscover, selectDiscoverType, selectAccess, selectAccessType, selectFileType, selectDataDef,
        selectMetadata, selectTimely, selectLength);
      return selectAccessType;
    }

    function setFileTypeThis(target){
      //reset dropdown menus
      document.getElementById('setDataAccess').selectedIndex=0;    selectHub = "none";
      document.getElementById('setDataType').selectedIndex=0;
      document.getElementById('setDiscover').selectedIndex=0;      selectDiscover = "none";
      document.getElementById('setDiscoverType').selectedIndex=0;  selectDiscoverType = "none";
      document.getElementById('setAccess').selectedIndex=0;        selectAccess = "none"; 
      document.getElementById('setAccessType').selectedIndex=0;    selectAccessType = "none";    
      document.getElementById('setMetadata').selectedIndex=0;      selectMetadata = "none";           
      document.getElementById('setTimely').selectedIndex=0;        selectTimely = "none";   
      document.getElementById('setDataDef').selectedIndex=0;       selectDataDef = "none";
      document.getElementById('setAvailable').selectedIndex=0;     selectLength = "none";                             

      selectFileType = document.getElementById('setFileType').value; //getElementById did not work, but Name does work
      drawDataNetwork(agency, selectHub, selectDiscover, selectDiscoverType, selectAccess, selectAccessType, selectFileType, selectDataDef,
        selectMetadata, selectTimely, selectLength);
      return selectFileType;
    }

    function setMetadataThis(target){
      //reset dropdown menus
      document.getElementById('setDataAccess').selectedIndex=0;    selectHub = "none";
      document.getElementById('setDataType').selectedIndex=0;
      document.getElementById('setDiscover').selectedIndex=0;      selectDiscover = "none";
      document.getElementById('setDiscoverType').selectedIndex=0;  selectDiscoverType = "none";
      document.getElementById('setAccess').selectedIndex=0;        selectAccess = "none"; 
      document.getElementById('setAccessType').selectedIndex=0;    selectAccessType = "none";   
      document.getElementById('setFileType').selectedIndex=0;      selectFileType = "none";            
      document.getElementById('setTimely').selectedIndex=0;        selectTimely = "none";  
      document.getElementById('setDataDef').selectedIndex=0;       selectDataDef = "none";  
      document.getElementById('setAvailable').selectedIndex=0;     selectLength = "none";                             

      selectMetadata = document.getElementById('setMetadata').value; //getElementById did not work, but Name does work
      drawDataNetwork(agency, selectHub, selectDiscover, selectDiscoverType, selectAccess, selectAccessType, selectFileType, selectDataDef,
        selectMetadata, selectTimely, selectLength);
      
      return selectMetadata;
    }

    function setDataDefThis(target){
      //reset dropdown menus
      document.getElementById('setDataAccess').selectedIndex=0;    selectHub = "none";
      document.getElementById('setDataType').selectedIndex=0;
      document.getElementById('setDiscover').selectedIndex=0;      selectDiscover = "none";
      document.getElementById('setDiscoverType').selectedIndex=0;  selectDiscoverType = "none";
      document.getElementById('setAccess').selectedIndex=0;        selectAccess = "none"; 
      document.getElementById('setAccessType').selectedIndex=0;    selectAccessType = "none";   
      document.getElementById('setFileType').selectedIndex=0;      selectFileType = "none";            
      document.getElementById('setTimely').selectedIndex=0;        selectTimely = "none"; 
      document.getElementById('setMetadata').selectedIndex=0;      selectMetadata = "none"; 
      document.getElementById('setAvailable').selectedIndex=0;     selectLength = "none";                             

      selectDataDef = document.getElementById('setDataDef').value; //getElementById did not work, but Name does work
      drawDataNetwork(agency, selectHub, selectDiscover, selectDiscoverType, selectAccess, selectAccessType, selectFileType, selectDataDef,
        selectMetadata, selectTimely, selectLength);
      //console.log(selectDataDef)
      return selectDataDef;
    }

    function setTimelyThis(target){
      //reset dropdown menus
      document.getElementById('setDataAccess').selectedIndex=0;    selectHub = "none";
      document.getElementById('setDataType').selectedIndex=0;
      document.getElementById('setDiscover').selectedIndex=0;      selectDiscover = "none";
      document.getElementById('setDiscoverType').selectedIndex=0;  selectDiscoverType = "none";
      document.getElementById('setAccess').selectedIndex=0;        selectAccess = "none"; 
      document.getElementById('setAccessType').selectedIndex=0;    selectAccessType = "none";   
      document.getElementById('setFileType').selectedIndex=0;      selectFileType = "none";    
      document.getElementById('setMetadata').selectedIndex=0;      selectMetadata = "none";
      document.getElementById('setDataDef').selectedIndex=0;       selectDataDef = "none";                             
      document.getElementById('setAvailable').selectedIndex=0;     selectLength = "none";                             

      selectTimely = document.getElementById('setTimely').value; //getElementById did not work, but Name does work
      drawDataNetwork(agency, selectHub, selectDiscover, selectDiscoverType, selectAccess, selectAccessType, selectFileType, selectDataDef,
        selectMetadata, selectTimely, selectLength);
      return selectTimely;
    }

    function setAvailableThis(target){
      //reset dropdown menus
      document.getElementById('setDataAccess').selectedIndex=0;    selectHub = "none";
      document.getElementById('setDataType').selectedIndex=0;
      document.getElementById('setDiscover').selectedIndex=0;      selectDiscover = "none";
      document.getElementById('setDiscoverType').selectedIndex=0;  selectDiscoverType = "none";
      document.getElementById('setAccess').selectedIndex=0;        selectAccess = "none"; 
      document.getElementById('setAccessType').selectedIndex=0;    selectAccessType = "none";   
      document.getElementById('setFileType').selectedIndex=0;      selectFileType = "none";    
      document.getElementById('setMetadata').selectedIndex=0;      selectMetadata = "none";
      document.getElementById('setDataDef').selectedIndex=0;       selectDataDef = "none"; 
      document.getElementById('setTimely').selectedIndex=0;        selectTimely = "none";                             

      selectLength = document.getElementById('setAvailable').value; //getElementById did not work, but Name does work
      drawDataNetwork(agency, selectHub, selectDiscover, selectDiscoverType, selectAccess, selectAccessType, selectFileType, selectDataDef,
        selectMetadata, selectTimely, selectLength);
      return selectLength;
    }

  //when selection is made
  function setPublicAgencyThis(target){
    //console.log(agency)
    agency = document.getElementById('setPublicAgency').value; //getElementById did not work, but Name does work

    var agencyInventory;
    var dateInventory;
    if (agency === "federal" | agency==="ca" | agency=== "nc" | agency==="tx") { dateInventory = "(as of Nov 2018)"; }
    if (agency === "nm") { dateInventory = "(as of Aug 2019)"; }
    if (agency === "ut" | agency==="az" | agency=== "wy" | agency==="nv" | agency==="id" | agency==="co") { dateInventory = "(as of May 2020)"; }
    if (agency === "or" | agency==="wa") { dateInventory = "(as of Aug 2020)"; }

    if (agency === "federal") { agencyInventory = "Federal"; }
    if (agency === "az") { agencyInventory = "Arizona"; }
    if (agency === "ca") { agencyInventory = "California"; }
    if (agency === "co") { agencyInventory = "Colorado"; }
    if (agency === "nm") { agencyInventory = "New Mexico"; }
    if (agency === "nc") { agencyInventory = "North Carolina"; }
    if (agency === "or") { agencyInventory = "Oregon"; }
    if (agency === "tx") { agencyInventory = "Texas"; }
    if (agency === "ut") { agencyInventory = "Utah"; }
    if (agency === "wy") { agencyInventory = "Wyoming"; }

    
    document.getElementById("selectedAgencyText").innerHTML="";
    var title = document.getElementById("selectedAgencyText");
    title.innerHTML = "<h2>Current Inventory Selected: <span style='color: #008078;'><strong>" + agencyInventory + " </strong>" + dateInventory +"</span></h2>";

    //set metrics back to original
    document.getElementById('setAgency').selectedIndex=0;          selectNode = "none"; 
    document.getElementById('setData').selectedIndex=0;            selectData = "none";
    document.getElementById('setDataAccess').selectedIndex=0;      selectHub = "none";
    document.getElementById('setDataType').selectedIndex=0;      
    document.getElementById('setDiscover').selectedIndex=0;      selectDiscover = "none";
    document.getElementById('setDiscoverType').selectedIndex=0;  selectDiscoverType = "none";
    document.getElementById('setAccess').selectedIndex=0;        selectAccess = "none"; 
    document.getElementById('setAccessType').selectedIndex=0;    selectAccessType = "none";   
    document.getElementById('setFileType').selectedIndex=0;      selectFileType = "none";    
    document.getElementById('setMetadata').selectedIndex=0;      selectMetadata = "none";  
    document.getElementById('setTimely').selectedIndex=0;        selectTimely = "none";  

    return agency;
  }

