<script setup>
	import { ref, reactive } from 'vue';
	import { useFirestore, useCollection } from 'vuefire';
	import { collection, doc, addDoc, setDoc, deleteDoc } from 'firebase/firestore';

	const db = useFirestore();
	const figures = useCollection(collection(db, 'figures')); //reactive data

	const form = reactive({
		name: '',
	});

	const editing = ref(false);
	function addFigure() {
		// alert(`Add ${form.name}`);
		addDoc(collection(db, 'figures'), {
			name: form.name,
		});
		form.name = '';
	}

	function editFigure(id) {
		editing.value = id;
	}

	function updateFigure(id, f) {
		setDoc(doc(db, 'figures', id), {
			name: f,
		});
		clearEdit();
	}

	function clearEdit() {
		editing.value = false;
	}

	async function removeFigure(docId) {
		//look up why this needs to be async
		const record = doc(db, 'figures', docId);
		if (confirm('Are you sure?')) {
			await deleteDoc(record);
		}
	}
</script>

<template>
	<h1>Firebase Test</h1>

	<ul>
		<li v-for="figure in figures" :key="figure.id">
			<h2>{{ figure.name }}</h2>
			<button type="button" @click="removeFigure(figure.id)">x</button>

			<button @click="editFigure(figure.id)" v-if="editing !== figure.id">Edit</button>
			<template v-if="editing == figure.id">
				<input type="text" v-model="figure.name" />
				<button @click="updateFigure(figure.id, figure.name)">Update</button>
				<button @click="clearEdit()">C</button></template
			>
		</li>

		<!--the button type here is helpful for screen readers - how?-->
	</ul>

	<form @submit.prevent="addFigure()">
		<label for="x">Add a figure here</label>
		<input id="x" type="text" v-model="form.name" />
		<button type="submit">Add</button>
	</form>
</template>

<style>
	form {
		display: grid;
		justify-self: start;
	}
</style>
