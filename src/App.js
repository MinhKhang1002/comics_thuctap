import "swiper/swiper.min.css";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./App.scss";
// import "./input.css";

import { BrowserRouter } from "react-router-dom";

import Router from "./config/Routes";

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
