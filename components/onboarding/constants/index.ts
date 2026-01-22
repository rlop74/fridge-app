// components/onboarding/constants.ts
export const TOTAL_STEPS = 5;

export type HowItWorksItem = {
  number: string;
  title: string;
  description: string;
  icon:
    | "timer-outline"
    | "eye-outline"
    | "heart-outline"
    | "trending-up-outline";
};

export const HOW_IT_WORKS_STEPS: HowItWorksItem[] = [
  {
    number: "1",
    title: "Set your timer",
    description: "Choose how long you want to focus",
    icon: "timer-outline",
  },
  {
    number: "2",
    title: "Stay focused",
    description: "Work on your task without distractions",
    icon: "eye-outline",
  },
  {
    number: "3",
    title: "Keep Potate alive",
    description: "If you leave the app, Potate will take damage",
    icon: "heart-outline",
  },
  {
    number: "4",
    title: "Level up",
    description:
      "Complete sessions to level up. If Potate dies, you reset to level 1!",
    icon: "trending-up-outline",
  },
];
