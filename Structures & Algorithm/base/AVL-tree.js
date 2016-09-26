const LH = 1
const EH = 0
const RH = -1

class AVL {
	constructor() {
		this.data = null
		this.bf = 0
		this.lchild = null
		this.rchild = null
	}

	rRotate() {
		const lchild = this.lchild
		this.lchild = this.rchild
		this.rchild = this
		this = lchild
	}

	lRotate() {
		const rchild = this.rchild
		this.rchild = this.lchild
		this.lchild = this
		this = rchild
	}

	lBalance() {
		// 获取左子树节点
		const { lchild } = this
		// 根据左子树平衡因子作出对应处理
		switch(lchild.bf) {
			// 左高
			case LH:
				this.bf = lchild.bf = EH
				this.rRotate()
				break
			// 右高
			case RH:
				const { rchild } = this
				switch (rchild.bf) {
					case LH:
						// 平衡因子设置为右高，左子树平衡因子设置为等高
						this.bf = RH
						lchild.bf = EH
						break
					case EH:
						this.bf = lchild = EH
						break
					case RH:
						this.bf = EH
						lchild.bf = LH
						break
				}
				lchild.bf = EH
				lchild.lRotate()
				this.rRotate()
		}
	}

}
