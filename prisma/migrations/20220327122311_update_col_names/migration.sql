/*
  Warnings:

  - You are about to drop the column `quantity` on the `ItemRecord` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `ItemRecord` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `ItemRecord` table. All the data in the column will be lost.
  - Added the required column `itemQuantity` to the `ItemRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemValue` to the `ItemRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ItemRecord" DROP COLUMN "quantity",
DROP COLUMN "size",
DROP COLUMN "value",
ADD COLUMN     "itemQuantity" INTEGER NOT NULL,
ADD COLUMN     "itemSize" INTEGER,
ADD COLUMN     "itemValue" INTEGER NOT NULL;
