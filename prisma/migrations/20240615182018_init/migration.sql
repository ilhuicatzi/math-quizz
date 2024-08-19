-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "escuela" TEXT NOT NULL,
    "grado" TEXT NOT NULL,
    "grupo" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Quizz" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "estudianteId" INTEGER NOT NULL,
    CONSTRAINT "Quizz_estudianteId_fkey" FOREIGN KEY ("estudianteId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Respuesta" (
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

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
