import { Provider as KanbanProvider } from "./kanban";

export default function Providers({ children }: { children: JSX.Element }): JSX.Element {
  return (
    <>
      <KanbanProvider>{children}</KanbanProvider>
    </>
  );
}
