<script setup>
	import { reactive, computed } from 'vue';
	import { useShoppingCartStore } from '@/stores/shoppingCart';
	import ItemRow from './ItemRow.vue';

	const shoppingCart = useShoppingCartStore();

	defineProps({
		msg: {
			type: String,
			required: true,
		},
	});

	const values = reactive({
		items: [],
		item: {
			name: '',
			price: '',
		},
		amount: '',
		total: '',
		itemRow: '',
		output: '',
	});

	const total = computed(function () {
		let total = 0;
		shoppingCart.list.forEach(function (item) {
			total = total + Number(item.price);
		});
		return total;
	});

	function addItem() {
		const item = { name: values.item.name, price: values.item.price };
		values.items = [...values.items, item];
		//this can be written in one line using map?
		clearForm();
	}

	//grabbing the add() function from the store file
	function save() {
		//A new object has to be made to avoid pointing back to the dynamic store object
		const record = {
			name: values.item.name,
			price: values.item.price,
		};

		shoppingCart.add(record);
		clearForm();
	}

	function clearCart() {
		shoppingCart.list.length = 0;
	}

	function clearForm() {
		values.item.name = '';
		values.item.price = '';
	}
</script>

<template>
	<inner-column>
		<h1>point-of-sale</h1>
		<!-- 	<h3>by Ninja Ned</h3>
	<h4>{{ msg }}</h4> -->

		<!-- 	<nav>
		<RouterLink to="/">Home page!</RouterLink>
		<RouterLink to="/about">About page!</RouterLink>
		<RouterLink to="/test">Test!</RouterLink>
	</nav> -->

		<div class="item-info">
			<form>
				<input-wrapper>
					<label for="name">item</label>
					<input id="name" type="text" v-model="values.item.name" />
				</input-wrapper>
				<input-wrapper>
					<label for="cost">price</label>

					<input id="price" type="number" v-model="values.item.price" />
				</input-wrapper>
				<button-wrapper>
					<button @click.prevent="save">Add to cart</button>
					<button @click.prevent="clearCart">Clear cart</button>
				</button-wrapper>
			</form>
		</div>
		<!-- 	<div class="item-table">
		<table>
			<tbody>
				<tr v-for="thing in values.items">
					<ItemRow v-bind:item="thing" />
					^^^ item references the "item" in the reactive object
	</tr>
			</tbody>
		</table>
	</div> -->
		<div class="overflow-wrapper">
			<table class="item-list">
				<tbody>
					<tr v-for="item in shoppingCart.list">
						<td>{{ item.name }}</td>
						<td>{{ item.price }}</td>
					</tr>
				</tbody>
			</table>
		</div>

		<table class="item-total">
			<tbody>
				<tr>
					<td>Total</td>
					<td class="cost total">${{ total }}</td>
				</tr>
			</tbody>
		</table>
	</inner-column>
</template>

<style></style>
