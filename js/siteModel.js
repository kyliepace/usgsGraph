var siteModel=function(){
  this.sites=[];
};


//give sites object an addFlowSeries method that adds each flowSeries to the sites array
siteModel.prototype.addFlowSeries = function(flowSeries){
  this.sites.push(flowSeries);
};
