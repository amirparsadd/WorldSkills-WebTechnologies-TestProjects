// Get the canvas element from the DOM
const canvas = document.getElementById('canvas');
/**
 * @type {CanvasRenderingContext2D}
 */
// Get the 2D rendering context for the canvas
const ctx = canvas.getContext('2d');

// Class representing a square with x, y coordinates and size
class Square {
	constructor(x, y, size) {
		this.x = x; // X-coordinate of the square
		this.y = y; // Y-coordinate of the square
		this.size = size; // Size (width and height) of the square
	}
}

// Function to handle the drawing process
function drawWrapper() {
	// Get the input element from the DOM
	const inp = document.getElementById("input");

	// Clear the canvas by drawing a white rectangle over it
	ctx.rect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "white";
	ctx.fill();

	// Draw a black triangle on the canvas
	ctx.beginPath();
	ctx.moveTo(256, 0); // Top point of the triangle
	ctx.lineTo(0, 512); // Bottom-left point of the triangle
	ctx.lineTo(512, 512); // Bottom-right point of the triangle
	ctx.fillStyle = "black";
	ctx.fill();

	// Call the draw function with a new Square and the depth from the input
	draw(new Square(0, 0, 512), parseInt(inp.value));
}

// Recursive function to draw a fractal pattern
function draw(cube, depth) {
	// Draw an inverted white triangle inside the given square
	ctx.beginPath();
	ctx.moveTo(cube.x + (cube.size / 2) - (cube.size / 4), cube.y + (cube.size / 2)); // Left point of the triangle
	ctx.lineTo(cube.x + (cube.size / 2) + (cube.size / 4), cube.y + (cube.size / 2)); // Right point of the triangle
	ctx.lineTo(cube.x + (cube.size / 2), cube.y + cube.size); // Bottom point of the triangle
	ctx.fillStyle = "white";
	ctx.fill();

	// If depth is not zero, recursively draw smaller triangles
	if (depth !== 0) {
		// Bottom-left smaller square
		draw(new Square(cube.x, cube.y + cube.size / 2, cube.size / 2), depth - 1);
		// Bottom-right smaller square
		draw(new Square(cube.x + cube.size / 2, cube.y + cube.size / 2, cube.size / 2), depth - 1);
		// Top smaller square
		draw(new Square(cube.x + (cube.size / 2) - (cube.size / 4), cube.y, cube.size / 2), depth - 1);
	}
}