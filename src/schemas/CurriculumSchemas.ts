import path from "path";
import { z } from "zod";

// model AreaFormSchema {
//     area       String
//     areaId     String
//     abstract   String
//     colorTopic String
//   }


export const AreaFormSchema = z.object({
    area: z.string().min(3),
    areaId: z.string().min(3),
    abstract: z.string().min(3),
    colorTopic: z.string().min(3),
});




// model Topics {
//     topicId      String
//     topic        String
//     duration     String
//     colorTopic   String
//     description  String
//     path         String
//     branch       String
//   }

export const TopicFormSchema = z.object({
    topicId: z.string().min(3),
    topic: z.string().min(3),
    duration: z.string().min(3),
    colorTopic: z.string().min(3),
    description: z.string().min(3),
    path: z.string().min(3),
    branch: z.string().min(3),
});



// model QuestionTopic {
//     questionId    String
//     questionTitle String
//     question      String
//     issue         String
//     topicId       Int

//     optionId   String
//     option     String
//     label      String
//     color      String
//     correct    Boolean
//     questionId Int
//   }

export const QuestionFormSchema = z.object({
    questionTitle: z.string().min(3),
    question: z.string().min(3),
    issue: z.string().min(3),

    option1: z.string().min(1),
    option2: z.string().min(1),
    option3: z.string().min(1),
    option4: z.string().min(1),
    correct: z.enum(["r1", "r2", "r3", "r4"], {
        required_error: "Debes seleccionar una respuesta correcta",
      }),
});