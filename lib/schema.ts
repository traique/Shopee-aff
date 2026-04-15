import { z } from "zod";

export const ShopeeItemSchema = z.object({
  item_basic: z.object({
    itemid: z.number(),
    shopid: z.number(),
    name: z.string(),
    price: z.number(),
    image: z.string(),
    historical_sold: z.number().optional(),
  }),
});

export const ShopeeResponseSchema = z.object({
  items: z.array(ShopeeItemSchema),
});
