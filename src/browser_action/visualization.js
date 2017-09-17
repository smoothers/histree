// Scripts order
// pop_up_utils
// d3.min (d3 visualization library)
// * visualization
// browser_action.js

var margin = {
    top: 20,
    right: 120,
    bottom: 20,
    left: 120
  },
  // Height and width of popup window
  width = 10000 - margin.right - margin.left,
  height = 503 - margin.top - margin.bottom;

var i = 0,
  duration = 750,
  root;

var tree = d3.layout.tree()
  .size([height, width]);

var diagonal = d3.svg.diagonal()
  .projection(d => [d.y, d.x]);

var svg = d3.select("body")
  .append("svg")
  .attr("width", width + margin.right + margin.left)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.select(self.frameElement)
  .style("height", "500px");

function collapse(d) {
  if (d.children) {
    d._children = d.children;
    d._children.forEach(collapse);
    d.children = null;
  }
}

function update(source) {
  // Compute the new tree layout.
  var nodes = tree.nodes(root)
    .reverse();
  var links = tree.links(nodes);

  // Normalize for fixed-depth.
  nodes.forEach(function(d) {
    d.y = d.depth * 140;
  });

  // Update the nodes…
  var node = svg.selectAll("g.node")
    // Make sure all nodes have id's
    .data(nodes, d => d.id || (d.id = ++i))

  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", function(d) {
      return "translate(" + source.y0 + "," + source.x0 + ")";
    })
    .on("click", click);

  nodeEnter.append("circle")
    .attr("r", 1e-6)
    .style("fill", function(d) {
      return d._children ? "lightsteelblue" : "#fff";
    });

  // Add white rectangle behind the text
  nodeEnter.append("rect")
    .attr("width", 120)
    .attr("height", 15)
    .attr("y", "-15")
    .attr("class", "rect-shift")
    .style("fill", "white")
    .style("opacity", "0.7");

  nodeEnter.append("text")
    .attr("dy", "-10")
    .attr("text-anchor", 'middle')
    .text((d) => firstNCharacters(d.title))
    .style("fill-opacity", 1e-6)
    .call(function(selection) {
      selection.each(function(d) {
        d.bbox = this.getBBox();
      });
    });

  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
    .duration(duration)
    .attr("transform", function(d) {
      return "translate(" + d.y + "," + d.x + ")";
    });

  nodeUpdate.select("circle")
    .attr("r", 4.5)
    .style("fill", function(d) {
      return d._children ? "lightsteelblue" : "#fff";
    });

  nodeUpdate.select("text")
    .style("fill-opacity", 1);

  // Transition exiting nodes to the parent's new position.
  var nodeExit = node.exit()
    .transition()
    .duration(duration)
    .attr("transform", function(d) {
      return "translate(" + source.y + "," + source.x + ")";
    })
    .remove();

  nodeExit.select("circle")
    .attr("r", 1e-6);

  nodeExit.select("text")
    .style("fill-opacity", 1e-6);

  // Update the links…
  var link = svg.selectAll("path.link")
    .data(links, function(d) {
      return d.target.id;
    });

  // Enter any new links at the parent's previous position.
  link.enter()
    .insert("path", "g")
    .attr("class", "link")
    .attr("d", function(d) {
      var o = {
        x: source.x0,
        y: source.y0
      };
      return diagonal({
        source: o,
        target: o
      });
    });

  // Transition links to their new position.
  link.transition()
    .duration(duration)
    .attr("d", diagonal);

  // Transition exiting nodes to the parent's new position.
  link.exit()
    .transition()
    .duration(duration)
    .attr("d", function(d) {
      var o = {
        x: source.x,
        y: source.y
      };
      return diagonal({
        source: o,
        target: o
      });
    })
    .remove();

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}

// Navigate to child on node click
function click(d) {
  tellTabToNavigateTo(d.url);
  closePopUp();
}
