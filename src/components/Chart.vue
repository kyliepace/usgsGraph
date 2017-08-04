<template>
	<div style='padding: 20px;'>
		<div style='display: flex; margin: auto; text-align: center; width: 100%; justify-content: space-around;'>
			<button @click='counterLess'>Prev</button>
			<h4>{{name}}</h4>
			<button @click='counterMore'>Next</button>
		</div>
		<line-chart :data="data" ></line-chart>
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
		counterLess() {
			this.counter = this.counter > 0 ? this.counter-- : this.streamResults.length - 1;
		},
		counterMore() {
			this.counter < this.streamResults.length ? this.counter ++ : 0
		}
	}
};

</script>