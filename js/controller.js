var Model = require('./model.js');
var Views = require("./view.js");

var $ = require("jquery");

Controller = function(model, view){
    this.model = model;
    this.view = view;
    this.view.model = model;
    this.model.view = view;
    this.model.callback = view.drawGraph.bind(this.view);
};

Controller.prototype.run = function(){ 
    //get the coordinates, sends the request, gets data, and populates the series array
var that = this;
    if (navigator.geolocation) {
        that.view.showLoading();
        //return the geolocation object with writeRequest as a callback
        navigator.geolocation.getCurrentPosition(function(position){
            that.model.getData(position);
        });
    }
    else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
    that.view.changeSites();
};

/////[[[[[[[[[[   ON LOAD    ]]]]]]]]]]]]]]////////////////

$(document).ready(function(){
    var model = new Model();
    
    var view = new Views();
    
    var controller = new Controller(model, view); 
    controller.run();
});
