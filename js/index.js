import { AVLTree } from "./classes/AvlTree.js";
import { RedBlackTree } from "./classes/RedBlackTree.js";

let selectedTree = "AVL";
let currentTree = new AVLTree();
const { g, treeLayout } = setupD3();

document.addEventListener("DOMContentLoaded", () => {
  const radios = document.querySelectorAll('input[name="tree-type"]');
  const addBtn = document.getElementById("add-btn");
  const clearBtn = document.getElementById('clear-btn');
  const removeBtn = document.getElementById('remove-btn');
  
  addBtn.addEventListener("click", addNode);
  clearBtn.addEventListener("click", newTree);
  removeBtn.addEventListener("click", removeNode);
  radios.forEach((radio) =>
    radio.addEventListener("change", handleRadioChange)
  );

  renderTree();
});

function handleRadioChange(el) {
  if (currentTree.countNodes() > 0) {
    if (!confirm("Os nós atuais serão perdidos. Deseja continuar ?")) {
      return;
    }
  }

  const typeTreeElement = document.getElementById("tree-type-display");
  typeTreeElement.textContent = el.target.value;
  selectedTree = el.target.value;

  newTree();
}

function addNode() {
  const value = Number(document.getElementById("node-input").value);
  currentTree.insert(value);

  renderTree();
  document.getElementById("node-input").value = "";
}

function removeNode() {
  const value = Number(document.getElementById("node-input").value);
  currentTree.remove(value);

  renderTree();
  document.getElementById("node-input").value = "";
}

function newTree() {
  if (selectedTree === "AVL") currentTree = new AVLTree();
  else currentTree = new RedBlackTree();

  renderTree();
}

function updateStats() {  
  const nodesCountDisplay = document.getElementById('nodes-count');
  const levelsCountDisplay = document.getElementById('levels-count');

  nodesCountDisplay.textContent = currentTree.countNodes();
  levelsCountDisplay.textContent = currentTree.getHeight();
}

function treeToD3(node) {
  if (!node) return null;
  const obj = {
    name: node.value.toString(),
    height: node.height,
    color: node.color || null,
    balance:
      (node.left ? node.left.height : 0) - (node.right ? node.right.height : 0),
    children: []
  };
  if (node.left) obj.children.push(treeToD3(node.left));
  if (node.right) obj.children.push(treeToD3(node.right));
  return obj;
}

function setupD3() {
  const svg = d3.select("svg");
  const g = svg.append("g").attr("transform", "translate(400,50)");
  const treeLayout = d3.tree().nodeSize([60, 80]);

  return { svg, g, treeLayout};
}

function renderTree() {
  updateStats();

  const data = treeToD3(currentTree.root);
  g.selectAll("*").remove();
  if (!data) return;

  const root = d3.hierarchy(data);
  treeLayout(root);

  const linkGen = d3
    .linkVertical()
    .x((d) => d.x)
    .y((d) => d.y);

  g.selectAll("path.link")
    .data(root.links())
    .enter()
    .append("path")
    .attr("class", "link")
    .attr("fill", "none")
    .attr("stroke", "#aaa")
    .attr("stroke-width", 2)
    .attr("d", linkGen);

  const node = g
    .selectAll("g.node")
    .data(root.descendants())
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", (d) => `translate(${d.x},${d.y})`);

  node
    .append("circle")
    .attr("r", 27)
    .attr("fill", (d) => d.data.color ? d.data.color : "#234d20");
    
  node
    .append("text")
    .attr("text-anchor", "middle")
    .attr("dy", "0.35em")
    .attr("fill", "white")
    .attr("font-size", "14px")
    .text((d) => d.data.name);
}
