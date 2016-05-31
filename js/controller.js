var controllers = function(modelObject, viewObject){
    // 1.getLocation
    //Q: why do I have to write .prototype?
    usgs.getLocation();
    
    // 2.sendRequest
    usgs.sendRequest(usgs.request);
    
    // 3.populateSeries with library's results as input (done in sendRequest)
    
    // 4.make flowSeries from populated array
    var newFlow = viewObject.makeFlowSeries(modelObject.xData, modelObject.gageName, modelObject.yData);
    
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
