import { redBlackEnum } from "../enums/redBlackEnum.js";
import { TreeNode } from "./TreeNode.js";

export class RBNode extends TreeNode {
  constructor(value, props) {
    super(value, props)
    this.color = redBlackEnum.red
  }

  makeRed() {
    this.color = redBlackEnum.red
  }

  makeBlack() {
    this.color = redBlackEnum.black
  }
}