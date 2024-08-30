// Objetivo: Contiene la información de los temas de los quizzes para mostrar en el menú de quizzes
export const MenuQuizzes = [
    {
      id: "aritmetica",
      area: "Aritmética",
      abstract:
        "Aquí encontrarás temas relacionados con operaciones básicas con números enteros y fraccionarios, así como conceptos de proporcionalidad y porcentajes.",
      quizzesTopic: [
        {
          id: "1.1",
          topic: "Suma de Fracciones",
          duration: "5 minutos",
          description: "Aprende a sumar fracciones con diferente denominador.",
          path: "/pages/user/quizzes/aritmetica/sumaFracciones",
          modulo: "SumaFracciones",
          pathModulo:"/lib/quizz/AritmeticaQuizzes"
        },
        {
          id: "1.2",
          topic: "Resta de Fracciones",
          duration: "5 minutos",
          description: "Aprende a restar fracciones con diferente denominador.",
          path: "/pages/user/quizzes/aritmetica/restaFracciones",
          modulo: "RestaFracciones",
          pathModulo:"/lib/quizz/AritmeticaQuizzes"
        },
      ],
      colorSeccion: "bg-teal-600",
    },
    {
      id: "algebra",
      area: "Álgebra",
      abstract:
        "Aquí encontrarás temas relacionados con reducción de términos semejantes, multiplicación de polinomios, productos notables, factorización y resolución de ecuaciones de primer y segundo grado.",
      quizzesTopic: [
        {
          id: "2.1",
          topic: "Reducción de Términos Semejantes",
          duration: "5 minutos",
          description: "Aprende a reducir términos semejantes.",
          path: "/pages/user/quizzes/algebra/terminosSemejantes",
          modulo: "terminosSemejantes",
          pathModulo:"/lib/quizz/AlgebraQuizzes"
        },
        {
          id: "2.2",
          topic: "Multiplicación de Monomios",
          duration: "5 minutos",
          description: "Aprende a multiplicar Monomios",
          path: "/pages/user/quizzes/algebra/multiplicacionMonomios",
          modulo: "multiplicacionMonomios",
          pathModulo:"/lib/quizz/AlgebraQuizzes"
        },
      ],
      colorSeccion: "bg-rose-600",
    }
  ];