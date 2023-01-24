import {defineStore} from 'pinia';

export const useNewPiniaCartStore = defineStore('useNewPiniaCart', {

	state: () => {
		return {
			list: []
		};
	},

	actions: {
		add(item) {
			list.push(item);
		},

		remove(userInput) {
			list = list.filter(item => item !== userInput)
			console.log(list);
		}	

		getCount(list) {
			return list.length;
		}
	}
}


	state: () => {
		if(localStorage.getItem('shoppingCartData')) {
			return JSON.parse(localStorage.getItem('shoppingCartData'));
		}
		return {
			list: []
		}
	},

	actions: {
		add(item) {
			this.list.push(item);
		},

		remove(userInput) {
			this.list = this.list.filter(item => item !== userInput)
			console.log(this.list);
		},	

		getCount(list) {
			return this.list.length;
		},

		clear() {
			this.list = [];
		}
	},

	getters:
})