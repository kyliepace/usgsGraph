/*
app.model() = require("./model");
app.views() = require("./view");
app.usgs() = require("./usgs");*/


var app = {};
app.controller = function(model, view){
    this.model = model;
    this.view = view;
    this.view.model = model;
    this.model.callback = view.drawGraph.bind(this.view);
    //this.model.callback = this.view.drawGraph.bind(this.view);
};

app.controller.prototype.run = function(){ 
    //get the coordinates, sends the request, gets data, and populates the series array
var that = this;
    if (navigator.geolocation) {
        //return the geolocation object with writeRequest as a callback
        navigator.geolocation.getCurrentPosition(function(position){
            that.model.getData(position);
        });
    }
    else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
};

/////[[[[[[[[[[   ON LOAD    ]]]]]]]]]]]]]]////////////////

$(document).ready(function(){
    var model = new app.model();
    //why does it say this is not a constructor??
    var view = new app.views();
    
    var controller = new app.controller(model, view); 
    controller.run();
});
