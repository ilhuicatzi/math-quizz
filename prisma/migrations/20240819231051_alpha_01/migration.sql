/*
  Warnings:

  - You are about to drop the column `escuela` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `grado` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `grupo` on the `User` table. All the data in the column will be lost.
  - Added the required column `nivel` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nivel" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("apellido", "createdAt", "email", "id", "nombre", "password", "username") SELECT "apellido", "createdAt", "email", "id", "nombre", "password", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
