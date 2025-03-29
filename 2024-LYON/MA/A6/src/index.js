window.addEventListener("load", () => { // When the page has loaded
	const loading = document.querySelector("#loading"); // Select the loading overlay using its ID
	loading.style.opacity = 0; // Set the opacity to 0 (to slowly hide it with a transition)

	setTimeout(() => { // After 1s
		loading.style.display = "none"; // Hide it to allow events to be triggered on elements behind it
	}, 1000) // 1s is the transition duration set in the CSS
})