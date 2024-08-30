"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const components: {
  id: number;
  title: string;
  href: string;
  description: string;
}[] = [
  {
    id: 1,
    title: "Nueva Área",
    href: "/admins/curriculum/new/newArea",
    description: "Crea una nueva área de la curricula.",
  },
  {
    id: 4,
    title: "Editar Área",
    href: "/admins/curriculum/edit/editArea/1",
    description: "Edita una área de la curricula.",
  },
  {
    id: 2,
    title: "Nuevo Tema",
    href: "/admins/curriculum/new/newTopic",
    description: "Crea un nuevo tema de la curricula.",
  },
  {
    id: 5,
    title: "Editar Tema",
    href: "/admins/curriculum/edit/editTopic/1",
    description: "Edita un tema de la curricula.",
  },
  {
    id: 3,
    title: "Nueva Pregunta",
    href: "/admins/curriculum/new/newQuestion",
    description: "Crea una nueva pregunta de la curricula.",
  },

  {
    id: 6,
    title: "Editar Pregunta",
    href: "/admins/curriculum/edit/editQuestion/1",
    description: "Edita una pregunta de la curricula.",
  },
];

export function NavigationMenuAdmin() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Inicio</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    href="/admins/curriculum"
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Math/Quizz
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Matemáticas para todos.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem
                href="/admins/curriculum/views/area"
                title="Ver Áreas"
              >
                Áreas de la curricula
              </ListItem>
              <ListItem
                href="/admins/curriculum/views/topic"
                title="Ver Temas"
              >
                Temas de la curricula
              </ListItem>
              <ListItem
                href="/admins/curriculum/views/questions"
                title="Ver Preguntas"
              >
                Preguntas de la curricula
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Formularios</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/admins/curriculum/raw" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentación
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={props.href ?? ""}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
