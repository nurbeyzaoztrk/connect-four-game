import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Button } from '@mui/material';

function App() {
  const [count , setCount] = useState(0)
  return (
    <div className="App">
      <header className="App-header">
       <h2>{count}</h2>
       <Button onClick={() => {
         setCount(count+1)
       }} variant="outlined">+</Button>
        <Button onClick={() => {
         setCount(count-1)
       }} variant="outlined">-</Button>
      </header>
    </div>
  );
}

export default App;
