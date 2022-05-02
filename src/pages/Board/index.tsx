import Container from "@mui/material/Container";
import useKanban from "../../hooks/useKanban";
import EmptyBoard from "../../components/EmptyBoard";
import { useCallback, useState } from "react";
import AddColumnModal from "../../containers/AddColumnModal";
import Column from "../../containers/Column";

export default function Board(): JSX.Element {
  const { getColumns } = useKanban();
  const columns = getColumns();
  const [addColumnOpen, setAddColumnOpen] = useState(false);

  const onAddColumnClick = useCallback(() => setAddColumnOpen(true), []);
  const onCloseAddColumn = useCallback(() => setAddColumnOpen(false), []);

  return (
    <>
      <Container maxWidth="xl" sx={{ height: "100%", paddingTop: 3, paddingBottom: 3 }}>
        {!columns.length && <EmptyBoard onClick={onAddColumnClick} />}
        {columns.map(column => {
          return <Column key={column.id} column={column} />;
        })}
      </Container>
      {addColumnOpen && <AddColumnModal onCloseClick={onCloseAddColumn} />}
    </>
  );
}
