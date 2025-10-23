import { AVLTree } from '../AvlTree.js';
import { RedBlackTree } from '../RedBlackTree.js';

class TreeVisualizer {
  constructor() {
    this.currentTree = new AVLTree();
    this.treeType = 'AVL';

    this.setupElements();
    this.setupEvents();
    this.updateDisplay();
  }

  setupElements() {
    this.avlRadio = document.getElementById('avl-radio');
    this.rbRadio = document.getElementById('rb-radio');
    this.nodeInput = document.getElementById('node-input');
    this.addBtn = document.getElementById('add-btn');
    this.removeBtn = document.getElementById('remove-btn');
    this.searchBtn = document.getElementById('search-btn');
    this.clearBtn = document.getElementById('clear-btn');
    this.treeTypeDisplay = document.getElementById('tree-type-display');
    this.nodesCountDisplay = document.getElementById('nodes-count');
    this.levelsCountDisplay = document.getElementById('levels-count');
    this.treeDisplay = document.getElementById('tree-display');
  }

  setupEvents() {
      this.avlRadio.addEventListener('change', () => this.changeTree('AVL'));
      this.rbRadio.addEventListener('change', () => this.changeTree('Red-Black'));

      this.addBtn.addEventListener('click', () => this.handleAdd());
      this.removeBtn.addEventListener('click', () => this.handleRemove());
      this.searchBtn.addEventListener('click', () => this.handleSearch());
      this.clearBtn.addEventListener('click', () => this.handleClear());
  }

  changeTree(type) {
      this.treeType = type;
      this.currentTree = type === 'AVL' ? new AVLTree() : new RedBlackTree();
      console.log("Árvore:", type);
      this.treeTypeDisplay.textContent = this.treeType;
      this.updateDisplay();
  }

  handleAdd() {
    const value = parseInt(this.nodeInput.value);
    if (!isNaN(value)) {
      this.currentTree.add(value);
      this.updateDisplay();
      this.nodeInput.value = '';
    }
  }

  handleRemove() {
    const value = parseInt(this.nodeInput.value);
    if (!isNaN(value)) {
      this.currentTree.remove(value);
      this.updateDisplay();
      this.nodeInput.value = '';
    }
  }

  handleSearch() {
    const value = parseInt(this.nodeInput.value);
    if (!isNaN(value)) {
      const found = this.currentTree.find(value);
      alert(found ? `Nó ${value} encontrado!` : `Nó ${value} não encontrado.`);
      this.nodeInput.value = '';
    }
  }

  handleClear() {
    this.currentTree.clear();
    this.updateDisplay();
  }

  updateDisplay() {
      this.treeTypeDisplay.textContent = this.treeType; 
      this.nodesCountDisplay.textContent = this.currentTree.countNodes
          ? this.currentTree.countNodes()
          : '0';
      this.levelsCountDisplay.textContent = this.currentTree.countLevels
          ? this.currentTree.countLevels()
          : '0';
      this.treeDisplay.textContent = this.currentTree.isEmpty()
          ? 'Árvore vazia - adicione nós para visualizar'
          : '';
  }
}

new TreeVisualizer();
