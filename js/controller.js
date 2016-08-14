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
    var that = this;
    that.view.watchForm();
    
    that.view.changeSites();
};

/////[[[[[[[[[[   ON LOAD    ]]]]]]]]]]]]]]////////////////

$(document).ready(function(){
    var model = new Model();
    
    var view = new Views();
    
    var controller = new Controller(model, view); 
    controller.run();
});
