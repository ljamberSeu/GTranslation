import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import dayjs from 'dayjs';
import { TranslationContext, GridContext } from './data';
import { TranslationProject, TranslationLocale } from './dashboard/grid/components/constants';
import { TranslationDBQuery } from './dashboard/components/api/api-list';
import { TranslationDBCountQuery } from './dashboard/components/api/api-count-query';
import { DashboardSection } from "./pages/dashboard-section";
import { TermLibSection } from "./pages/term-lib-section";
const initialProject = TranslationProject.XPAY;

export default function App() {
  const [rows, setRows] = React.useState([]);
  const [allProjectCounts, setAllProjectCounts] = React.useState({});
  const [showAll, setShowAll] = React.useState(true);
  const [project, setProject] = React.useState(initialProject);
  const [query, setQuery] = React.useState(null);
  const [updateQuerys, setUpdateQuerys] = React.useState({});
  const [locale, setLocale] = React.useState(TranslationLocale.ZHHANS);
  const [filters, setFilters] = React.useState([]);

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
      return new TranslationDBQuery(showAll, project, startDate, locale, setRows, filters);
    });
  }, [showAll, startDate, project, locale, filters]);
  return (
    <TranslationContext.Provider value={{rows, setRows, showAll, setShowAll, project, setProject, query, allProjectCounts, updateQuerys, setUpdateQuerys }}>
      <GridContext.Provider value={{startDate, setStartDate, locale, setLocale, filters, setFilters}}>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<DashboardSection />} />
              <Route index path="/dashboard" element={<DashboardSection />} />
              <Route path="/termlib" element={<TermLibSection />} />
              <Route path="/project" element={<TermLibSection />} />
              <Route path="/settings" element={<TermLibSection />} />
          </Routes>
        </BrowserRouter>
      </GridContext.Provider>
    </TranslationContext.Provider>
  );
}
