import React, { useEffect } from 'react';
import './App.css';
import MainPage from "./components/MainPage";
import SearchForm from "./components/SearchForm";
import "antd/dist/antd.css";

function App() {

  return (
    <div className="App">
        <SearchForm />
        <MainPage />
    </div>
  );
}

export default App;
