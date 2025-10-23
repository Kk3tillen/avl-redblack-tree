import { Tree } from "./tree.js";
import { RBNode } from "./RBNode.js";

export class RedBlackTree extends Tree {  
  constructor() {
    super();  
  }

  add(value) {
    const newNode = new RBNode(value);

    if (this.root === null) {
      this.root = newNode;
      this.root.makeBlack();
      return;
    }

    let current = this.root;
    let parent = null;

    while (current !== null) {
      parent = current;

      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        return;
      }
    }

    newNode.parent = parent;

    if (value < parent.value) {
      parent.left = newNode;
    } else {
      parent.right = newNode;
    }

    this.fixInsert(newNode);
  }

  fixInsert(node) {
    while (node !== this.root && node.parent.isRed()) {
      if (node.parent === node.parent.parent.left) {
        const uncle = node.parent.parent.right;

        // Caso 1: Tio é vermelho
        if (uncle !== null && uncle.isRed()) {
          node.parent.makeBlack();
          uncle.makeBlack();
          node.parent.parent.makeRed();
          node = node.parent.parent;
        } else {
          // Caso 2: Tio é preto e nó é filho direito
          if (node === node.parent.right) {
            node = node.parent;
            this.rotateLeft(node);
          }
          // Caso 3: Tio é preto e nó é filho esquerdo
          node.parent.makeBlack();
          node.parent.parent.makeRed();
          this.rotateRight(node.parent.parent);
        }
      } else {
        const uncle = node.parent.parent.left;

        // Caso 1: Tio é vermelho
        if (uncle !== null && uncle.isRed()) {
          node.parent.makeBlack();
          uncle.makeBlack();
          node.parent.parent.makeRed();
          node = node.parent.parent;
        } else {
          // Caso 2: Tio é preto e nó é filho esquerdo
          if (node === node.parent.left) {
            node = node.parent;
            this.rotateRight(node);
          }
          // Caso 3: Tio é preto e nó é filho direito
          node.parent.makeBlack();
          node.parent.parent.makeRed();
          this.rotateLeft(node.parent.parent);
        }
      }
    }

    this.root.makeBlack();
  }

  find(value, node = this.root) {
    if (node === null || node.value === value) {
      return node;
    }

    if (value < node.value) {
      return this.find(value, node.left);
    } else {
      return this.find(value, node.right);
    }
  }

  rotateLeft(node) {
    const rightChild = node.right;
    node.right = rightChild.left;

    if (rightChild.left !== null) {
      rightChild.left.parent = node;
    }

    rightChild.parent = node.parent;

    if (node.parent === null) {
      this.root = rightChild;
    } else if (node === node.parent.left) {
      node.parent.left = rightChild;
    } else {
      node.parent.right = rightChild;
    }

    rightChild.left = node;
    node.parent = rightChild;
  }

  rotateRight(node) {
    const leftChild = node.left;
    node.left = leftChild.right;

    if (leftChild.right !== null) {
      leftChild.right.parent = node;
    }

    leftChild.parent = node.parent;

    if (node.parent === null) {
      this.root = leftChild;
    } else if (node === node.parent.right) {
      node.parent.right = leftChild;
    } else {
      node.parent.left = leftChild;
    }

    leftChild.right = node;
    node.parent = leftChild;
  }

  display(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }

    console.log(
      prefix +
        (isLeft ? "├── " : "└── ") +
        node.value +
        (node.isRed() ? " (R)" : " (B)")
    );

    if (node.left !== null || node.right !== null) {
      if (node.left !== null) {
        this.display(node.left, prefix + (isLeft ? "│   " : "    "), true);
      }
      if (node.right !== null) {
        this.display(node.right, prefix + (isLeft ? "│   " : "    "), false);
      }
    }
  }
}
