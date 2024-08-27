import { z } from "zod";

export const FormSchemaQuestions = z.object({
  question1: z.enum(["1-r1", "1-r2", "1-r3", "1-r4"], {
    required_error: "Debes seleccionar una respuesta",
  }),
  question2: z.enum(["2-r1", "2-r2", "2-r3", "2-r4"], {
    required_error: "Debes seleccionar una respuesta",
  }),
  question3: z.enum(["3-r1", "3-r2", "3-r3", "3-r4"], {
    required_error: "Debes seleccionar una respuesta",
  }),
  question4: z.enum(["4-r1", "4-r2", "4-r3", "4-r4"], {
    required_error: "Debes seleccionar una respuesta",
  }),
  question5: z.enum(["5-r1", "5-r2", "5-r3", "5-r4"], {
    required_error: "Debes seleccionar una respuesta",
  }),
  question6: z.enum(["6-r1", "6-r2", "6-r3", "6-r4"], {
    required_error: "Debes seleccionar una respuesta",
  }),
  question7: z.enum(["7-r1", "7-r2", "7-r3", "7-r4"], {
    required_error: "Debes seleccionar una respuesta",
  }),
  question8: z.enum(["8-r1", "8-r2", "8-r3", "8-r4"], {
    required_error: "Debes seleccionar una respuesta",
  }),
  question9: z.enum(["9-r1", "9-r2", "9-r3", "9-r4"], {
    required_error: "Debes seleccionar una respuesta",
  }),
  question10: z.enum(["10-r1", "10-r2", "10-r3", "10-r4"], {
    required_error: "Debes seleccionar una respuesta",
  }),
});
