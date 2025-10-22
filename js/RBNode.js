import { redBlackEnum } from "./enums/redBlackEnum.js";
import { TreeNode } from "./TreeNode.js";

export class RBNode extends TreeNode {
  constructor(value, props) {
    super(value, props)
    this.color = redBlackEnum.red
  }

  isRed() {
    return this.color === redBlackEnum.red
  }

  isBlack() {
    return this.color === redBlackEnum.black
  }

  makeRed() {
    this.color = redBlackEnum.red
  }

  makeBlack() {
    this.color = redBlackEnum.black
  }
}