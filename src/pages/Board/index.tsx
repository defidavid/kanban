import Container from "@mui/material/Container";
import useKanban from "../../hooks/useKanban";
import EmptyBoard from "../../components/EmptyBoard";
import { useCallback, useEffect, useState } from "react";
import AddColumnModal from "../../containers/AddColumnModal";
import Column from "../../containers/Column";
import AddColumnCard from "../../components/AddColumnCard";
import useWindowBreakpoint from "../../hooks/useWindowBreakpoint";
import { Badge, Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";

export default function Board(): JSX.Element {
  const { getColumns } = useKanban();
  const columns = getColumns();
  const [addColumnOpen, setAddColumnOpen] = useState(false);
  const [selectedTabId, setSelectedTabId] = useState(columns.length ? columns[0].id : "");

  const onAddColumnClick = useCallback(() => setAddColumnOpen(true), []);
  const onCloseAddColumn = useCallback(() => setAddColumnOpen(false), []);

  const bp = useWindowBreakpoint();
  const small = bp === "xs";

  useEffect(() => {
    if (
      !!columns.length &&
      (selectedTabId === "" || (!!selectedTabId && !columns.find(col => col.id === selectedTabId)))
    ) {
      setSelectedTabId(columns[0].id);
    }
  }, [columns, selectedTabId]);

  return (
    <>
      {!small && (
        <Container
          maxWidth="xl"
          sx={{ height: "100%", paddingTop: 3, paddingBottom: 3, display: "flex", marginLeft: 0, marginRight: 0 }}
        >
          {!columns.length && <EmptyBoard onClick={onAddColumnClick} />}
          {columns.map((column, i) => {
            return <Column index={i} key={column.id} column={column} />;
          })}
          {!!columns.length && <AddColumnCard onClick={onAddColumnClick} />}
        </Container>
      )}
      {small && (
        <Box display="flex" flexDirection="column" height="100%">
          {!columns.length && <EmptyBoard onClick={onAddColumnClick} />}
          {!!columns.length && !!selectedTabId && (
            <Tabs
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile={!!columns.length}
              value={selectedTabId}
              onChange={(_evt, id) => setSelectedTabId(id)}
            >
              {columns.map(column => {
                return (
                  <Tab
                    key={column.id}
                    value={column.id}
                    label={
                      <Badge showZero color="secondary" badgeContent={column.taskList.length}>
                        <Box pr={3}>{column.name}</Box>
                      </Badge>
                    }
                  />
                );
              })}
              <Tab onClick={onAddColumnClick} label={<AddIcon />} />
            </Tabs>
          )}
          <Box flexGrow={1}>
            {columns.map((column, i) => {
              if (column.id === selectedTabId) {
                return <Column index={i} key={column.id} column={column} />;
              }
              return false;
            })}
          </Box>
        </Box>
      )}
      {addColumnOpen && <AddColumnModal onCloseClick={onCloseAddColumn} />}
    </>
  );
}
