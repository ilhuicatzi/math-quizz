// model Test {
//     id           Int             @id @default(autoincrement())
//     titulo       String
//     respuestas   RespuestaTest[]
//     calificacion Float?
//     createdAt    DateTime        @default(now())
//     updatedAt    DateTime        @updatedAt
//     estudiante   User            @relation(fields: [estudianteId], references: [id])
//     estudianteId Int
//   }

//   model RespuestaTest {
//     id         Int    @id @default(autoincrement())
//     question1  String
//     question2  String
//     question3  String
//     question4  String
//     question5  String
//     question6  String
//     question7  String
//     question8  String
//     question9  String
//     question10 String
//     test       Test   @relation(fields: [testId], references: [id])
//     testId     Int
//   }

export interface Test {
    id: number;
    titulo: string;
    calificacion: number | null;
    createdAt: Date;
    estudianteId: number;
}

export interface TestFull {
    id: number;
    titulo: string;
    calificacion: number | null;
    createdAt: Date;
    updatedAt: Date;
    estudianteId: number;
    respuestas: RespuestaTest[];
}

export interface RespuestaTest {
    id: number;
    question1: string;
    question2: string;
    question3: string;
    question4: string;
    question5: string;
    question6: string;
    question7: string;
    question8: string;
    question9: string;
    question10: string;
    testId: number;
}