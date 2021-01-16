import { BrowserRouter, Route } from "react-router-dom";
import Start from './screens/Start';
import NavBar from "./components/NavBar";
import Home from "./screens/Home";
import axios from 'axios';
import { useState, useEffect } from 'react'
import Movements from "./screens/Movements";
import Operation from "./screens/Operation";
import NewOperation from "./screens/NewOperation";

function App() {
  const [operations, setOperations] = useState();
  
  useEffect(async () => {
    const response = await axios.get('http://localhost:3001/operations')
    setOperations(response.data)
  },[])

  return (
    <BrowserRouter>
      <NavBar />
      <div style={{marginTop: "56px"}}>
        <Route exact path='/' component={Start}/>
        <Route exact path='/home' render={() => <Home />}/>
        <Route exact path='/movements' render={() => <Movements data={operations} />}/>
        <Route exact path='/new-operation' render={() => <NewOperation />}/>
        <Route exact path={`/movement/:id`} render={({match}) => <Operation id={match.params} />}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
