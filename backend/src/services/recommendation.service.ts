import { prisma } from "../lib/prisma";

export async function getCategoryRecommendations(productId: number) {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    return [];
  }

  return prisma.product.findMany({
    where: {
      categoryId: product.categoryId,

      NOT: {
        id: productId,
      },
    },

    include: {
      category: true,
    },

    orderBy: {
      createdAt: "desc",
    },

    take: 8,
  });
}
