import { redBlackEnum } from "../enums/redBlackEnum.js";
import { Tree } from "./Tree.js";
import { RBNode } from "./RBNode.js";

export class RedBlackTree extends Tree {
  constructor() {
    super();
  }

  insert(value) {
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

    this.afterInsert(newNode);
  }

  afterInsert(node) {
    while (node !== this.root && this.isNodeRed(node.parent)) {
      if (node.parent === node.parent.parent.left) {
        const uncle = node.parent.parent.right;

        // Caso 1: Tio é vermelho
        if (uncle !== null && this.isNodeRed(uncle)) {
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
        if (uncle !== null && this.isNodeRed(uncle)) {
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

  remove(value) {
    const nodeToRemove = this.find(value);

    if (nodeToRemove === null) {
      console.log("Valor não encontrado");
      return;
    }

    let successorNode = nodeToRemove;
    let childOfRemovedNode;
    let colorOfRemovedNode = nodeToRemove.color;

    if (nodeToRemove.left === null) {
      childOfRemovedNode = nodeToRemove.right;
      this.transplant(nodeToRemove, nodeToRemove.right);
    } else if (nodeToRemove.right === null) {
      childOfRemovedNode = nodeToRemove.left;
      this.transplant(nodeToRemove, nodeToRemove.left);
    } else {
      successorNode = this.findMin(nodeToRemove.right);
      colorOfRemovedNode = successorNode.color;
      childOfRemovedNode = successorNode.right;

      if (successorNode.parent === nodeToRemove) {
        if (childOfRemovedNode !== null) {
          childOfRemovedNode.parent = successorNode;
        }
      } else {
        this.transplant(successorNode, successorNode.right);
        successorNode.right = nodeToRemove.right;
        successorNode.right.parent = successorNode;
      }

      this.transplant(nodeToRemove, successorNode);
      successorNode.left = nodeToRemove.left;
      successorNode.left.parent = successorNode;
      successorNode.color = nodeToRemove.color;
    }

    if (colorOfRemovedNode === redBlackEnum.black) {
      this.afterRemove(childOfRemovedNode);
    }
  }

  afterRemove(node) {
    while (node !== this.root && this.isNodeBlack(node)) {
      if (node === null) {
        break;
      }

      if (node === node.parent.left) {
        let brother = node.parent.right;

        if (this.isNodeRed(brother)) {
          brother.makeBlack();
          node.parent.makeRed();
          this.rotateLeft(node.parent);
          brother = node.parent.right;
        }

        if (this.isNodeBlack(brother.left) && this.isNodeBlack(brother.right)) {
          brother.makeRed();
          node = node.parent;
        } else {
          if (this.isNodeBlack(brother.right)) {
            if (brother.left !== null) {
              brother.left.makeBlack();
            }
            brother.makeRed();
            this.rotateRight(brother);
            brother = node.parent.right;
          }

          brother.color = node.parent.color;
          node.parent.makeBlack();
          if (brother.right !== null) {
            brother.right.makeBlack();
          }
          this.rotateLeft(node.parent);
          node = this.root;
        }
      } else {
        let brother = node.parent.left;

        if (this.isNodeRed(brother)) {
          brother.makeBlack();
          node.parent.makeRed();
          this.rotateRight(node.parent);
          brother = node.parent.left;
        }

        if (this.isNodeBlack(brother.left) && this.isNodeBlack(brother.right)) {
          brother.makeRed();
          node = node.parent;
        } else {
          if (this.isNodeBlack(brother.left)) {
            if (brother.right !== null) {
              brother.right.makeBlack();
            }
            brother.makeRed();
            this.rotateLeft(brother);
            brother = node.parent.left;
          }

          brother.color = node.parent.color;
          node.parent.makeBlack();
          if (brother.left !== null) {
            brother.left.makeBlack();
          }
          this.rotateRight(node.parent);
          node = this.root;
        }
      }
    }

    if (node !== null) {
      node.makeBlack();
    }
  }

  findMin(node = this.root) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  transplant(oldNode, newNode) {
    if (oldNode.parent === null) {
      this.root = newNode;
    } else if (oldNode === oldNode.parent.left) {
      oldNode.parent.left = newNode;
    } else {
      oldNode.parent.right = newNode;
    }

    if (newNode !== null) {
      newNode.parent = oldNode.parent;
    }
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

  isNodeBlack(node) {
    if (node === null) {
      return true;
    }
    return node.color === redBlackEnum.black;
  }

  isNodeRed(node) {
    if (node === null) {
      return false;
    }
    return node.color === redBlackEnum.red;
  }

  getHeight(node = this.root) {
    if (node === null) {
      return 0;
    }

    return 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
  }
}
