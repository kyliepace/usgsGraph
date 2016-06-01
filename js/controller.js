var controllers = function(modelObject, viewObject){
    // 1.getLocation
    //Q: why do I have to write .prototype if I use constructor function for usgs object?
    usgs.getLocation();
    //getLocation calls writeRequest and updates usgs.request
    
    // 2.sendRequest
    //is usgs.request being sent before the getLocation is complete? error message says that coordinate string length is zero
    usgs.sendRequest(usgs.request);

    //the if statement doesn't run sendRequest
    if (usgs.request.bBox!== ""){
        usgs.sendRequest(usgs.request);
    }
    
    // 3.populateSeries with library's results as input
    //usgs.populateSeries();
    
    // 4.make flowSeries from populated array
    var newFlow = viewObject.makeFlowSeries(usgs.results.xData, usgs.results.gageName, usgs.results.yData);
    
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
