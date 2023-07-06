import * as React from 'react';
import dayjs from 'dayjs';
import Dashboard from './dashboard/Dashboard';
import { TranslationContext, GridContext } from './data';
import { getDataFromDBStatus } from './api/list';
import './App.css';
import { TranslationStatus } from './dashboard/grid/components/constants';

function App() {
  const [rows, setRows] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showAll, setShowAll] = React.useState(true);
  const [startDate, setStartDate] = React.useState(() => {
    var d = new Date();
    // Set it to 7 days ago ago
    d.setDate(d.getDate() - 7);
    return dayjs(d);
  });

  React.useEffect(() => {
    setIsLoading(true);
    getDataFromDBStatus({
      status: showAll ? null : TranslationStatus.UNKNOEN,
      startDate,
    })?.then((data) => {
      setRows(data || []);
      setIsLoading(false);
    });
  }, [showAll, startDate]);

  return (
    <div className="App">
      <TranslationContext.Provider value={{ rows, setRows, isLoading, showAll, setShowAll }}>
        <GridContext.Provider value={{startDate, setStartDate}}>
          <Dashboard />
        </GridContext.Provider>
      </TranslationContext.Provider>
    </div>
  );
}

export default App;
