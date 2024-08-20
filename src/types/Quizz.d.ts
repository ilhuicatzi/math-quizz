export interface Quizz {
    id: number;
    titulo: string;
    calificacion: number | null;
    createdAt: Date;
    updatedAt: Date;
    estudianteId: number;
}