import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export async function recommend(req: Request, res: Response) {
  try {
    // need userId
    const userId = req.user?.id;
    // find all data user click not duplicate
    const viewedRows = await prisma.userView.findMany({
      where: { userId },
      select: { productId: true },
      distinct: ["productId"],
    });
    const viewedIds = viewedRows.map((v) => v.productId);
    const mostClicked = await prisma.userView.groupBy({
      by: ["productId"],
      where: {
        userId: { not: userId },
        productId: { notIn: viewedIds },
      },
      _count: { productId: true },
      orderBy: { _count: { productId: "desc" } },
      take: 10,
    });

    const rankedIds = mostClicked.map((r) => r.productId);

    // fetch full product details
    const products = await prisma.product.findMany({
      where: { id: { in: rankedIds } },
      include: { category: true },
    });

    // re-sort to match click rank order
    const sorted = rankedIds
      .map((id) => {
        const product = products.find((p) => p.id === id);
        const clicks =
          mostClicked.find((r) => r.productId === id)?._count.productId ?? 0;
        return product ? { ...product, _clicks: clicks } : null;
      })
      .filter(Boolean);

    return { data: sorted as object[] };
  } catch (err) {
    console.error("[recommendService.getMostClickedRecs]", err);
    return { error: "Failed to fetch recommendations", status: 500 };
  }
}
