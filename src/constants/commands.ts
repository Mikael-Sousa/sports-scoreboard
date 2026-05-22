export const COMMANDS = {
  INCREASE_1: "A1",
  DECREASE_1: "D1",
  RESET_1: "R1",
  INCREASE_2: "A2",
  DECREASE_2: "D2",
  RESET_2: "R2",
  RESET_ALL: "R3",
} as const;

export type Command = typeof COMMANDS[keyof typeof COMMANDS];
