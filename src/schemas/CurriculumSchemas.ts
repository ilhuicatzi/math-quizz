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