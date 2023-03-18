<script setup>
	//NPM packages
	import { v4 as uuidv4 } from 'uuid';

	//Vue imports
	import { ref, reactive } from 'vue';
	import { RouterLink } from 'vue-router';

	//Vuefire / Firestore imports
	import { doc, collection, addDoc, deleteDoc, getDocs } from 'firebase/firestore';
	import { useFirestore } from 'vuefire';

	//Pinia imports
	import { useCartService } from '@/services/CartService';
	import { useUserService } from '@/services/UserService';

	//Icons
	import VisaIcon from '@/components/icons/payment-icons/VisaIcon.vue';
	import MastercardIcon from '@/components/icons/payment-icons/MastercardIcon.vue';
	import PaypalIcon from '@/components/icons/payment-icons/PaypalIcon.vue';
	import BitcoinIcon from '@/components/icons/payment-icons/BitcoinIcon.vue';
	import USPSIcon from '@/components/icons/shipping-icons/USPSIcon.vue';
	import FedexIcon from '@/components/icons/shipping-icons/FedexIcon.vue';
	import DHLIcon from '@/components/icons/shipping-icons/DHLIcon.vue';

	//Service variables
	const db = useFirestore();
	const cart = useCartService();
	const user = useUserService();

	let chosenPaymentMethod = ref(null);
	let chosenShippingMethod = ref(null);
	const checkoutForm = reactive({
		name: '',
		address: '',
		aptNo: '',
		city: '',
		state: '',
		zipCode: '',
	});

	async function placeOrder() {
		const docRef = await addDoc(collection(db, 'users', user.id, 'orders'), {
			name: checkoutForm.name,
			address: checkoutForm.address,
			aptNo: checkoutForm.aptNo,
			city: checkoutForm.city,
			state: checkoutForm.state,
			zipCode: checkoutForm.zipCode,
			itemsInOrder: cart.list, //maybe use cartGrouping here -- use a function to get this?
		});
		console.log('New order created with ID ', docRef.id);
		//the cart will need to be cleared after this
		const querySnapshot = await getDocs(collection(db, 'users', user.id, 'cart'));
		for (let item of querySnapshot.docs) {
			await deleteDoc(doc(db, 'users', user.id, 'cart', item.id));
		}
		console.log('Cart cleared successfully.');
	}

	//Function to place item order.

	//Create an item in the customer's orders colletion.

	//Each orders object will have:
</script>

