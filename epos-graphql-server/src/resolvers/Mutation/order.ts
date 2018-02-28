import { getUserId, Context } from '../../utils'

export const order = {
    async createOrder(parent, { custId, products }, ctx: Context, info) {
        let graphProds = products.map(item => ({
            product: {
                connect: {
                    id: item.id
                }
            }
        }))
        return ctx.db.mutation.createOrder(
            {
                data: {
                    customer: {
                        connect: { id: custId }
                    },
                    lineItems: {
                        create: products
                    }
                }
            },
            info
        )
    }
}