import prisma from "lib/prisma";
import { validateRoute } from "lib/auth";

// id        Int      @id @default(autoincrement())
// createdAt DateTime @default(now())
// updatedAt DateTime @updatedAt
// quantity  Int
// size      Int?
// value     Int
// item      Item     @relation(fields: [itemId], references: [id])
// itemId    Int
// user      User     @relation(fields: [userId], references: [id])
// userId    Int

export default validateRoute(async (req, res, user) => {
  const newItemRecord = await prisma.itemRecord.create({
    data: {
      item: {
        connect: { id: req.body.itemId },
      },
      itemQuantity: req.body.itemQuantity,
      itemSize: req.body.itemSize,
      itemValue: req.body.itemValue,
      user: {
        connect: { id: user.id },
      },
    },
  });

  res.json(newItemRecord);
});
