
document.addEventListener('DOMContentLoaded', function() {
	
	const gameContainer = document.getElementById("gameContainer");
	const allTd = document.getElementsByTagName("td");	
	
	const game = { 
	
		colorsArr: ["red", "blue", "green", "yellow", "orange", "rose", "lila", "sea", "green2", 
							"pink", "purple", "creme", "gray", "bronze", "green3"],
		clicked: [],
		clickNumber: [],
		invisible: [],
		 
		// Draw table
		drawTable: function(x,y) {
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
			game.setRandomColor(x, y);
		},
		
		// Allows to change size of array with colors. Max array size: 6x5
		randomTab: function(z) {
			let temp = this.colorsArr.slice(0,z).concat(this.colorsArr.slice(0,z));
			return temp;
		},
		
		// Set random color to every td
		setRandomColor: function(x, y) {
			const arr = game.randomTab((x*y)/2);
			for (let i=0; i < allTd.length; i++ ) {
					let randomColor = Math.floor(Math.random() * arr.length);
					const addColor = allTd[i].classList.add(arr[randomColor]);
					var color = arr[randomColor];
					arr.splice(randomColor, 1);
			} 
			game.eventListener(color);
		},
		
		// Check which td was clicked
		eventListener: function(color) { 
			for (let i=0; i < allTd.length; i++) { 
				allTd[i].addEventListener("click", function(){
					game.toggleClass(allTd[i], color);
				});
			}	
		},
			
		// Show and hide colors when click on td
		toggleClass: function(td, color) {
			// Block click on invisible colors
			if (td.classList.contains("invisible")) {
				return;
			}
			this.clickNumber.push("1");
			// Set clickNumber to 1 if the same td was clicked
			if (this.clickNumber.length > 2 && this.clicked.length < 2) {
				this.clickNumber.length = 1;		
			}
			// This eliminates errors :P
			if (this.clicked.length > 0 && this.clickNumber.length < 2) {
				return;
			}
			// Check click number - block more than two click
			if (this.clickNumber.length > 2) {
				return;
			} 
			// Show colors
			if (this.clicked.length < 2) { 
				if (td.classList.contains("front")) {
					td.classList.remove("front");
					this.clicked.push(td);
				}
			} 
			// Hide colors
			if (this.clicked.length == 2) {
				setTimeout(function() {
					game.sleep(this.clicked, td)
				}, 800);
			}
		},
		
		// Wait 1 sec before hide colors
		sleep: function(clicked, td) {
			if (this.clicked[0].className == this.clicked[1].className) {
				for (let i=0; i < 2; i++) {
					this.clicked[i].classList.add("invisible");
					this.clicked[i].classList.add("front");
					this.invisible.push(1);
					
					// Check result
					if (this.invisible.length == allTd.length) {
						game.showWin("WYGRANA!");
					}
				}
			}
			for (let i=0; i < 2; i++) {
				this.clicked[i].classList.add("front");
			}
			this.clicked.splice(0, this.clicked.length);
			this.clickNumber.splice(0, this.clickNumber.length);
		},
		
		showWin: function(textt){
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
			game.resetGame(buton);
		},
		
		resetGame: function(buton) {
			buton.addEventListener("click", function() {
				location.reload();
			})
		}
	}
	
	game.drawTable(4,3);
});