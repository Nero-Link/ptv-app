import { Routes, Route } from "react-router-dom";
import Home from "./home";
import New from "./new";
import Connections from "./connections";

const App = () => {
  return (
    <Routes>
      <Route>
        <Route index element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path="/connection" element={<Connections />} />
      </Route>
    </Routes>
  );
};

export default App;
