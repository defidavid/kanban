import { Routes, Route } from "react-router-dom";
import Board from "../../pages/Board";

export default function AppContainer(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Board />} />
    </Routes>
  );
}
