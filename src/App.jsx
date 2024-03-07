import { useState } from "react";
import Game from "./components/Game/Game";

function App() {
  return (
    <>
      <header className="header">
        <h1 className="header__title">Miimory Cards</h1>
        <p className="header__credit-text">Created by Darnell</p>
      </header>

      <Game />

      <footer className="footer">
        <p className="footer__text">
          Built with React and SCSS{" "}
          <a className="footer__link" href="#">
            Github Repo
          </a>
        </p>

        <p className="footer__text">
          All images were fetched via{" "}
          <a className="footer__link" href="https://amiiboapi.com/">
            Amiibo API
          </a>
        </p>
      </footer>
    </>
  );
}

export default App;
