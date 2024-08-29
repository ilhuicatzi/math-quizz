"use client"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { MenuQuizzes } from "@/lib/dashboard/MenuQuizzes";
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
            Elige una seccion para comenzar.
          </CardDescription>
        </CardHeader>
        <CardContent>
        <Accordion type="single" collapsible>
        {
          MenuQuizzes.map((quiz) => (
            <AccordionItem value={quiz.id} key={quiz.id}>
              <AccordionTrigger className="text-lg">
                {quiz.area}
              </AccordionTrigger>
              <AccordionContent>
                {quiz.abstract}
                <div className="mt-4 grid gap-y-4">
                  {
                    quiz.quizzesTopic.map((topic) => (
                      <div key={topic.id} className="w-11/12 pl-4 pr-1 py-0.5 rounded-xl hover:bg-muted flex justify-between items-center">
                        <div>
                          <p className="text-sm font-semibold">{topic.topic}</p>
                          <p className="text-xs text-zinc-500">{topic.description}</p>
                        </div>
                        <Button 
                        size="sm"
                          onClick={() => {
                            router.push(`${topic.path}`);
                          }
                        }
                          className={`
                          ${quiz.colorSeccion} text-zinc-50
                          `}>
                          Iniciar
                        </Button>
                      </div>
                    ))
                  }
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
