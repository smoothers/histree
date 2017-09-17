// Scripts order
// pop_up_utils
// d3.min (d3 visualization library)
// * visualization
// browser_action.js

class HistreeVisualization {
  constructor(depth, leaves) {
    this.margin = {
      top: 20,
      right: 60,
      bottom: 20,
      left: 60
    }
    // Height and width of popup window
    this.width = depth * 140 - this.margin.right - this.margin.left;
    this.height = leaves * 120 - this.margin.top - this.margin.bottom;

    this.i = 0;
    this.duration = 750;
    this.root = null;

    this.tree = d3.layout.tree()
      .size([this.height, this.width]);

    this.diagonal = d3.svg.diagonal()
      .projection(d => [d.y, d.x]);

    this.svg = d3.select("body")
      .append("svg")
      .attr("width", this.width + this.margin.right + this.margin.left)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
  }

  update(source) {
    // Compute the new tree layout.
    var nodes = this.tree.nodes(this.root)
      .reverse();
    var links = this.tree.links(nodes);

    // Normalize for fixed-depth.
    nodes.forEach(function(d) {
      d.y = d.depth * 140;
    });

    // Update the nodes…
    var node = this.svg.selectAll("g.node")
      // Make sure all nodes have id's
      .data(nodes, d => d.id || (d.id = ++this.i))

    // Enter any new nodes at the parent's previous position.
    var nodeEnter = node.enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", function(d) {
        return "translate(" + source.y0 + "," + source.x0 + ")";
      })
      .on("click", data => this.clickNode(data));

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
      .duration(this.duration)
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
      .duration(this.duration)
      .attr("transform", function(d) {
        return "translate(" + source.y + "," + source.x + ")";
      })
      .remove();

    nodeExit.select("circle")
      .attr("r", 1e-6);

    nodeExit.select("text")
      .style("fill-opacity", 1e-6);

    // Update the links…
    var link = this.svg.selectAll("path.link")
      .data(links, function(d) {
        return d.target.id;
      });

    // Enter any new links at the parent's previous position.
    link.enter()
      .insert("path", "g")
      .attr("class", "link")
      .attr("d", (d) => {
        var o = {
          x: source.x0,
          y: source.y0
        };
        return this.diagonal({
          source: o,
          target: o
        });
      });

    // Transition links to their new position.
    link.transition()
      .duration(this.duration)
      .attr("d", this.diagonal);

    // Transition exiting nodes to the parent's new position.
    link.exit()
      .transition()
      .duration(this.duration)
      .attr("d", (d) => {
        var o = {
          x: source.x,
          y: source.y
        };
        return this.diagonal({
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

  drawTree(tree) {
    // Once we've recieved the tree from the background
    // we set the root node's position
    this.root = tree;
    this.root.x0 = this.height / 2;
    this.root.y0 = 0;

    // Then we call the 'update' method to trigger the rest of the visualization
    this.update(this.root);
  }

  // Navigate to child on node click
  clickNode(d) {
    tellTabToNavigateTo(d.url);
    closePopUp();
  }
}
