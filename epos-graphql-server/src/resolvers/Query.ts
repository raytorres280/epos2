import { getUserId, Context } from '../utils'

export const Query = {
  feed(parent, args, ctx: Context, info) {
    return ctx.db.query.posts({ where: { isPublished: true } }, info)
  },

  drafts(parent, args, ctx: Context, info) {
    const id = getUserId(ctx)

    const where = {
      isPublished: false,
      author: {
        id
      }
    }

    return ctx.db.query.posts({ where }, info)
  },

  post(parent, { id }, ctx: Context, info) {
    return ctx.db.query.post({ where: { id: id } }, info)
  },

  customers(parent, args, ctx: Context, info) {
    return ctx.db.query.customers({ where: { } }, info)
  },

  me(parent, args, ctx: Context, info) {
    const id = getUserId(ctx)
    return ctx.db.query.user({ where: { id } }, info)
  },
  orders(parent, args, ctx: Context, info) {
    return ctx.db.query.orders({}, info)
  },
  ordersUnpaid(parent, args, ctx: Context, info) {
    return ctx.db.query.orders({ where: { paid: false } }, info)
  },
  products(paren, args, ctx: Context, info) {
    return ctx.db.query.products({ where: { } }, info)
  }
}
