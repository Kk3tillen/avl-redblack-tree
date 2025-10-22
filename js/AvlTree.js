import { TreeNode } from "./TreeNode.js";

export class AVLTree {
  constructor() {
    this.root = null;
  }

  getHeight(node) {
    return node ? node.height : 0;
  }

  updateHeight(node) {
    if (node) {
      node.height =
        1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
    }
  }

  getBalanceFactor(node) {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
  }

  rotateRight(y) {
    const x = y.left;
    const T2 = x.right;
    x.setRight(y);
    y.setLeft(T2);
    this.updateHeight(y);
    this.updateHeight(x);
    return x;
  }

  rotateLeft(x) {
    const y = x.right;
    const T2 = y.left;
    y.setLeft(x);
    x.setRight(T2);
    this.updateHeight(x);
    this.updateHeight(y);
    return y;
  }

  add(value) {
    this.root = this.addRecursive(this.root, value);
    if (this.root) {
      this.root.parent = null;
    }
  }

  addRecursive(node, value) {
    if (node === null) {
      return new TreeNode(value);
    }
    if (value < node.value) {
      node.setLeft(this.addRecursive(node.left, value));
    } else if (value > node.value) {
      node.setRight(this.addRecursive(node.right, value));
    } else {
      return node;
    }
    this.updateHeight(node);
    return this.balance(node, value);
  }

  balance(node, insertedValue) {
    const balanceFactor = this.getBalanceFactor(node);
    if (balanceFactor > 1) {
      if (this.getBalanceFactor(node.left) >= 0) {
        return this.rotateRight(node);
      }
      if (this.getBalanceFactor(node.left) < 0) {
        node.setLeft(this.rotateLeft(node.left));
        return this.rotateRight(node);
      }
    }
    if (balanceFactor < -1) {
      if (this.getBalanceFactor(node.right) <= 0) {
        return this.rotateLeft(node);
      }
      if (this.getBalanceFactor(node.right) > 0) {
        node.setRight(this.rotateRight(node.right));
        return this.rotateLeft(node);
      }
    }
    return node;
  }

  find(value) {
    let current = this.root;
    while (current !== null) {
      if (value === current.value) {
        return current;
      } else if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return null;
  }

  countNodes(node = this.root) {
    if (!node) return 0;
    return 1 + this.countNodes(node.left) + this.countNodes(node.right);
  }

  isBalanced(node = this.root) {
    if (!node) return true;
    const balance = Math.abs(this.getBalanceFactor(node));
    return (
      balance <= 1 && this.isBalanced(node.left) && this.isBalanced(node.right)
    );
  }

  remove(value) {
    this.root = this.removeRecursive(this.root, value);
    if (this.root) {
      this.root.parent = null;
    }
  }

  removeRecursive(node, value) {
    if (node === null) {
      return null;
    }

    if (value < node.value) {
      node.setLeft(this.removeRecursive(node.left, value));
    } else if (value > node.value) {
      node.setRight(this.removeRecursive(node.right, value));
    } else {
      //casos de remoção

      //Nó sem filhos (folha)
      if (!node.left && !node.right) {
        return null;
      }

      //Nó com apenas um filho
      if (!node.left) {
        return node.right;
      }
      if (!node.right) {
        return node.left;
      }

      //Nó com dois filhos
      let successor = node.right;
      while (successor.left) {
        successor = successor.left;
      }

      //Substitui o valor do nó pelo sucessor
      node.value = successor.value;

      // Remove o sucessor da subárvore direita
      node.setRight(this.removeRecursive(node.right, successor.value));
    }

    // Atualiza altura e rebalanceia
    this.updateHeight(node);
    return this.balance(node, value);
  }
}
