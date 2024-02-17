import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  logout: protectedProcedure.query(({ ctx }) => {
    return ctx.session.expires;
  }),
  getSession: protectedProcedure.query(({ ctx }) => {
    return ctx.session.user;
  }),
});
