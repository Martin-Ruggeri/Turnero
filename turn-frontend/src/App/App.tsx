import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";

import { Menu } from "./menu/menu";
import { Footer } from "./footer/footer";
import { Login } from "../auth/login";
import { SingUp } from "../auth/singup";
import { User } from "../user/user"; 
import { Schedule } from "../schedule/schedule"; 
import { NewSchedule } from "../schedule/schedule.new"; 
import { Turn } from "../turn/turn";


const Home = () => <div>Home</div>;
const About = () => <div>About</div>;

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
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/create-schedule" element={<NewSchedule />} />
              <Route path="/turn" element={<Turn />} />
              <Route path="/login" element={<Login />} />
              <Route path="/singup" element={<SingUp />} />
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