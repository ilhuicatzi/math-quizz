/*
  Warnings:

  - Added the required column `issue` to the `QuestionTopic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `branch` to the `Topics` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_QuestionTopic" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "questionId" TEXT NOT NULL,
    "questionTitle" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "issue" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "topicId" INTEGER NOT NULL,
    CONSTRAINT "QuestionTopic_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topics" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_QuestionTopic" ("createdAt", "id", "question", "questionId", "questionTitle", "topicId", "updatedAt") SELECT "createdAt", "id", "question", "questionId", "questionTitle", "topicId", "updatedAt" FROM "QuestionTopic";
DROP TABLE "QuestionTopic";
ALTER TABLE "new_QuestionTopic" RENAME TO "QuestionTopic";
CREATE TABLE "new_Topics" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "topicId" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "colorTopic" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "curriculumId" INTEGER NOT NULL,
    CONSTRAINT "Topics_curriculumId_fkey" FOREIGN KEY ("curriculumId") REFERENCES "Curriculum" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Topics" ("colorTopic", "createdAt", "curriculumId", "description", "duration", "id", "path", "topic", "topicId", "updatedAt") SELECT "colorTopic", "createdAt", "curriculumId", "description", "duration", "id", "path", "topic", "topicId", "updatedAt" FROM "Topics";
DROP TABLE "Topics";
ALTER TABLE "new_Topics" RENAME TO "Topics";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
