import { getUserId, Context } from '../../utils'

export const order = {
    async createOrder(parent, { customerId, products }, ctx: Context, info) {
        let graphProds = products.map(item => ({
            product: {
                connect: {
                    id: item
                }
            }
        }))
        return ctx.db.mutation.createOrder(
            {
                data: {
                    customer: {
                        connect: { id: customerId }
                    },
                    lineItems: {
                        create: graphProds
                    }
                }
            },
            info
        )
    }
}