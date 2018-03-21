import { Context } from '../../utils'

export const product = {
    async createProduct(parent, { name, categoryId }, ctx: Context, info) {
        return ctx.db.mutation.createIngredient(
            {
                data: {
                    name: "water",
                    category: {
                        // change once you can make name field unique.
                        // this is the 'none' category
                        connect: { id: "cjf0n1ql600eo0131jmrefbli" }
                    }
                }
            },
            info
        )
    },

    async updateProduct(parent, { name, ingredientId }, ctx: Context, info) {
        return ctx.db.mutation.updateIngredient(
            {
                data: {
                    name
                },
                where: {
                    id: ingredientId
                }
            },
            info
        )
    },

    async addIngredientToProduct(parent, { ingredientId, productId }, ctx: Context, info) {
        return ctx.db.mutation.updateProduct(
            {
                data: {
                    ingredients: {
                        connect: [
                            { id: ingredientId }
                        ]
                    }
                },
                where: { id: productId }
            },
            info
        )
    }
}