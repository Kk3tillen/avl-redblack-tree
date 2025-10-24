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

  clear() {
    this.root = null;
  }

  isEmpty() {
    return this.root === null;
  }
}