// line item class to work with line item table.
export default class CartItemModel {
    id: string
    name: string
    qty: number
    instructions: string
 
    constructor(id: string, name: string, qty: number, instructions: string) {
        this.id = id
        this.name = name
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