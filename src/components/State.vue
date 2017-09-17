<template>
	<div>
		<input type='text' 
		v-if='notSafari'
		list='stateList' name='stateList' 
		v-model='selectedState' placeholder='state'>
		<datalist id='stateList'>
			<select v-model='selectedState'>
	 			<option v-for='state in states' :value='state.abbreviation' >{{state.name}}</option>
	 		</select>
	 	</datalist>
	</div>
</template>

<script>
const browser = require('detect-browser');

export default{
	name: 'State',
	methods: {
		sendState(){
			console.log(this.selectedState);
			this.$emit('sendState', this.selectedState);
		}
	},
	watch: {
		selectedState(){
		
			if(this.selectedState.length == 2){
				//send state value to app
				this.sendState();
			}
			
		}
	},
	mounted(){
		if (browser && browser.name) {
		  console.log(browser.name);
		  console.log(browser.version);
		  if(browser.name == 'safari'){
		  	this.notSafari = false;
		  }
		}
	},
	data(){
		return {
		notSafari: true,
		selectedState: '',
		states: [
		  {
		    "name": "Alabama",
		    "abbreviation": "AL"
		  },
		  {
		    "name": "Alaska",
		    "abbreviation": "AK"
		  },
		  {
		    "name": "Arizona",
		    "abbreviation": "AZ"
		  },
		  {
		    "name": "Arkansas",
		    "abbreviation": "AR"
		  },
		  {
		    "name": "California",
		    "abbreviation": "CA"
		  },
		  {
		    "name": "Colorado",
		    "abbreviation": "CO"
		  },
		  {
		    "name": "Connecticut",
		    "abbreviation": "CT"
		  },
		  {
		    "name": "Delaware",
		    "abbreviation": "DE"
		  },
		  {
		    "name": "District Of Columbia",
		    "abbreviation": "DC"
		  },
		  {
		    "name": "Florida",
		    "abbreviation": "FL"
		  },
		  {
		    "name": "Georgia",
		    "abbreviation": "GA"
		  },
		  {
		    "name": "Hawaii",
		    "abbreviation": "HI"
		  },
		  {
		    "name": "Idaho",
		    "abbreviation": "ID"
		  },
		  {
		    "name": "Illinois",
		    "abbreviation": "IL"
		  },
		  {
		    "name": "Indiana",
		    "abbreviation": "IN"
		  },
		  {
		    "name": "Iowa",
		    "abbreviation": "IA"
		  },
		  {
		    "name": "Kansas",
		    "abbreviation": "KS"
		  },
		  {
		    "name": "Kentucky",
		    "abbreviation": "KY"
		  },
		  {
		    "name": "Louisiana",
		    "abbreviation": "LA"
		  },
		  {
		    "name": "Maine",
		    "abbreviation": "ME"
		  },
		  {
		    "name": "Maryland",
		    "abbreviation": "MD"
		  },
		  {
		    "name": "Massachusetts",
		    "abbreviation": "MA"
		  },
		  {
		    "name": "Michigan",
		    "abbreviation": "MI"
		  },
		  {
		    "name": "Minnesota",
		    "abbreviation": "MN"
		  },
		  {
		    "name": "Mississippi",
		    "abbreviation": "MS"
		  },
		  {
		    "name": "Missouri",
		    "abbreviation": "MO"
		  },
		  {
		    "name": "Montana",
		    "abbreviation": "MT"
		  },
		  {
		    "name": "Nebraska",
		    "abbreviation": "NE"
		  },
		  {
		    "name": "Nevada",
		    "abbreviation": "NV"
		  },
		  {
		    "name": "New Hampshire",
		    "abbreviation": "NH"
		  },
		  {
		    "name": "New Jersey",
		    "abbreviation": "NJ"
		  },
		  {
		    "name": "New Mexico",
		    "abbreviation": "NM"
		  },
		  {
		    "name": "New York",
		    "abbreviation": "NY"
		  },
		  {
		    "name": "North Carolina",
		    "abbreviation": "NC"
		  },
		  {
		    "name": "North Dakota",
		    "abbreviation": "ND"
		  },
		  {
		    "name": "Ohio",
		    "abbreviation": "OH"
		  },
		  {
		    "name": "Oklahoma",
		    "abbreviation": "OK"
		  },
		  {
		    "name": "Oregon",
		    "abbreviation": "OR"
		  },
		  {
		    "name": "Palau",
		    "abbreviation": "PW"
		  },
		  {
		    "name": "Pennsylvania",
		    "abbreviation": "PA"
		  },
		  {
		    "name": "Rhode Island",
		    "abbreviation": "RI"
		  },
		  {
		    "name": "South Carolina",
		    "abbreviation": "SC"
		  },
		  {
		    "name": "South Dakota",
		    "abbreviation": "SD"
		  },
		  {
		    "name": "Tennessee",
		    "abbreviation": "TN"
		  },
		  {
		    "name": "Texas",
		    "abbreviation": "TX"
		  },
		  {
		    "name": "Utah",
		    "abbreviation": "UT"
		  },
		  {
		    "name": "Vermont",
		    "abbreviation": "VT"
		  },
		  {
		    "name": "Virginia",
		    "abbreviation": "VA"
		  },
		  {
		    "name": "Washington",
		    "abbreviation": "WA"
		  },
		  {
		    "name": "West Virginia",
		    "abbreviation": "WV"
		  },
		  {
		    "name": "Wisconsin",
		    "abbreviation": "WI"
		  },
		  {
		    "name": "Wyoming",
		    "abbreviation": "WY"
		  }
		]
		}
	}
}
</script>

<style>
input{
	width: 200px;
	height: 35px;
	font-size: 1.3em;
	padding: 2px 5px;
	border: none;
	border-radius: 5px;
	opacity: 0.8;
}

</style>