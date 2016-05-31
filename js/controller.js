var controllers = function(modelObject, viewObject){
    // 1.getLocation
    //Q: why do I have to write .prototype if I use constructor function for usgs object?
    usgs.getLocation();
    //getLocation calls writeRequest and updates usgs.request
    
    // 2.sendRequest
    //is usgs.request being sent before the getLocation is complete?
    if (usgs.request.bBox!== ""){
        usgs.sendRequest(usgs.request);
    }
    
    // 3.populateSeries with library's results as input
    //this should be in sendRequest .done but I don't think it's working
    usgs.populateSeries();
    
    // 4.make flowSeries from populated array
    var newFlow = viewObject.makeFlowSeries(usgs.xData, usgs.gageName, usgs.yData);
    
    // 5.add the new flowSeries to the sites array
    modelObject.addFlowSeries(newFlow);
    
    //6.draw the graph with data from the model
    viewObject.drawGraph(modelObject.numberOfSites, modelObject.sites);
};

/////[[[[[[[[[[   ON LOAD    ]]]]]]]]]]]]]]////////////////

$(document).ready(function(){
    var model = new siteModel();
    var view = new views();
    var controller = new controllers(model, view); //does creating the instance of the controller call the functions invoked in that object type?
});
