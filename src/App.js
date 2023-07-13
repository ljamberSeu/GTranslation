import * as React from 'react';
import dayjs from 'dayjs';
import Dashboard from './dashboard/Dashboard';
import { TranslationContext, GridContext } from './data';
import './App.css';
import { TranslationProject } from './dashboard/grid/components/constants';
import { TranslationDBQuery } from './dashboard/components/api/api-object';

function App() {
  const [rows, setRows] = React.useState([]);
  const [showAll, setShowAll] = React.useState(true);
  const [project, setProject] = React.useState(TranslationProject.XPAY);
  const [query, setQuery] = React.useState(null);
  const [startDate, setStartDate] = React.useState(() => {
    var d = new Date();
    // Set it to 7 days ago ago
    d.setDate(d.getDate() - 7);
    return dayjs(d);
  });

  React.useEffect(() => {
    setQuery(query => {
      if (query !== null) {
        query.stopAPIcall();
      }
      return new TranslationDBQuery(showAll, project, startDate, setRows);
    });
  }, [showAll, startDate, project]);

  return (
    <div className="App">
      <TranslationContext.Provider value={{ rows, setRows, showAll, setShowAll, project, setProject, query }}>
        <GridContext.Provider value={{startDate, setStartDate}}>
          <Dashboard />
        </GridContext.Provider>
      </TranslationContext.Provider>
    </div>
  );
}

export default App;
