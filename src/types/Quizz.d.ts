// model Quizz {
//     id           Int             @id @default(autoincrement())
//     titulo       String
//     respuestas   RespuestaQuiz[]
//     calificacion Float?
//     createdAt    DateTime        @default(now())
//     updatedAt    DateTime        @updatedAt
//     estudiante   User            @relation(fields: [estudianteId], references: [id])
//     estudianteId Int
//   }

// model RespuestaQuiz {
//     id        Int    @id @default(autoincrement())
//     question1 String
//     question2 String
//     question3 String
//     question4 String
//     question5 String
//     quizz     Quizz  @relation(fields: [quizzId], references: [id])
//     quizzId   Int
//   }
export interface Quizz {
    id: number;
    titulo: string;
    calificacion: number | null;
    createdAt: Date;
    estudianteId: number;
}

export interface QuizzFull {
    id: number;
    titulo: string;
    calificacion: number | null;
    createdAt: Date;
    updatedAt: Date;
    estudianteId: number;
    respuestas: RespuestaQuiz[];
}

export interface RespuestaQuiz {
    id: number;
    question1: string;
    question2: string;
    question3: string;
    question4: string;
    question5: string;
    quizzId: number;
}