import './App.css';
import {
  HashRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import PatientPage from './page/PatientPage'
import DoctorPage from './page/DoctorPage'
import AdminPage from './page/AdminPage'
import DrugstorePage from "./page/DrugstorePage";

function App() {
  return (
      <Router>
          <Switch>
            <Route exact path={'/patient'} component={PatientPage}/>
            <Route path={'/doctor'} component={DoctorPage} />
            <Route path={'/admin'} component={AdminPage} />
              <Route path={'/drugstore'} component={DrugstorePage} />
          </Switch>
      </Router>
  );
}

export default App;
