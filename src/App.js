import * as React from 'react';
import dayjs from 'dayjs';
import Dashboard from './dashboard/dashboard';
import { TranslationContext, GridContext } from './data';
import { TranslationProject, TranslationLocale } from './dashboard/grid/components/constants';
import { TranslationDBQuery } from './dashboard/components/api/api-object';
import { TranslationDBCountQuery } from './dashboard/components/api/api-count-query';

const initialProject = TranslationProject.XPAY;

function App() {
  const [rows, setRows] = React.useState([]);
  const [allProjectCounts, setAllProjectCounts] = React.useState({});
  const [showAll, setShowAll] = React.useState(true);
  const [project, setProject] = React.useState(initialProject);
  const [query, setQuery] = React.useState(null);
  const [locale, setLocale] = React.useState(TranslationLocale.ZHHANS);

  const [startDate, setStartDate] = React.useState(() => {
    var d = new Date();
    // Set it to 7 days ago ago
    d.setDate(d.getDate() - 7);
    return dayjs(d);
  });

  React.useEffect(() => {
    new TranslationDBCountQuery(startDate, locale, setAllProjectCounts);
  }, [startDate, locale]);

  React.useEffect(() => {
    setQuery(query => {
      if (query !== null) {
        query.stopAPIcall();
      }
      return new TranslationDBQuery(showAll, project, startDate, locale, setRows);
    });
  }, [showAll, startDate, project, locale]);

  return (
    <div className="App">
      <TranslationContext.Provider value={{ rows, setRows, showAll, setShowAll, project, setProject, query, allProjectCounts }}>
        <GridContext.Provider value={{startDate, setStartDate, locale, setLocale}}>
          <Dashboard />
        </GridContext.Provider>
      </TranslationContext.Provider>
    </div>
  );
}

export default App;
