import Container from "@mui/material/Container";
import useKanban from "../../hooks/useKanban";
import EmptyBoard from "../../components/EmptyBoard";
import { useCallback, useState } from "react";
import AddColumnModal from "../../containers/AddColumnModal";
import Column from "../../containers/Column";
import AddColumnCard from "../../components/AddColumnCard";

export default function Board(): JSX.Element {
  const { getColumns } = useKanban();
  const columns = getColumns();
  const [addColumnOpen, setAddColumnOpen] = useState(false);

  const onAddColumnClick = useCallback(() => setAddColumnOpen(true), []);
  const onCloseAddColumn = useCallback(() => setAddColumnOpen(false), []);

  return (
    <>
      <Container maxWidth="xl" sx={{ height: "100%", paddingTop: 3, paddingBottom: 3, display: "flex" }}>
        {!columns.length && <EmptyBoard onClick={onAddColumnClick} />}
        {columns.map((column, i) => {
          return <Column index={i} key={column.id} column={column} />;
        })}
        {!!columns.length && <AddColumnCard onClick={onAddColumnClick} />}
      </Container>
      {addColumnOpen && <AddColumnModal onCloseClick={onCloseAddColumn} />}
    </>
  );
}