<template>
	<checkout-modal>
		<h1>Checkout!</h1>
		<div>
			<!-- <pre>{{ cart.list }}</pre> -->
		</div>

		<form @submit.prevent="placeOrder()">
			<h2>Enter your address!</h2>
			<input-wrapper>
				<label for="name">Name</label>
				<input id="name" type="text" v-model="checkoutForm.name" />
			</input-wrapper>

			<input-wrapper>
				<label for="address">Address</label>
				<input id="address" type="text" v-model="checkoutForm.address" />
			</input-wrapper>

			<input-wrapper>
				<label for="apt-no">Apt. No.</label>
				<input id="apt-no" type="text" v-model="checkoutForm.aptNo" />
			</input-wrapper>

			<input-wrapper>
				<label for="city">City</label>
				<input id="city" type="text" v-model="checkoutForm.city" />
			</input-wrapper>

			<input-wrapper>
				<label for="state">State</label>
				<input id="state" type="text" v-model="checkoutForm.state" />
			</input-wrapper>

			<input-wrapper>
				<label for="zip-code">Zip Code</label>
				<input id="zip-code" type="number" v-model="checkoutForm.zipCode" />
			</input-wrapper>

			<h2>Enter your payment info!</h2>
			<ul class="payment-options">
				<li>
					<svg-wrapper>
						<VisaIcon />
					</svg-wrapper>
					<input-wrapper class="radio">
						<input type="radio" name="payment" id="visa" />
					</input-wrapper>
				</li>
				<li>
					<svg-wrapper>
						<MastercardIcon />
					</svg-wrapper>
					<input-wrapper class="radio">
						<input type="radio" name="payment" id="mastercard" />
					</input-wrapper>
				</li>
				<li>
					<svg-wrapper>
						<PaypalIcon />
					</svg-wrapper>
					<input-wrapper class="radio">
						<input type="radio" name="payment" id="paypal" />
					</input-wrapper>
				</li>
				<li>
					<svg-wrapper>
						<BitcoinIcon />
					</svg-wrapper>
					<input-wrapper class="radio">
						<input type="radio" name="payment" id="bitcoin" />
					</input-wrapper>
				</li>
			</ul>
			<!--The following three blocks need to be able to read the current radio value, which means there needs to be something reactive watching the radio values.-->
			<div class="credit-card-info">
				<input-wrapper>
					<label for="card-number">Card Number</label>
					<input id="card-number" type="number" />
				</input-wrapper>
				<input-wrapper>
					<label for="expiration-date">Expiration Date</label>
					<input id="expiration-date" type="date" />
				</input-wrapper>
				<input-wrapper>
					<label for="card-number">Card Number</label>
					<input id="card-number" type="number" />
				</input-wrapper>
			</div>

			<div class="paypal-email">
				<input-wrapper>
					<label for="card-number">Email Address</label>
					<input id="card-number" type="number" />
				</input-wrapper>
			</div>

			<div class="bitcoin-info">
				<input-wrapper>
					<label for="private-key">Private Key</label>
					<input id="private-key" type="text" />
				</input-wrapper>
			</div>

			<h2>Enter your shipping info!</h2>
			<ul class="payment-options">
				<li>
					<svg-wrapper>
						<FedexIcon />
					</svg-wrapper>
					<input-wrapper class="radio">
						<input type="radio" name="shipping" id="fedex" />
					</input-wrapper>
				</li>
				<li>
					<svg-wrapper>
						<DHLIcon />
					</svg-wrapper>
					<input-wrapper class="radio">
						<input type="radio" name="shipping" id="dhl" />
					</input-wrapper>
				</li>
				<li>
					<svg-wrapper>
						<USPSIcon />
					</svg-wrapper>
					<input-wrapper class="radio">
						<input type="radio" name="shipping" id="dhl" />
					</input-wrapper>
				</li>
			</ul>

			<div class="shipping-speed">
				<h3>Choose your shipping speed.</h3>
				<select>
					<option value="standard">Standard - $5.99</option>
					<option value="express">Express - $12.99</option>
					<option value="overnight">Overnight - $24.99</option>
				</select>
			</div>

			<button-wrapper>
				<button type="button">
					<RouterLink @click="cart.toggleCheckout()" to="/shopping-cart">Back to cart</RouterLink>
				</button>

				<button type="submit">Place order</button>
			</button-wrapper>
		</form>
		<output></output>
	</checkout-modal>
</template>

<style lang="scss" scoped>
	output {
		border: 3px solid lime;
	}
	@media (prefers-color-scheme: dark) {
		checkout-modal {
			color: black;
		}
	}
	svg-wrapper,
	form {
		display: block;
	}

	input-wrapper {
		display: block;
	}

	button-wrapper {
		display: flex;
		flex-direction: row;
	}

	button-wrapper {
		justify-content: center;
	}

	.payment-options {
		display: flex;
		flex-direction: row;

		li {
			display: flex;
			flex-direction: column;
			svg-wrapper {
				display: flex;
				flex-direction: row;
				align-items: center;
				width: 100%;
				flex: 1;
				svg {
					width: 120px;
					height: auto;
				}
			}
			input-wrapper {
				display: flex;
				flex-direction: row;
				justify-content: center;
			}
		}
	}

	h1 {
		font-family: 'Bangers';
	}

	checkout-modal {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		overflow: scroll;
	}
</style>
