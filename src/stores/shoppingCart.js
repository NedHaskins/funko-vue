import { defineStore } from 'pinia';

export const useShoppingCartStore = defineStore('shoppingCart', function () {
	//Goals for this store:
	//list of items in cart
	//add, remove, add additional copies of, items

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
	}
})



// 	const list = reactive([]);

// 	//add an item to the cart
// 	function add(item) {
// 		list.push(item);
// 	}

// 	const getCount = computed(function () {
// 		return list.length;
// 	});

// 	return {
// 		list: list,
// 		add: add,
// 		getCount: getCount,
// 	};
// });
