import React from 'react';

import Navigation from './Navigation'

import HerbMeds from './HerbMedPage'
// import EnhancedTable from './TableMedicineType'
//import EnhancedTable from './TableCompany'
import DclassPage from './DclassPage'

import Plant from './PlantPage'
import CrudeDrugPage from './CrudeDrugPage'

import TacitPage from './TacitPage'
import ExplicitPage from './ExplicitPage'

//import EnhancedTable from './TableEthnic'
import EnhancedTable from './TablePlantEthnic'




import './App.css'

function App() {
  return (
    <div>
      <Navigation>
        <EnhancedTable   />
      </Navigation>
    </div>
  );
}

export default App;
