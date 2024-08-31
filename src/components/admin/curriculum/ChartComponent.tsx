"use client"

import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardFooter } from "@/components//ui/card"
import { ChartContainer } from "@/components//ui/chart"
import { Separator } from "@/components//ui/separator"

interface dataCurriculum {
    curriculum: number
    topics: number
    questions: number
    }

export default function ChartDataComponent({ data }: { data: dataCurriculum }) {
  return (
    <Card className="max-w-sm">
      <CardContent className="flex gap-4 p-4 pb-2">
        <ChartContainer
          config={{
            areas: {
              label: "areas",
              color: "hsl(var(--chart-1))",
            },
            topics: {
              label: "temas",
              color: "hsl(var(--chart-2))",
            },
            questions: {
              label: "preguntas",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[200px] w-full"
        >
          <BarChart
            margin={{
              left: 0,
              right: 0,
              top: 0,
              bottom: 10,
            }}
            data={[
              {
                activity: "topics",
                value: data.topics,
                label: "temas",
                fill: "var(--color-topics)",
              },
              {
                activity: "quizzes",
                value: data.questions,
                label: "preguntas",
                fill: "var(--color-questions)",
              },
              {
                activity: "areas",
                value: data.curriculum,
                label: "areas",
                fill: "var(--color-areas)",
              },
            ]}
            layout="vertical"
            barSize={32}
            barGap={3}
          >
            <XAxis type="number" dataKey="value" hide />
            <YAxis
              dataKey="activity"
              type="category"
              tickLine={false}
              tickMargin={4}
              axisLine={false}
              className="capitalize"
            />
            <Bar dataKey="value" radius={5}>
              <LabelList
                position="insideLeft"
                dataKey="label"
                fill="white"
                offset={8}
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-row border-t p-4">
        <div className="flex w-full items-center gap-2">
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-xs text-muted-foreground">áreas</div>
            <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
              {data.curriculum}
            </div>
          </div>
          <Separator orientation="vertical" className="mx-2 h-10 w-px" />
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-xs text-muted-foreground">preguntas</div>
            <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                {data.questions}
            </div>
          </div>
          <Separator orientation="vertical" className="mx-2 h-10 w-px" />
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-xs text-muted-foreground">temas</div>
            <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                {data.topics}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
