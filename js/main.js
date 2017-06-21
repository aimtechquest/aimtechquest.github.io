function draw_board() {
	var client = new XMLHttpRequest();
	client.open('GET', 'scores.txt');
	client.onload = function() {
		var lines = client.responseText.split('\n');
		var team_names = lines[0].split('\t');
		var scores = [];
		for (var i = 1; i < lines.length; ++i) {
			scores.push(lines[i].split('\t').map(function(s) {
				if (isNaN(Number(s))) {
					return 0;
				} else {
					return Number(s);
				}
			}));
		}

		var team_count = team_names.length;
		var task_count = scores[0].length;

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
		table.setAttribute('width', '100%');
		table.setAttribute('align', 'left');
		for (var i = 0; i < team_count; ++i) {
			var row = table.insertRow(i);
			var cell = row.insertCell(0);
			var text = document.createTextNode(team_names[i]);
			cell.setAttribute('align', 'right');
			cell.setAttribute('color', 'black');
			cell.setAttribute('background-color', 'white');
			cell.appendChild(text);
			for (var j = 0; j < task_count; ++j) {
				cell = row.insertCell(j + 1);
				text = document.createTextNode(scores[i][j]);
				cell.setAttribute('align', 'center');
				cell.setAttribute('color', 'black');
				cell.setAttribute('background-color', 'white');
				cell.appendChild(text);
			}
			table.appendChild(row);
		}
	}
	client.send();
}

draw_board();