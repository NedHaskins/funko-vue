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