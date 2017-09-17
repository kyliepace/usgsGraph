<template>
	<div style='padding: 20px 10vw;'>
		<div style='display: flex; margin: 10px auto; text-align: center; width: 80%; justify-content: space-between; align-content: center; align-items: center;'>
			<div class='icon' @click='counterLess' >
				<icon name="chevron-left" scale='2'></icon>
			</div>
			<h4>{{name}}</h4>
			<!-- <input type='text' list='streamList' name='streamList'
			 :placeholder='name' style='width: 70%; min-width: 200px;'>
			<datalist id='streamList'>
				<option v-for='stream in streamResults' :value='stream.sourceInfo.siteName'>
				</option>
			</datalist> -->

			<div class='icon' @click='counterMore' >
				<icon name='chevron-right' scale='2'></icon>
			</div>
		</div>
		<line-chart :data="data" :download='true' label='CFS' ytitle='Cubic feet per second (CFS)' ></line-chart>
	</div>
</template>

<script>
import 'vue-awesome/icons/chevron-right'
import 'vue-awesome/icons/chevron-left'


export default {
	name: 'Chart',
	props: ['streamResults'],
	data(){
		return {
			counter: 0,
			lastCounter: ''
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
			console.log(this.counter);
			this.lastCounter = this.counter;
			this.counter = this.counter > 0 ? this.counter - 1 : this.streamResults.length - 1;
		},
		counterMore() {
			this.lastCounter = this.counter;
			this.counter = this.counter < this.streamResults.length - 1 ? this.counter + 1 : 0
		},
		checkCounters(){
			if(this.lastCounter < this.counter){
				this.counterMore();
			} else if(this.lastCounter > this.counter) {
				this.counterLess();
			}
			console.log(this.counter);
		}
	},
	watch: {
		data(){
			// if a blank array got passed to data, move on to the next result
			if(this.data.length < 1){
				console.log('data is empty');
				return this.checkCounters();
			}
		}
	}
};

</script>

<style>
.icon{
	cursor: pointer;
}
.icon:hover{
	color: white;
}
.icon:active{
	transform: scale(1.2)
}
.datalist{
	overflow-y: scroll;
}
</style> 
