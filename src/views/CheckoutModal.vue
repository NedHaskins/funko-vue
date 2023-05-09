<script setup>
	//NPM packages
	import { v4 as uuidv4 } from 'uuid';

	//Vue imports
	import { ref, reactive, computed } from 'vue';
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
		paymentMethod: '',
		email: '',
		privateKey: '',
		shippingMethod: '',
		shippingSpeed: '',
	});

	const isCard = computed(function () {
		return checkoutForm.paymentMethod == 'visa' || checkoutForm.paymentMethod == 'mastercard';
	});

	const isPaypal = computed(function () {
		return checkoutForm.paymentMethod == 'paypal';
	});

	const isBitcoin = computed(function () {
		return checkoutForm.paymentMethod == 'bitcoin';
	});

	function choosePaymentType(value) {
		//when the appropriate radio button is clickec, the variable is set to that particular payment method.  Console-log it to confirm.

		console.log('test');
	}

	async function placeOrder() {
		const docRef = await addDoc(collection(db, 'users', user.id, 'orders'), {
			name: checkoutForm.name,
			address: checkoutForm.address,
			aptNo: checkoutForm.aptNo,
			city: checkoutForm.city,
			state: checkoutForm.state,
			zipCode: checkoutForm.zipCode,
			paymentMethod: checkoutForm.paymentMethod,
			privateKey: checkoutForm.privateKey,
			shippingMethod: checkoutForm.shippingMethod,
			shippingSpeed: checkoutForm.shippingSpeed,
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
		<h2>{{ checkoutForm.paymentMethod }}</h2>
		<h2>{{ isCard }}</h2>
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
						<input
							@click="choosePaymentType()"
							type="radio"
							name="payment"
							id="visa"
							value="visa"
							v-model="checkoutForm.paymentMethod"
						/>
					</input-wrapper>
				</li>
				<li>
					<svg-wrapper>
						<MastercardIcon />
					</svg-wrapper>
					<input-wrapper class="radio">
						<input
							type="radio"
							name="payment"
							id="mastercard"
							value="mastercard"
							v-model="checkoutForm.paymentMethod"
						/>
					</input-wrapper>
				</li>
				<li>
					<svg-wrapper>
						<PaypalIcon />
					</svg-wrapper>
					<input-wrapper class="radio">
						<input type="radio" name="payment" id="paypal" value="paypal" v-model="checkoutForm.paymentMethod" />
					</input-wrapper>
				</li>
				<li>
					<svg-wrapper>
						<BitcoinIcon />
					</svg-wrapper>
					<input-wrapper class="radio">
						<input
							type="radio"
							name="payment"
							id="bitcoin"
							value="bitcoin"
							v-model="checkoutForm.paymentMethod"
						/>
					</input-wrapper>
				</li>
			</ul>
			<!--The following three blocks need to be able to read the current radio value, which means there needs to be something reactive watching the radio values.-->
			<div class="credit-card-info" v-if="isCard">
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

			<div class="paypal-email" v-if="isPaypal">
				<input-wrapper>
					<label for="card-number">Email Address</label>
					<input id="card-number" type="number" v-model="checkoutForm.email" />
				</input-wrapper>
			</div>

			<div class="bitcoin-info" v-if="isBitcoin">
				<input-wrapper>
					<label for="private-key">Private Key</label>
					<input id="private-key" type="text" v-model="checkoutForm.privateKey" />
				</input-wrapper>
			</div>

			<h2>Enter your shipping info!</h2>
			<ul class="shipping-options">
				<li>
					<svg-wrapper>
						<FedexIcon />
					</svg-wrapper>
					<input-wrapper class="radio">
						<input type="radio" name="shipping" value="fedex" v-model="checkoutForm.shippingMethod" />
					</input-wrapper>
				</li>
				<li>
					<svg-wrapper>
						<DHLIcon />
					</svg-wrapper>
					<input-wrapper class="radio">
						<input type="radio" name="shipping" value="dhl" v-model="checkoutForm.shippingMethod" />
					</input-wrapper>
				</li>
				<li>
					<svg-wrapper>
						<USPSIcon />
					</svg-wrapper>
					<input-wrapper class="radio">
						<input type="radio" name="shipping" value="dhl" v-model="checkoutForm.shippingMethod" />
					</input-wrapper>
				</li>
			</ul>

			<div class="shipping-speed">
				<h3>Choose your shipping speed.</h3>
				<select v-model="checkoutForm.shippingSpeed">
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
	checkout-modal {
		display: flex;
		flex-direction: column;
		overflow: auto;
		background-color: white;
		padding: 30px;
		height: 88%;

		input-wrapper {
			display: flex;
			flex-direction: column;
		}
	}
	output {
		border: 3px solid lime;
	}

	form {
		h2,
		h3 {
			margin-top: 20px;
		}

		label {
			margin-top: 11px;
			font-size: 18px;
		}

		input {
			margin-top: 5px;
			font-size: 24px;
			border: 1px solid var(--x11gray);
		}

		select {
			margin-top: 20px;
			font-size: 24px;
		}
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

	button-wrapper {
		margin-top: 20px;
		display: flex;
		flex-direction: row;
		gap: 20px;
	}

	button-wrapper {
		justify-content: center;
	}

	.payment-options,
	.shipping-options {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		margin-top: 20px;

		li {
			display: flex;
			flex-direction: column;
			svg-wrapper {
				display: flex;
				flex-direction: row;
				justify-content: center;
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

	h1,
	h3 {
		font-family: 'Bangers';
	}
</style>
