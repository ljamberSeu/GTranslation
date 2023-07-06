import * as React from 'react';
import Dashboard from './dashboard/Dashboard';
import { TranslationContext } from './data';
import { getDataFromDBStatus, getDataFromDB } from './api/list';
import './App.css';
import { TranslationStatus } from './dashboard/grid/components/constants';

function App() {
  const [rows, setRows] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showAll, setShowAll] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    (showAll ? getDataFromDB() : getDataFromDBStatus(TranslationStatus.UNKNOEN))?.then((data) => {
      setRows(data || []);
      setIsLoading(false);
    });
  }, [showAll]);

  return (
    <div className="App">
      <TranslationContext.Provider value={{ rows, setRows, isLoading, showAll, setShowAll }}>
        <Dashboard />
      </TranslationContext.Provider>
    </div>
  );
}

export default App;
