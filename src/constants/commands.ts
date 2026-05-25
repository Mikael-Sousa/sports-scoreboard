export const COMMANDS = {
  INCREASE_1: "A",
  DECREASE_1: "B",
  INCREASE_2: "C",
  DECREASE_2: "D",
  RESET_1: "E",
  RESET_2: "F",
  RESET_ALL: "G",
} as const;

export type Command = typeof COMMANDS[keyof typeof COMMANDS];
