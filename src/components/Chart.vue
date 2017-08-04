<template>
	<div>
		<h4>{{name}}</h4>
		<line-chart :data="data"></line-chart>
	</div>
</template>

<script>


export default {
	name: 'Chart',
	props: ['streamResults'],
	data(){
		return {
			counter: 0
		}
	},
	computed: {
		data(){
			var results = this.streamResults[this.counter].values[0].value;
			console.log(this.streamResults[this.counter]);
			var data = [];
			for(var i = 0; i < results.length; i++) {
				data.push([results[i].dateTime, results[i].value]);
			}
			return data;
		},
		name(){
			return this.streamResults[this.counter].sourceInfo.siteName
		}
	},
	methods: {

	}
};

</script>