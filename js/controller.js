app.controllers = function(usgs, model, view){

    // 2.populateSeries with library's results as input when sendRequest is complete
    model.populateSeries();
    
    // 4.push populateSeries arrays to model.sites array
    model.addFlowSeries();
    
    //5.draw the graph with data from the model
    view.drawGraph(model);
};
//1.
app.controllers.prototype.run = function(position){
    usgs.writeRequest(position);
    usgs.sendRequest()
        .done(function(results){
      this.populateSeries(results);
    }) 
    .fail(function(jqXHR, error){
      console.log("error sending request");
    }) 
};

/////[[[[[[[[[[   ON LOAD    ]]]]]]]]]]]]]]////////////////

$(document).ready(function(){
    var model = new app.models();
    //check that model has flowSeries
    console.log(model);
    var view = new app.views();
    //check that view has flowSeries
    var usgs = new app.usgs();
    console.log(view);
    var controller = new app.controllers(model, view); //does creating the instance of the controller call the functions invoked in that object type?

    //getLocation method will need to be called from controller
    //1. getLocation calls writeRequest and updates usgs.request
    if (navigator.geolocation) {
        //return the geolocation object with writeRequest as a callback
        navigator.geolocation.getCurrentPosition(function(position){
            controller.run(position);
        });
    }
    else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }

});
