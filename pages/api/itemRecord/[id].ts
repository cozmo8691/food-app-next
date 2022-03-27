import prisma from "lib/prisma";
import { validateRoute } from "lib/auth";

export default validateRoute(async (req, res, user) => {
  const userLists = await prisma.itemRecord.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  res.json(userLists);
});
