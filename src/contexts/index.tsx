import { Provider as KanbanProvider } from "./kanban";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Providers({ children }: { children: JSX.Element }): JSX.Element {
  return (
    <>
      <KanbanProvider>
        <DndProvider backend={HTML5Backend}>{children}</DndProvider>
      </KanbanProvider>
    </>
  );
}
