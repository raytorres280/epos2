import { getUserId, Context } from '../../utils'

export const customer = {
    async createCustomer(parent, { first, last, city, state, zip, cardNum }, ctx: Context, info) {
        return ctx.db.mutation.createCustomer(
            {
                data: {
                    first,
                    last,
                    city,
                    state,
                    zip,
                    cardNum
                }
            },
            info
        )
    },

    async updateCustomer(parent, { first, last, city, state, zip, cardNum, customerId }, ctx: Context. info) {
        return ctx.db.mutation.updateCustomer(
            {
                data: {
                    first,
                    last,
                    city,
                    state,
                    zip,
                    cardNum
                },
                where: { id: customerId }
            }
        )
    }
}