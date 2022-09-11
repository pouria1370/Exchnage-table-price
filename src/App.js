import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Homepage from './pages/Homepage';
import Coinpage from './pages/Coinpage';
import Header from './Components/Header';
import { makeStyles } from '@material-ui/core';

function App() {
  const useStyle=makeStyles(()=>({
    App:{
      backgroundColor:"#14161a",
      color:"white",
      minHeight:"100vh"
    }
  }))
  const Classes=useStyle()
  return (
    <Router>
  <div className={Classes.App}>
    <Header />
    <Switch>
      <Route exact path="/">
       <Homepage />
      </Route>
      <Route path="/coins/:id">
        <Coinpage />
      </Route>
    </Switch>
    </div>
    </Router>
  );
}

export default App;
