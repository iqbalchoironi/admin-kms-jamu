import React from 'react';
import { Switch,Route } from 'react-router-dom';

import Navigation from './Navigation'
import Login from './Login'
import HerbMeds from './HerbMedPage'
import TableMedicineType from './TableMedicineType'
import MaterialTableDemo from './TableCompany'
import DclassPage from './DclassPage'

import Plant from './PlantPage'
import CrudeDrugPage from './CrudeDrugPage'

import TacitPage from './TacitPage'
import ExplicitPage from './ExplicitPage'

import TableEthnic from './TableEthnic'
import TablePlantEthnic from './TablePlantEthnic'

import FormExplicit from './FormExplicit'




import './App.css'
import FormTacit from './FormTacit';

function App() {
  const path = window.location.pathname;

  if (path !== '/login'  && path !== '/register') {
    return (
      <div>
        <Navigation>
          <Switch>
              <Route exact path="/" render={() => <h1>Home</h1>} />
  
              <Route exact path="/herbmeds" component={HerbMeds} />
              <Route exact path="/medtype" component={TableMedicineType} />
              <Route exact path="/company" component={MaterialTableDemo} />
              <Route exact path="/dclass" component={DclassPage} />
  
              <Route exact path="/plant" component={Plant} />
              <Route exact path="/crudedrug" component={CrudeDrugPage} />
  
              <Route exact path="/tacit" component={TacitPage} />
              <Route exact path="/form/tacit" component={FormTacit} />
              <Route exact path="/explicit" component={ExplicitPage} />
              <Route exact path="/form/explicit" component={FormExplicit} />
              {/* compound */}
              
              <Route exact path="/ethnic" component={TableEthnic} />
              <Route exact path="/plantethnic" component={TablePlantEthnic} />
            </Switch>
          </Navigation>
      </div>
    );
  }
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
    </Switch>
  )
  
}

export default App;
