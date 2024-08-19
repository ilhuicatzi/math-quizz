/*
  Warnings:

  - You are about to drop the column `calificacion` on the `Respuesta` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Quizz" ADD COLUMN "calificacion" REAL;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Respuesta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "question1" TEXT NOT NULL,
    "question2" TEXT NOT NULL,
    "question3" TEXT NOT NULL,
    "question4" TEXT NOT NULL,
    "question5" TEXT NOT NULL,
    "question6" TEXT NOT NULL,
    "question7" TEXT NOT NULL,
    "question8" TEXT NOT NULL,
    "question9" TEXT NOT NULL,
    "question10" TEXT NOT NULL,
    "quizzId" INTEGER NOT NULL,
    CONSTRAINT "Respuesta_quizzId_fkey" FOREIGN KEY ("quizzId") REFERENCES "Quizz" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Respuesta" ("id", "question1", "question10", "question2", "question3", "question4", "question5", "question6", "question7", "question8", "question9", "quizzId") SELECT "id", "question1", "question10", "question2", "question3", "question4", "question5", "question6", "question7", "question8", "question9", "quizzId" FROM "Respuesta";
DROP TABLE "Respuesta";
ALTER TABLE "new_Respuesta" RENAME TO "Respuesta";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
