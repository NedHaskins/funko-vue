<script setup>
	import { reactive } from 'vue';

	import { RouterLink } from 'vue-router';

	import { useCartService } from '@/services/CartService';

	import VisaIcon from '@/components/icons/payment-icons/VisaIcon.vue';
	import MastercardIcon from '@/components/icons/payment-icons/MastercardIcon.vue';
	import PaypalIcon from '@/components/icons/payment-icons/PaypalIcon.vue';
	import BitcoinIcon from '@/components/icons/payment-icons/BitcoinIcon.vue';

	import USPSIcon from '@/components/icons/shipping-icons/USPSIcon.vue';
	import FedexIcon from '@/components/icons/shipping-icons/FedexIcon.vue';
	import DHLIcon from '@/components/icons/shipping-icons/DHLIcon.vue';

	const cart = useCartService();

	const checkoutForm = reactive({
		name: '',
		address: '',
		aptNo: '',
		city: '',
		state: '',
		zipCode: '',
		cardNo: '',
		expDate: '',
	});

	//Function to place item order.

	//Create an item in the customer's orders colletion.

	//Each orders object will have:
</script>

<template>
	<checkout-modal>
		<h1>Checkout!</h1>

		<form>
			<h2>Enter your address!</h2>
			<input-wrapper>
				<label for="name">Name</label>
				<input id="name" type="text" />
			</input-wrapper>

			<input-wrapper>
				<label for="address">Address</label>
				<input id="address" type="text" />
			</input-wrapper>

			<input-wrapper>
				<label for="city">City</label>
				<input id="city" type="text" />
			</input-wrapper>

			<input-wrapper>
				<label for="state">State</label>
				<input id="state" type="text" />
			</input-wrapper>

			<input-wrapper>
				<label for="zip-code">Zip Code</label>
				<input id="zip-code" type="number" />
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

			<button-wrapper>
				<button type="button">
					<RouterLink @click="cart.toggleCheckout()" to="/shopping-cart">Back to cart</RouterLink>
				</button>

				<button type="button">Place order</button>
			</button-wrapper>
		</form>
	</checkout-modal>
</template>

<style lang="scss" scoped>
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
	}
</style>
