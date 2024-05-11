class TreeNode {
    public key: string;
    public value: string;
    public data: string;
    public children: TreeNode[];
    public parent: null | TreeNode

    constructor(key: string, value = key, parent=null) {
        this.key = key
        this.value = value
        this.parent = parent
        this.children = []
    }

    get isLeaf() {
        return this.children.length === 0;
    }

    get hasChildren() {
        return !this.isLeaf;
    }
}

class Tree {
    public root: TreeNode

    constructor(key: string, value=key) {
        this.root = new TreeNode(key, value)
    }

    *preOrderTraversal(node=this.root) {
        yield node;
        if (node.children.length) {
            for (let child of node.children) {
                yield* this.preOrderTraversal(child);
            }
        }
    }

    *postOrderTraversal(node=this.root) {
        if (node.children.length) {
            for (let child of node.children) {
                yield* this.postOrderTraversal(child)
            }
        }
        yield node;
    }

    insert(parentNodeKey: string, key: string, value=key) {
        for (let node of this.preOrderTraversal()) {
            if (node.key === parentNodeKey) {
                node.children.push(new TreeNode(key, value, node))
                return true
            }
        }
        return false
    }

    remove(key: string) {
        for (let node of this.preOrderTraversal()) {
            const filtered = node.children.filter(c => c.key !== key)
            if ( filtered.length !== node.children.length) {
                node.children = filtered
                return true
            }
        }
        return false
    }

    find(key:string) {
        for (let node of this.preOrderTraversal()) {
            if (node.key === key) {
                return node
            }
        }
        return undefined
    }
}

export default Tree