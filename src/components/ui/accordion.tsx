"use client";

import * as React from "react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { CaretDown } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";

/*
  shadcn-shaped accordion, wired to this project's tokens.

  Two deliberate departures from the reference implementation:

  - It imports from the unified `radix-ui` package, which this project already
    depends on, rather than pulling in `@radix-ui/react-accordion` separately.
    Same primitives, one fewer dependency to keep in step.

  - The chevron is Phosphor's caret, not the Radix icon set. Every other glyph
    on this site is Phosphor, and two icon families in one interface is visible
    in the stroke weights long before anyone can name why it looks off.
*/

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn(className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 cursor-pointer items-center justify-between gap-4 text-left transition-colors outline-none",
        className,
      )}
      {...props}
    >
      {children}
      <CaretDown
        size={16}
        weight="bold"
        aria-hidden
        className="shrink-0 text-muted-foreground transition-transform duration-400 ease-swift group-data-[state=open]/item:rotate-180 group-data-[state=open]/item:text-brand-bright"
      />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn(className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
