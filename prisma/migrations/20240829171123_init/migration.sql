/*
  Warnings:

  - You are about to drop the `Quizz` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Quizz";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Test";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Root" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "status" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "Curriculum" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "area" TEXT NOT NULL,
    "areaId" TEXT NOT NULL,
    "abstract" TEXT NOT NULL,
    "colorTopic" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "adminId" INTEGER NOT NULL,
    CONSTRAINT "Curriculum_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Topics" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "topicId" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "colorTopic" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "curriculumId" INTEGER NOT NULL,
    CONSTRAINT "Topics_curriculumId_fkey" FOREIGN KEY ("curriculumId") REFERENCES "Curriculum" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "QuestionTopic" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "questionId" TEXT NOT NULL,
    "questionTitle" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "topicId" INTEGER NOT NULL,
    CONSTRAINT "QuestionTopic_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topics" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OptionQuestion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "optionId" TEXT NOT NULL,
    "option" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "correct" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "questionId" INTEGER NOT NULL,
    CONSTRAINT "OptionQuestion_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "QuestionTopic" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Quizzes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "area" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "calificacion" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "estudianteId" INTEGER NOT NULL,
    CONSTRAINT "Quizzes_estudianteId_fkey" FOREIGN KEY ("estudianteId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tests" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "calificacion" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "estudianteId" INTEGER NOT NULL,
    CONSTRAINT "Tests_estudianteId_fkey" FOREIGN KEY ("estudianteId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RespuestaQuiz" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "question1" TEXT NOT NULL,
    "question2" TEXT NOT NULL,
    "question3" TEXT NOT NULL,
    "question4" TEXT NOT NULL,
    "question5" TEXT NOT NULL,
    "quizzId" INTEGER NOT NULL,
    CONSTRAINT "RespuestaQuiz_quizzId_fkey" FOREIGN KEY ("quizzId") REFERENCES "Quizzes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_RespuestaQuiz" ("id", "question1", "question2", "question3", "question4", "question5", "quizzId") SELECT "id", "question1", "question2", "question3", "question4", "question5", "quizzId" FROM "RespuestaQuiz";
DROP TABLE "RespuestaQuiz";
ALTER TABLE "new_RespuestaQuiz" RENAME TO "RespuestaQuiz";
CREATE TABLE "new_RespuestaTest" (
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
    "testId" INTEGER NOT NULL,
    CONSTRAINT "RespuestaTest_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Tests" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_RespuestaTest" ("id", "question1", "question10", "question2", "question3", "question4", "question5", "question6", "question7", "question8", "question9", "testId") SELECT "id", "question1", "question10", "question2", "question3", "question4", "question5", "question6", "question7", "question8", "question9", "testId" FROM "RespuestaTest";
DROP TABLE "RespuestaTest";
ALTER TABLE "new_RespuestaTest" RENAME TO "RespuestaTest";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Root_email_key" ON "Root"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");
