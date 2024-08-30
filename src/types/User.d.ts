// model User {
//   id        Int       @id @default(autoincrement())
//   nombre    String
//   apellido  String
//   username  String
//   email     String    @unique
//   password  String
//   nivel     String
//   createdAt DateTime  @default(now())
//   updatedAt DateTime  @updatedAt
//   organizacion     String
//   profile   Profile[]
//   quizzes   Quizz[]
//   tests     Test[]
// }

// model Profile {
//   id        Int      @id @default(autoincrement())
//   user      User     @relation(fields: [userId], references: [id])
//   userId    Int
//   avatar    String
//   phrase    String
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt
// }



export interface User {
    id: number;
    nombre: string;
    apellido: string;
    username: string;
    email: string;
    password: string;
    nivel: string;
    createdAt: Date;
  }

  export interface UserSession {
    id: string;
    nombre?: string | undefined;
    apellido?: string | undefined;
    email: string;
    nivel?: string | undefined;
    username?: string | undefined;
    isAdmin: boolean;
  }

export interface UserFull {
    id: number;
    nombre: string;
    apellido: string;
    username: string;
    email: string;
    password: string;
    nivel: string;
    createdAt: Date;
    updatedAt: Date;
    organizacion: string;
    profile: Profile[];
    quizzes: Quizz[];
    tests: Test[];
}

export interface Profile {
    id: number;
    userId: number;
    avatar: string;
    phrase: string;
    createdAt: Date;
}