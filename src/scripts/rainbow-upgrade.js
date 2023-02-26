const letterData = [];
	const colors = ['#95e513', '#5dd3fb', '#e93f3a'];

	// Split `sentence` into its component letters, remove whitespace, and pair up each element with one of the elements in `colors`.  Create a new object with each of these pairs and push them to the array `letterData`.

	var words = sentence.split(' ');
	var letters = words.split('')

	// .filter((letter) => letter !== ' ');

	for (let i = 0; i < letters.length; i++) {
		let color = colors[i % colors.length];
	
	// to cycle through the colors array -- using the modulo ensures that we don't go out-of-bounds with the index (there are more letters in the sentence than there are colors)
		// After this is cycled through, we'll have a list of repeating colors we can pair up with each letter.

		// This is the array that we'll push to letterData[].
		if(letters[i] == ' ') {
			let item = { letter: letters[i], color: null };
		} else if (letters[i] !== ' ')
			let item = { letter: letters[i], color: color };
		letterData.push(item);
	}




	//Split sentence into its component letters.  Include whitespace.

	//Let i start at o.  The limit of i's value is


	//T H I S   I S   A N   E X A M P L E   S E N T E N C E
	//0 1 2 3 x 0 1 x 2 3 x 0 1 2 3 0 1 2 x 3 0 1 2 3 0 1 2

   //if the value is whitespace
   //skip the index count and move on to the next value





