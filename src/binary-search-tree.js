const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */

class BinarySearchTree {
  treeRoot = null;
  root() {
    return this.treeRoot;
  }

  add(data) {
    if (!this.treeRoot) {
      this.treeRoot = new Node(data);
    } else {
      let current = this.treeRoot;

      while (true) {
        if (data > current.data && current.right) {
          current = current.right;
        } else if (data > current.data && !current.right) {
          current.right = new Node(data);
          break;
        } else if (data < current.data && current.left) {
          current = current.left;
        } else if (data < current.data && !current.left) {
          current.left = new Node(data);
          break;
        }
      }
    }
  }

  has(data) {
    let current = this.treeRoot;
    while (true) {
      if (current.right && data > current.data) {
        current = current.right;
      } else if (!current.right && data > current.data) {
        return false;
      } else if (current.left && data < current.data) {
        current = current.left;
      } else if (!current.left && data < current.data) {
        return false;
      } else if (data == current.data) {
        return true;
      }
    }
  }
  find(data) {
    let current = this.treeRoot;
    while (true) {
      if (current.right && data > current.data) {
        current = current.right;
      } else if (!current.right && data > current.data) {
        return null;
      } else if (current.left && data < current.data) {
        current = current.left;
      } else if (!current.left && data < current.data) {
        return null;
      } else if (data == current.data) {
        return current;
      }
    }
  }

  remove(data) {
    this.treeRoot = this.deleteNode(this.treeRoot, data);
  }

  deleteNode(root, data) {
    if (root === null) {
      return null;
    }

    if (data < root.data) {
      root.left = this.deleteNode(root.left, data);
    } else if (data > root.data) {
      root.right = this.deleteNode(root.right, data);
    } else {
      if (root.left === null && root.right === null) {
        return null;
      }

      if (root.left === null) {
        return root.right;
      } else if (root.right === null) {
        return root.left;
      }

      let minNode = root.right;
      while (minNode.left !== null) {
        minNode = minNode.left;
      }
      root.data = minNode.data;
      root.right = this.deleteNode(root.right, minNode.data);
    }

    return root;
  }

  min() {
    let current = this.treeRoot;
    while (current.left) {
      current = current.left;
    }
    return current.data;
  }

  max() {
    let current = this.treeRoot;
    while (current.right) {
      current = current.right;
    }
    return current.data;
  }
}

module.exports = {
  BinarySearchTree,
};
