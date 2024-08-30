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