import { NextResponse } from "next/server";
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

interface User { id: number; nombre: string; apellido: string; username: string; email: string; password: string; escuela: string; grado: string; grupo: string; createdAt: Date; };

export async function GET( ){
    try {
        // Obtener la sesión actual del usuario
        const session = await getServerSession(authOptions);
        
        // Verificar si el usuario está autenticado
        if (!session) {
          return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
        }

        const userId = parseInt(session.user.id);

        const dataUser = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        const quizzes = await prisma.quizz.findMany({
            where: {
                estudianteId: userId
            }
        });

        const {password, ...user} = dataUser as User;

        return NextResponse.json({ user, quizzes }, { status: 201 });
    }
    catch (error) {
        console.error('Error al cargar los resultados de los cuestionarios del usuario:', error);
        return null;
    }
}