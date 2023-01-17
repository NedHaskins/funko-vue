import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useInterfaceStore = defineStore('interface', function () {
	const mainMenuOpen = ref(false);

	//used for the button functionality
	function toggleMenu() {
		mainMenuOpen.value = !mainMenuOpen.value;
	}

	const menuClass = computed(function () {
		if (mainMenuOpen.value) {
			return 'menu-open';
		} else {
			return 'menu-closed';
		}
		//used for CSS class property values
	});

	return { mainMenuOpen, toggleMenu, menuClass };
});
