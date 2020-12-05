import './App.css';
import {
  HashRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import PatientPage from './page/PatientPage'
import DoctorPage from './page/DoctorPage'
import AdminPage from './page/AdminPage'

function App() {
  return (
      <Router>
          <Switch>
            <Route exact path={'/'} component={PatientPage}/>
            <Route path={'/doctor'} component={DoctorPage} />
            <Route path={'/admin'} component={AdminPage} />
          </Switch>
      </Router>
  );
}

export default App;
