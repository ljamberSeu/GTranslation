import * as React from 'react';
import dayjs from 'dayjs';
import Dashboard from './dashboard/Dashboard';
import { TranslationContext, GridContext } from './data';
import { getDataFromDBStatus } from './api/list';
import './App.css';
import { TranslationStatus, TranslationProject } from './dashboard/grid/components/constants';

function App() {
  const [rows, setRows] = React.useState([]);
  const [showAll, setShowAll] = React.useState(true);
  const [project, setProject] = React.useState(TranslationProject.XPAY);
  const shouldStopPreviousCall = React.useRef(false);
  const apiIsprogressing = React.useRef(false);
  const apiCallTimes = React.useRef(0);
  const [startDate, setStartDate] = React.useState(() => {
    var d = new Date();
    // Set it to 7 days ago ago
    d.setDate(d.getDate() - 7);
    return dayjs(d);
  });

  const getData = React.useCallback((after) => {
    getDataFromDBStatus({
      status: showAll ? null : TranslationStatus.UNKNOEN,
      startDate,
      project,
      after,
    // eslint-disable-next-line no-loop-func
    })?.then((data) => {
      if (after) {
        setRows((rows) => [...rows, ...(data.value || [])]);
      } else {
        setRows(data.value || []);
      }
      after = data?.nextLink && (new URL(data.nextLink))?.searchParams?.get?.('$after');
      if (after !== undefined && shouldStopPreviousCall.current === false && apiCallTimes.current < 10) {
        apiCallTimes.current++;
        getData(after);
      } else {
        apiIsprogressing.current = false;
      }
    });
  }, [project, showAll, startDate]);

  React.useEffect(() => {
    if (apiIsprogressing.current === true) {
      shouldStopPreviousCall.current = true;
    } 
    const internal = setTimeout(() => {
      if (apiIsprogressing.current === false) {
        shouldStopPreviousCall.current = false;
        apiIsprogressing.current = true;
        apiCallTimes.current = 0;
        getData();
        clearTimeout(internal);
      }
    }, 200);
    
  }, [showAll, startDate, project, getData]);

  return (
    <div className="App">
      <TranslationContext.Provider value={{ rows, setRows, showAll, setShowAll, project, setProject, apiIsprogressing: apiIsprogressing.current }}>
        <GridContext.Provider value={{startDate, setStartDate}}>
          <Dashboard />
        </GridContext.Provider>
      </TranslationContext.Provider>
    </div>
  );
}

export default App;
