import React from "react";
import { Switch, Route } from "react-router-dom";

import Navigation from "./NavigationCoba";
import Login from "./Login";
import HerbMeds from "./HerbMedPage";
import TableMedicineType from "./TableMedicineType";
import MaterialTableDemo from "./TableCompany";
import DclassPage from "./DclassPage";

import Plant from "./PlantPage";
import CrudeDrugPage from "./CrudeDrugPage";

import TacitPage from "./TacitPage2";
import ExplicitPage from "./ExplicitPage2";

import TableEthnic from "./TableEthnic";
import TablePlantEthnic from "./TablePlantEthnic";

import FormExplicit from "./FormExplicit";
import Landing from "./Landing";

import TableCompound from "./TableCompound";

import { ProtectedRoute } from "./protected.route";
import axios from "axios";

import "./App.css";
import FormTacit from "./FormTacit";
import CompoundPage from "./CompoundPage";

axios.defaults.baseURL = "http://localhost:3003";
// axios.defaults.baseURL = "https://api.jamumedicine.com";

function App() {
  const path = window.location.pathname;

  if (path !== "/login" && path !== "/register") {
    return (
      <div>
        <Navigation>
          <Switch>
            <ProtectedRoute exact path="/" component={Landing} />

            {/* <ProtectedRoute exact path="/herbmeds" component={HerbMeds} /> */}

            <ProtectedRoute exact path="/herbmeds/:type" component={HerbMeds} />

            <ProtectedRoute
              exact
              path="/medtype"
              component={TableMedicineType}
            />
            <ProtectedRoute
              exact
              path="/company"
              component={MaterialTableDemo}
            />
            <ProtectedRoute exact path="/dclass" component={DclassPage} />

            <ProtectedRoute exact path="/plant" component={Plant} />
            <ProtectedRoute exact path="/crudedrug" component={CrudeDrugPage} />

            <ProtectedRoute exact path="/tacit" component={TacitPage} />
            <ProtectedRoute exact path="/form/tacit" component={FormTacit} />
            <ProtectedRoute exact path="/explicit" component={ExplicitPage} />
            <ProtectedRoute
              exact
              path="/form/explicit"
              component={FormExplicit}
            />
            <ProtectedRoute exact path="/compound" component={TableCompound} />

            <ProtectedRoute
              exact
              path="/table/compound"
              component={TableCompound}
            />

            <ProtectedRoute exact path="/ethnic" component={TableEthnic} />
            <ProtectedRoute
              exact
              path="/plantethnic"
              component={TablePlantEthnic}
            />
          </Switch>
        </Navigation>
      </div>
    );
  }
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
    </Switch>
  );
}

export default App;
