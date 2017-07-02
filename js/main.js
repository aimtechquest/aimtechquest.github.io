function draw_board() {
	var client = new XMLHttpRequest();
	client.open('GET', 'scores.txt');
	client.onload = function() {
		var lines = client.responseText.split('\n');
		var task_names = lines[0].split('\t');
		var team_names = lines[1].split('\t');
		var scores = [];
		for (var i = 2; i < lines.length; ++i) {
			scores.push(lines[i].split('\t').map(function(s) {
				if (isNaN(Number(s))) {
					return 0;
				} else {
					return Number(s);
				}
			}));
		}

		var team_count = team_names.length;
		var task_count = task_names.length;

		var max_scores = [];
		for (var i = 0; i < task_count; ++i) {
			max_scores.push(0);
			for (var j = 0; j < team_count; ++j) {
				max_scores[i] = Math.max(max_scores[i], scores[i][j]);
			}
		}

		var table = document.getElementById("scoreboard");
		while (table.rows[0]) {
			table.deleteRow(0);
		}
		table.setAttribute('align', 'left');
		table.setAttribute('cellspacing', '2');
		var row = table.insertRow(0);
		var cell = row.insertCell(0);
		cell.style.setProperty('text-align', 'center');
		cell.style.setProperty('color', 'black');
		cell.style.setProperty('background-color',  'rgb(255, 210, 128)');
		for (var i = 0; i < task_count; ++i) {
			cell = row.insertCell(i + 1);
			cell.style.setProperty('text-align', 'center');
			cell.style.setProperty('color', 'black');
			cell.style.setProperty('background-color',  'rgb(255, 210, 128)');
			var text = document.createTextNode(task_names[i]);
			cell.appendChild(text);
		}
		for (var i = 0; i < team_count; ++i) {
			var rowmult = 1 - (i % 2) / 20;
			var row = table.insertRow(i + 1);
			var cell = row.insertCell(0);
			var text = document.createTextNode(team_names[i]);
			cell.style.setProperty('text-align', 'right');
			cell.style.setProperty('color', 'black');
			cell.style.setProperty('background-color',  "rgb(" + [255 * rowmult, 255 * rowmult, 255 * rowmult].map(Math.floor).join(',') + ")");
			cell.appendChild(text);
			for (var j = 0; j < task_count; ++j) {
				var colmult = 1 - ((j + 1) % 2) / 20;
				var mult = rowmult * colmult;
				cell = row.insertCell(j + 1);
				text = document.createTextNode(scores[i][j]);
				var greenness = 0;
				if (scores[i][j] > 0) {
					greenness = scores[i][j] / max_scores[j];
				}
				var g = Math.floor(31 * greenness);
				var bgcolor = "rgb(" + [(255 - 4 * g) * mult, (255 - g / 2) * mult, (255 - 4 * g) * mult].map(Math.floor).join(',') + ")";
				var textcolor = "rgb(" + [0, Math.floor(g / 2), 0].join(',') + ")";
				cell.style.setProperty('text-align', 'center');
				cell.style.setProperty('color', textcolor);
				cell.style.setProperty('background-color', bgcolor);
				cell.style.setProperty('width', '100px');
				cell.style.setProperty('height', '50px');
				cell.appendChild(text);
			}
			table.appendChild(row);
		}
	}
	client.send();
}

draw_board();