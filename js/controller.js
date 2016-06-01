var controllers = function(usgs, model, view){
  
    // 2.sendRequest
    usgs.sendRequest();
    // 3.populateSeries with library's results as input. called in sendRequest .done
    
    // 4.push populateSeries arrays to model.sites array
    model.addFlowSeries();
    
    //5.draw the graph with data from the model
    view.drawGraph(model);
};

/////[[[[[[[[[[   ON LOAD    ]]]]]]]]]]]]]]////////////////

$(document).ready(function(){
    var model = new app.models();
    //check that model has flowSeries
    console.log(model);
    var view = new app.views();
    //check that view has flowSeries
    console.log(view);
    var usgs = new app.usgs();
    var controller = new controllers(usgs, model, view); //does creating the instance of the controller call the functions invoked in that object type?

    //getLocation method will need to be called from controller
    //1. getLocation calls writeRequest and updates usgs.request
    if (navigator.geolocation) {
        //return the geolocation object with writeRequest as a callback
        navigator.geolocation.getCurrentPosition(function(position){
            app.usgs.writeRequest(position);
        });
    }
    else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }

});
