<template>
  <div id="app">
    <h1>Chart your local streams</h1>
    <State @sendState='sendRequest'></State>

    <div v-if='loading'>
      <icon scale='2' name="refresh" spin></icon>
    </div>

    <Chart v-if='streamResults.length > 0' :streamResults='streamResults'></Chart>
  </div>
</template>

<script>
import State from './components/State.vue'
import Chart from './components/Chart.vue'
import 'vue-awesome/icons/refresh'

export default {
  name: 'app',
  components: {
    State, 
    Chart
  },
  data(){
    return {
      streamResults: [],
      loading: false
    }
  },
  methods: {
    sendRequest(location){
      // toggle loader
      this.loading = true;

      // get state data from usgs
      console.log('state: ' + location);

      var url = `https://waterservices.usgs.gov/nwis/dv/?format=json&stateCd=${location}&period=P10D&siteType=ST&siteStatus=active`;

      var that = this;

      fetch(url).then( res => {
          return res.json()
        }
      ).then(data => {
          this.streamResults = data.value.timeSeries;
          this.loading = false; // toggle loader
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
