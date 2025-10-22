export class TreeNode {
  constructor(value, { left = null, right = null, parent = null } = {}) {
    this.value = value;
    this.left = left;
    this.right = right;
    this.parent = parent;
    this.height = 1;
  }

  hasLeft() {
    return this.left !== null;
  }

  hasRight() {
    return this.right !== null;
  }
  
  isLeaf() {
    return !this.left && !this.right;
  }

  setLeft(node) {
    this.left = node;
    if (node) node.parent = this;
  }

  setRight(node) {
    this.right = node;
    if (node) node.parent = this;
  }
}
