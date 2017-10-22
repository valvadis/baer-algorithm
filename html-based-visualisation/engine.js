var Graph = {
    graph: document.getElementById("graph"),
    svg: "http://www.w3.org/2000/svg",
    counter: 0,
    init: function () {
        this.createCircle(180, 270, 90, ++this.counter);
        this.createText(172, 310, this.counter);
    },
    createCircle: function (x, y, space, id) {
        var circle = document.createElementNS(this.svg, "circle");

        circle.setAttributeNS("", "cx", x);
        circle.setAttributeNS("", "cy", y);
        circle.setAttributeNS("", "r", 20);
        circle.setAttributeNS("", "stroke", "black");
        circle.setAttributeNS("", "stroke-width", 3);
        circle.setAttributeNS("", "fill", "gray");
        circle.setAttributeNS("", "id", "z" + id);
        circle.setAttributeNS("", "data-space", space);
        circle.setAttributeNS("", "onclick", "Graph.createNode(evt, 'left', " + space + ")");

        this.graph.appendChild(circle);
    },
    createLine: function (x1, y1, x2, y2) {
        var line = document.createElementNS(this.svg, "line");
        line.setAttributeNS("", "x1", x1);
        line.setAttributeNS("", "y1", y1);
        line.setAttributeNS("", "x2", x2);
        line.setAttributeNS("", "y2", y2);
        line.setAttributeNS("", "stroke", "black");
        line.setAttributeNS("", "stroke-width", 3);
        line.setAttributeNS("", "marker-end", "url(#arrow)");

        this.graph.appendChild(line);
    },
    createText: function (x, y, content) {
        var text = document.createElementNS(this.svg, "text");
        text.setAttributeNS("", "x", x);
        text.setAttributeNS("", "y", y);
        text.setAttributeNS("", "fill", "white");
        text.setAttributeNS("", "font-size", "16");
        text.setAttributeNS("", "font-weight", "bold");

        var textNode = document.createTextNode(content);
        text.appendChild(textNode);

        this.graph.appendChild(text);
    },
    createNode: function (evt, direction, space) {
        var target = evt.target;
        var y = parseInt(target.getAttribute("cy"));
        var x = parseInt(target.getAttribute("cx"));

        if (direction == "left") {
            target.setAttribute("onclick", "Graph.createNode(evt, 'right', " + space + ")");

            var cx = x - space;
            var cy = y - 80;
            x -= 5;

        } else {
            target.removeAttribute("onclick");

            var cx = x + space;
            var cy = y - 80;
            x += 5;
        }

        if (cy > 0) {
            this.createLine(x, y - 20, cx, cy);
            this.createCircle(cx, cy, space / 2, ++this.counter);
            this.createText(cx - 8, cy + 40, this.counter);
        } else {
            target.removeAttribute("onclick");
        }
    },
    run: function(tasks, p1, p2, parent) {
        tasks.sort(function (a, b) {
            if (a.getAttribute('data-space') < b.getAttribute('data-space')) {
                return 1;
            } else if (a == b) {
                return 0;
            } else {
                return -1;
            }
        });

        tasks = tasks.toArray();
        var k1 = 0;
        var k2 = 0;

        var baer = setInterval(function () {
            var task = tasks.pop();

            if (tasks.length == 0) {
                var children = p1.children();
                k1 += 1;
            } else {
                if (k1 - 1 == k2) {
                    var children = p2.children();
                    k2 += 2;
                } else {
                    var children = $("#p1").children();
                    k1 += 1;
                }
            }

            var node = document.getElementById(task.getAttribute('id'));
            node.setAttribute('fill', 'red');

            for (var i = 0; i < children.length; i++) {
                if (!$(children[i]).html()) {
                    $(children[i]).html('Z <sub>' + task.getAttribute('id').substr(1) + '</sub>');
                    break;
                }
            }

            if (tasks.length == 0) {
                parent.html(k1);
                parent.parent().show();
                clearInterval(baer);
            }
        }, 1200, tasks, k1, k2);
    }
};

$(document).ready(function () {
    Graph.init();

    $(".baer-button").click(function () {
        var tasks = $("circle");

        tasks.each(function (index, element) {
            $(element).removeAttr("onclick", "");
        });

        Graph.run(tasks, $("#p1"), $("#p2"), $("#c_max"));

        $(this).fadeOut();
    });
});
