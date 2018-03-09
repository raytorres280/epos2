// line item class to work with line item table.
export default class LineItemModel {
    productId: string
    purchasePrice: number
    qty: number
    instructions: string
 
    constructor(productId: string, purchasePrice: number, qty: number, instructions: string) {
        this.productId = productId
        this.purchasePrice = purchasePrice
        this.qty = qty
        this.instructions = instructions
    }

    incrementQty() {
        this.qty++
    }
    decrementQty() {
        this.qty--
    }
    editInstructions(newInstructions: string) {
        this.instructions = newInstructions
    }
}