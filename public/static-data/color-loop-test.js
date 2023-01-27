//Phase 1:  Write out code that will pair up each letter in an array with a color in the colors array.

const letterData = [];
const colors = ['#95e513', '#5dd3fb', '#e93f3a', '#b145bb', '#fcda33'];
const sentence = 'This is an example sentence';

// Split `sentence` into its component letters, remove whitespace, and pair up each element with one of the elements in `colors`.  Create a new object with each of these pairs and push them to the array `letterData`.

var letters = sentence.split('').filter((letter) => letter !== ' ');

for (let i = 0; i < letters.length; i++) {
   let color = colors[i % colors.length];

   // to cycle through the colors array -- using the modulo ensures that we don't go out-of-bounds with the index (there are more letters in the sentence than there are colors)

   let item = { letter: letters[i], color: color };
   letterData.push(item);
}

//Phase 2:

//The example sentence will be a variable that will be rendered in the template.
//Ensure that each letter is rendered with the color it's paired with.

// Get the element where the letters will be rendered
let container = document.getElementById('letters-container');

// Loop through the pairs array
for (let i = 0; i < letterData.length; i++) {
   let pair = letterData[i];

   // Create a new element for each letter
   var letterElement = document.createElement('span');

   // Set the inner text of the element to the letter
   letterElement.innerText = pair.letter;

   // Set the color of the element to the paired color
   letterElement.style.color = pair.color;

   // Append the letter element to the container
   container.appendChild(letterElement);
}
