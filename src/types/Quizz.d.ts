// model Quizz {
//   id           Int             @id @default(autoincrement())
//   area         String
//   topicId      String
//   topic        String
//   respuestas   RespuestaQuiz[]
//   calificacion Float?
//   createdAt    DateTime        @default(now())
//   updatedAt    DateTime        @updatedAt
//   estudiante   User            @relation(fields: [estudianteId], references: [id])
//   estudianteId Int
// }

// model RespuestaQuiz {
//   id        Int    @id @default(autoincrement())
//   question1 String
//   question2 String
//   question3 String
//   question4 String
//   question5 String
//   quizz     Quizz  @relation(fields: [quizzId], references: [id])
//   quizzId   Int
// }
export interface Quizz {
    id: number;
    area: string;
    topicId: string;
    topic: string;
    calificacion: number | null;
    createdAt: Date;
    estudianteId: number;
}

export interface QuizzFull extends Quizz {
    respuestas: RespuestaQuiz[];
    updatedAt: Date;
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

export interface QuestionType {
    id: number;
    area: string;
    quizz_id: string;
    description: string;
    options: QuestionOptions[];
    correctAnswer: string;
  }
  
  export interface QuestionOptions {
    id: string;
    value: string;
    item: string;
    color: string;
  }
  
  export interface ResponseType {
    idQuestion: number;
    idOption: string;
  }