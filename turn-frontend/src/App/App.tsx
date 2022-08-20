import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";

import { Menu } from "./Menu/Menu";
import { Footer } from "./Footer/Footer";
import { Login } from "../Auth/Login";

const Home = () => <div>Home</div>;
const About = () => <div>About</div>;
const User = () => <div>User</div>;

class App extends Component {
  render() {
    return (
      <div className="App">
          <header>
            <Menu />
          </header>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/user" element={<User />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}

export default App;