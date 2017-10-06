// zasób potrzebny do tworzenia obiektów svg:
var svg = "http://www.w3.org/2000/svg";

// kontener dla obiektów svg:
var graph = document.getElementById("graph");

// licznik dla węzłów antydrzewa:
var counter = 0;

/*
 *	Funkcja rysująca koło.
 *
 *	@x, @y - współrzędne koła
 */
function createCircle(x, y, space, id) {
	var circle = document.createElementNS(svg, "circle");

	circle.setAttributeNS("","cx", x);
	circle.setAttributeNS("","cy", y);
	circle.setAttributeNS("","r", 20);
	circle.setAttributeNS("","stroke", "black");
	circle.setAttributeNS("","stroke-width", 3);
	circle.setAttributeNS("","fill", "gray");
	circle.setAttributeNS("","id", "z" + id);
	circle.setAttributeNS("","data-space", space);
	circle.setAttributeNS("","onclick", "createNode(evt, 'left', " + space + ")");

	graph.appendChild(circle);
}

/*
 *	Funkcja rysująca odcinek.
 *
 *	@x1, y1 - współrzędne początku odcinka.
 *	@x2, y2 - współrzędne końca odcinka.
 */
function createLine(x1, y1, x2, y2) {
	var line = document.createElementNS(svg, "line");
	line.setAttributeNS("","x1", x1);
	line.setAttributeNS("","y1", y1);
	line.setAttributeNS("","x2", x2);
	line.setAttributeNS("","y2", y2);
	line.setAttributeNS("","stroke", "black");
	line.setAttributeNS("","stroke-width", 3);
	line.setAttributeNS("","marker-end", "url(#arrow)");

	graph.appendChild(line);
}

/*
 *	Funkcja wypisująca tekst
 *
 *	@x, y - współrzędne tekstu
 *	@content - tekst do wypisania
 */
function createText(x, y, content) {
	var text = document.createElementNS(svg, "text");

	text.setAttributeNS("", "x", x);
	text.setAttributeNS("", "y", y);
	text.setAttributeNS("", "fill", "white");
	text.setAttributeNS("", "font-size", "16");
	text.setAttributeNS("", "font-weight", "bold");

	var textNode = document.createTextNode(content);
	text.appendChild(textNode);

	graph.appendChild(text);
}

/*
 *	Funkcja rysująca węzeł.
 *
 *	@evt - zdarzenie kliku
 *	@direction - kierunek wygenerowania węzła
 */
function createNode(evt, direction, space) {
	var target = evt.target;
	var y = parseInt(target.getAttribute("cy"));
	var x = parseInt(target.getAttribute("cx"));

	// sprawdza, z której strony powinien zostać narysowany nowy węzeł i wyznacza jego współrzędne
	if(direction == "left") {
		target.setAttribute("onclick", "createNode(evt, 'right', " + space + ")");

		var cx = x - space;
		var cy = y - 80;
		x -= 5;

	} else {
		target.removeAttribute("onclick");

		var cx = x + space;
		var cy = y - 80;
		x += 5;
	}

	// sprawdza czy węzeł nie wychodzi za obszar rysowania
	if(cy > 0) {
		createLine(x, y - 20, cx, cy);
		createCircle(cx, cy, space/2, ++counter);
		createText(cx - 8, cy + 40, counter);
	} else {
		target.removeAttribute("onclick");
	}
}

$(document).ready(function() {
	// rysowanie pierwszego węzła
	createCircle(180, 270, 90, ++counter);
	createText(172, 310, counter);

	/*
	 *	Wydarzenie uruchamiające działanie algorytmu Baera.
	 */
	$(".baer-button").click(function() {
		// kontener z zadaniami
		var tasks = $("circle");

		// blokowanie dalszej rozbudowy antydrzewa
		tasks.each(function(index, element) {
			$(element).removeAttr("onclick", "");
		});

		// ukrycie przycisku
		$(this).fadeOut();

		// sortowanie kontenera z zadaniami
		tasks.sort(function(a, b) {
			if(a.getAttribute('data-space') < b.getAttribute('data-space')) {
				return 1;
			} else if(a == b) {
				return 0;
			} else {
				return -1;
			}
		});

		// przygotowanie zmiennych do algorytmu baera
		tasks = tasks.toArray();
		var k1 = 0;
		var k2 = 0;

		// właściwy kod algorytmu Baera
		var baer = setInterval(function() {
			var task = tasks.pop();

			if(tasks.length == 0) {
				var children = $("#p1").children();
				k1 += 1;
			} else {
				if(k1 - 1 == k2) {
					var children = $("#p2").children();
					k2 += 2;
				} else {
					var children = $("#p1").children();
					k1 += 1;
				}
			}

			var node = document.getElementById(task.getAttribute('id'));
			node.setAttribute('fill', 'red');

			for(var i = 0; i < children.length; i++) {
				if(!$(children[i]).html()) {
					$(children[i]).html('Z <sub>' + task.getAttribute('id').substr(1) + '</sub>');
					break;
				}
			}

			if(tasks.length == 0) {
				$("#c_max").html(k1);
				$("#baer_equal").show();
				clearInterval(baer);
			}
		}, 1500, tasks, k1, k2);
	});
});
