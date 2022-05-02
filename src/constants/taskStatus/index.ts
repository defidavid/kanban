export const OPEN = "OPEN";
export const CLOSED = "CLOSED";

export type Status = typeof OPEN | typeof CLOSED;

export const taskStatusTextMap = {
  [OPEN]: "Open",
  [CLOSED]: "Closed",
};
