
document.addEventListener('DOMContentLoaded', function() {
	const gameContainer = document.getElementById("gameContainer");
	const allTd = document.getElementsByTagName("td");	
	const colorsArr = ["red", "blue", "green", "yellow", "orange", "rose", "lila", "sea", "green2", 
						"pink", "purple", "creme", "gray", "bronze", "green3"];
	const clicked = [];
	const clickNumber = [];
	const invisible = [];
	
	// Draw table
	function drawTable(x,y) {
		const table = document.createElement("table");
		table.id = "table";
		gameContainer.appendChild(table);
		for (let i=1; i <= y; i++) {
					const tr = table.appendChild(document.createElement("tr"));
						for (let j=1; j <= x; j++) {
							const td = tr.appendChild(document.createElement("td"));
							td.classList.add("tds");
							td.classList.add("front");
							const tdsInside = td.appendChild(document.createElement("div"));
							tdsInside.classList.add("tds-inside");
						}
		}
		randomColor(x, y);
	}
	
	// Allows to change size of array with colors. Max array size: 6x5
	function randomTab(z) {
		let temp = colorsArr.slice(0,z).concat(colorsArr.slice(0,z));
		return temp;
	}
	
	// Set random color to every td
	function randomColor(x, y) {
		const arr = randomTab((x*y)/2);
		for (let i=0; i < allTd.length; i++ ) {
				let randomColor = Math.floor(Math.random() * arr.length);
				const addColor = allTd[i].classList.add(arr[randomColor]);
				var color = arr[randomColor];			// musze uzyc var zeby color zostal zlapany przez wywolywana ponizej funkcje eventListener(color); // Let nie dziala
				arr.splice(randomColor, 1);
		} 
		eventListener(color);
	}
	
	// Check which td was clicked
	function eventListener(color) { 
	for (let i=0; i < allTd.length; i++) { 
		allTd[i].addEventListener("click", function(){
			toggleClass(allTd[i], color);
		});
	}}
		
	// Show and hide colors when click on td
	function toggleClass(td, color) {
		// Block click on invisible colors
		if (td.classList.contains("invisible")) {
			return;
		}
		clickNumber.push("1");
		// Set clickNumber to 1 if the same td was clicked
		if (clickNumber.length > 2 && clicked.length < 2) {
			clickNumber.length = 1;		
		}
		// This eliminates errors :P
		if (clicked.length > 0 && clickNumber.length < 2) {
			return;
		}
		// Check click number - block more than two click
		if (clickNumber.length > 2) {
			return;
		} 
		// Show colors
		if (clicked.length < 2) { 
			if (td.classList.contains("front")) {
				td.classList.remove("front");
				clicked.push(td);
			}
		} 
		// Hide colors
		if (clicked.length == 2) {
			setTimeout(function() {
				sleep(clicked, td)
			}, 800);
		}
	};  
	
	// Wait 1 sec before hide colors
	function sleep(clicked, td) {
		if (clicked[0].className == clicked[1].className) {
			for (let i=0; i < 2; i++) {
				clicked[i].classList.add("invisible");
				clicked[i].classList.add("front");
				invisible.push(1);
				
				// Check result
				if (invisible.length == allTd.length) {
					showWin("WYGRANA!");
				}
			}
		}
		for (let i=0; i < 2; i++) {
			clicked[i].classList.add("front");
		}
		clicked.splice(0, clicked.length);
		clickNumber.splice(0,clickNumber.length);
	}
	
	function showWin(textt){
		const result = document.createElement("div");
		const h1 = document.createElement("h2");
		result.id = "result";
		gameContainer.appendChild(result);
		result.appendChild(h1);
		h1.textContent = textt;
		const buton = document.createElement("button");
		buton.id = "button";
		buton.textContent = "Graj ponownie";
		result.appendChild(buton);
		resetGame(buton);
	}
	
	function resetGame(buton) {
		buton.addEventListener("click", function() {
			location.reload();
		})
		/*this.addEventListener("click", function() {
			for (let i=0; i < allTd.length; i++) { 
				allTd[i].classList.remove("invisible");
			}
			clicked.splice(0, clicked.length);
			clickNumber.splice(0,clickNumber.length);
			//clicked.splice(0, clicked.length);
			gameContainer.innerText = "";
			drawTable(2,3);  
		}  ) */
	}
	
	drawTable(4,3);
});