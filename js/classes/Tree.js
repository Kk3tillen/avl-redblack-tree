export class Tree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    throw new Error('Método add() deve ser implementado');
  }

  remove(value) {
    throw new Error('Método remove() deve ser implementado');
  }

  find(value) {
    throw new Error('Método find() deve ser implementado');
  }

  getHeight() {
    throw new Error('Método getHeight() deve ser implementado');
  }

  countNodes(node = this.root) {
    if (!node) return 0;
    return 1 + this.countNodes(node.left) + this.countNodes(node.right);
  }

  clear() {
    this.root = null;
  }

  isEmpty() {
    return this.root === null;
  }
}