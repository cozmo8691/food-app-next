import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { itemsData } from "./itemsData";

const prisma = new PrismaClient();

const run = async () => {
  const salt = bcrypt.genSaltSync();
  const user = await prisma.user.upsert({
    where: { email: "jeffpenketh@gmail.com" },
    update: {},
    create: {
      email: "jeffpenketh@gmail.com",
      password: bcrypt.hashSync("password101", salt),
      firstName: "Jeff",
      lastName: "Penketh",
    },
  });

  await Promise.all(
    itemsData.map(async (item) => {
      await prisma.item.create({
        data: {
          name: item.name,
          description: item.description,
        },
      });
    })
  );

  const [item] = await prisma.item.findMany({});

  await prisma.itemRecord.create({
    data: {
      itemQuantity: 1,
      itemSize: 2,
      itemValue: 12,
      user: {
        connect: { id: user.id },
      },
      item: {
        connect: { id: item.id },
      },
    },
  });
};

run()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
