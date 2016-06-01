var models=function(){
  this.sites=[];
};

//give sites object an addFlowSeries method that adds each flowSeries to the sites array
models.prototype.addFlowSeries = function(views){
  this.sites.push(views.flowSeries);
  //need to use this.sites so that correct object gets updated
};
