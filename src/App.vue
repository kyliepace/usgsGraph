<template>
  <div id="app">
    <h1>Chart your local streams</h1>
    <State @sendState='sendRequest'></State>
    <Chart :streamResults='streamResults'></Chart>
  </div>
</template>

<script>
import State from './components/State.vue'
import Chart from './components/Chart.vue'


export default {
  name: 'app',
  components: {
    State, 
    Chart
  },
  data(){
    return {
      streamResults: {}
    }
  },
  methods: {
    sendRequest(state){

      var data = {
        format: "json",
        stateCd: state,
        period: "P5D",
        parameterCD: "00060",
        siteType: "ST",
        siteStatus: "active",
      };

      var url = `https://waterservices.usgs.gov/nwis/dv/?format=json&stateCd=${state}&siteType=ST&siteStatus=all`;

      var myRequest = new Request(url, {
        method: 'GET', 
        headers: new Headers(),
        body: data,
        format: 'json'
      });

      var that = this;

      fetch(url, myRequest).then( res => {
          return res.json()
        }
      ).then(data => {
          this.streamResults = data.value;
      }).catch(err => {
        console.log(err);
      });

      
    }
  }
}
</script>

<style>
body{
  margin: 0;
}
#app {
  font-family: 'Hind', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100vw;
  height: 100%;
  min-height: 100vh;
  color: #2c3e50;
  background: #007991; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #007991, #78ffd6); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #007991, #78ffd6); 
}
</style>

<style scoped>
h1{
  margin: 0;
  padding-top: 20vh;
  padding-bottom: 40px;
}
</style>
