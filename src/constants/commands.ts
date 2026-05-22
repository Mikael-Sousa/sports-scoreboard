export const COMMANDS = {
  INCREASE_1: "A",
  DECREASE_1: "B",
  RESET_1: "C",
  INCREASE_2: "D",
  DECREASE_2: "E",
  RESET_2: "F",
  RESET_ALL: "G",
} as const;

export type Command = typeof COMMANDS[keyof typeof COMMANDS];
