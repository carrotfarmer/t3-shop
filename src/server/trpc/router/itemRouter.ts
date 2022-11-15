import { publicProcedure, router } from "../trpc";
import { z } from "zod";

export const itemRouter = router({
  addItem: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { name } = input;

      const item = await ctx.prisma.listItem.create({
        data: {
          name,
          checked: false,
        },
      });

      return item;
    }),

  getItems: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.listItem.findMany();
  }),

  deleteItem: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id } = input;

      const item = await ctx.prisma.listItem.delete({
        where: { id },
      });

      return item;
    }),

  toggleChecked: publicProcedure
    .input(
      z.object({
        id: z.string(),
        checked: z.boolean(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id, checked } = input;

      const item = await ctx.prisma.listItem.update({
        where: { id },
        data: { checked },
      });

      return item;
    }),
});
