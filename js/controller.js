var controllers = function(model, view){
    // 1.getLocation
    //Q: why do I have to write .prototype if I use constructor function for usgs object?
    usgs.getLocation();
    //getLocation calls writeRequest and updates usgs.request
    
    // 2.sendRequest
    if (usgs.request.bBox!== ""){
        usgs.sendRequest(usgs.request);
    }
    
    // 3.populateSeries with library's results as input. called in sendRequest .done
    
    // 4.make flowSeries from populated array
    view.makeFlowSeries(usgs.results.xData, usgs.results.gageName, usgs.results.yData);

    // 5.add the new flowSeries to the sites array
    model.addFlowSeries(view);
    
    //6.draw the graph with data from the model
    view.drawGraph(model);
};

/////[[[[[[[[[[   ON LOAD    ]]]]]]]]]]]]]]////////////////

$(document).ready(function(){
    var model = new models();
    //check that model has flowSeries
    console.log(model);
    var view = new views();
    //check that view has flowSeries
    console.log(view);
    var controller = new controllers(model, view); //does creating the instance of the controller call the functions invoked in that object type?
});
