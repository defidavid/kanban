import { Routes, Route } from "react-router-dom";
import Board from "../../pages/Board";
import NoMatch from "../NoMatch";

export default function AppContainer(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Board />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}
