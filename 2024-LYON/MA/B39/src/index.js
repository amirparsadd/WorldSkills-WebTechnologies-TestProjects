// Initialize an empty array to store counter values
const counters = []

// Select the "Add" button from the DOM
const adder = document.querySelector('#add')

// Add a click event listener to the "Add" button
adder.addEventListener('click', () => {
	// Select the container where counters will be displayed
	const countersDiv = document.querySelector('.counters')

	// Add a new counter with an initial value of 0 to the counters array
	counters.push(0)

	// Update the inner HTML of the counters container
	// Map over the counters array to generate HTML for each counter
	countersDiv.innerHTML = 
		counters.map((el, idx) => {
			// Return a string of HTML for each counter
			// Each counter has:
			// - A decrease button with an onclick handler to decrease the value
			// - A span to display the current counter value
			// - An increase button with an onclick handler to increase the value
			return `<div class="counter">
				<button onclick="modcount(${idx}, -1)" class="decrease">-</button>
				<span id="display-${idx}">${el}</span>
				<button onclick="modcount(${idx}, 1)" class="increase">+</button>
			</div>`
		})
		.join('') // Join the array of HTML strings into a single string
})

// Function to modify the value of a specific counter
function modcount(idx, mod) {
	// Update the counter value at the specified index by adding the modifier
	counters[idx] += mod

	// Select the display span for the specific counter
	const display = document.querySelector(`#display-${idx}`)

	// Update the inner HTML of the display span to reflect the new counter value
	display.innerHTML = counters[idx]
}