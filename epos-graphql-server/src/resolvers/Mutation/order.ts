import { getUserId, Context } from '../../utils'

export const order = {
    async createOrder(parent, { customerId, lineItems }, ctx: Context, info) {
        let graphLineItems = lineItems.map(item => ({
            product: {
                connect: {
                    id: item.productId
                }
            },
            qty: item.qty,
            purchasePrice: item.purchasePrice,
            instructions: item.instructions

        }))
        return ctx.db.mutation.createOrder(
            {
                data: {
                    customer: {
                        connect: { id: customerId }
                    },
                    lineItems: {
                        create: graphLineItems
                    }
                }
            },
            info
        )
    },

    async updateOrderPaidStatus(parent, { id }, ctx: Context, info) {
        return ctx.db.mutation.updateOrder(
            {
                data: {
                    paid: true
                },
                where: { id }
            }
        )
    }
}