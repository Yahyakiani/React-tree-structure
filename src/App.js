import { Route } from "react-router-dom";
import Home from './pages/index';

import './styles/globals.sass';

export default function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Home} />
    </div>
  );
}
