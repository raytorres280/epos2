import { Context } from '../../utils'

export const ingredient = {
    async createIngredient(parent, { name, categoryId }, ctx: Context, info) {
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

    async updateIngredient(parent, { name, ingredientId }, ctx: Context, info) {
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
}