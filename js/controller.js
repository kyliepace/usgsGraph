var controllers = function(model, view){
    // 1.getLocation
    //Q: why do I have to write .prototype?
    usgs.prototype.getLocation();
    
    // 2.sendRequest
    var usgsResults = usgs.prototype.sendRequest(usgs.request);
    
    // 3.populateSeries with library's results as input
    model.populateSeries(usgsResults);
    
    // 4.make flowSeries from populated array
    var newFlow = view.makeFlowSeries(model.xData, model.gageName, model.yData);
    
    // 5.add the new flowSeries to the sites array
    model.addFlowSeries(newFlow);
    
    //6.draw the graph with data from the model
    view.drawGraph(model.numberOfSites, model.sites);
};

/////[[[[[[[[[[   ON LOAD    ]]]]]]]]]]]]]]////////////////

$(document).ready(function(){
    var model = new siteModel();
    var view = new views();
    var controller = new controllers(model, view); //does creating the instance of the controller call the functions invoked in that object type?
})
