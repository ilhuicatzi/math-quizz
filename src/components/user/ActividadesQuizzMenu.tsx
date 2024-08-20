"use client"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { QuizzesMenuData } from "@/lib/menuQuizzData";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


function ActividadesQuizzMenu() {
  const router = useRouter();
  return (
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Quizzes</CardTitle>
          <CardDescription className="text-sm text-zinc-500">
            Elige un quizz para comenzar.
          </CardDescription>
        </CardHeader>
        <CardContent>
        <Accordion type="single" collapsible>
        {
          QuizzesMenuData.map((quiz) => (
            <AccordionItem value={quiz.id} key={quiz.id}>
              <AccordionTrigger>
                {quiz.title}
              </AccordionTrigger>
              <AccordionContent>
                {quiz.description}
                <div className="mt-4 flex justify-end">
                    <Button 
                    onClick={() => {
                      router.push(`${quiz.path}`);
                    }
                  }
                    className={`${quiz.color1} text-zinc-50 ${quiz.color2}`}>
                      Iniciar
                    </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))
        }
        </Accordion>
        </CardContent>
      </Card>
  );
}

export default ActividadesQuizzMenu;
