import { useContext } from "react";
import { Context } from "../../contexts/kanban";
import { KanbanContext } from "../../contexts/kanban/types";

export default function useKanban(): KanbanContext {
  return useContext(Context);
}
