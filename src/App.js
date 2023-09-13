import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import dayjs from "dayjs";
import { TranslationContext, GridContext } from "./data";
import { TranslationProject, TranslationLocale } from "./dashboard/grid/components/constants";
import { TranslationDBQuery } from "./dashboard/components/api/api-list";
import { TranslationDBCountQuery } from "./dashboard/components/api/api-count-query";
import { DashboardSection } from "./pages/dashboard-section";
import { TermLibSection } from "./pages/term-lib-section";
import { Paths } from "./constants";
import { webLightTheme, FluentProvider } from "@fluentui/react-components";
import { CopilotProvider } from "@fluentai/react-copilot";

const initialProject = TranslationProject.CRYPTOHUB;
const addScore = (items) => {
  return items.map(item => {
    switch (item.id) {
    case "addOrRemoveFromWatchlist":
      return { ...item, score: 0.5 };
    case "coolDownTimeLessTip":
      return { ...item, score: 0.8 };
    }
    return { ...item, score: 1 };
  });
};

export default function App () {
  const [rows, setRows] = React.useState([]);
  const [allProjectCounts, setAllProjectCounts] = React.useState({});
  const [showAll, setShowAll] = React.useState(true);
  const [project, setProject] = React.useState(initialProject);
  const [query, setQuery] = React.useState(null);
  const [updateQuerys, setUpdateQuerys] = React.useState({});
  const [locale, setLocale] = React.useState(TranslationLocale.ZHHANS);
  const [filters, setFilters] = React.useState([]);

  const setRowsWithScore = React.useCallback((data) => {
    if (typeof data === "function") {
      setRows((preRows) => {
        const newRows = data(preRows);
        return newRows ? addScore(newRows) : newRows;
      });
    } else {
      setRows(data);
    }
  }, [setRows]);

  const [startDate, setStartDate] = React.useState(() => {
    const d = new Date();
    // Set it to 7 days ago ago
    d.setDate(d.getDate() - 107);
    return dayjs(d);
  });

  React.useEffect(() => {
    // eslint-disable-next-line no-new
    new TranslationDBCountQuery(startDate, locale, setAllProjectCounts);
  }, [startDate, locale]);

  React.useEffect(() => {
    setQuery(query => {
      if (query !== null) {
        query.stopAPIcall();
      }
      return new TranslationDBQuery(showAll, project, startDate, locale, setRowsWithScore, filters);
    });
  }, [showAll, startDate, project, locale, filters, setRowsWithScore]);

  return (
    <FluentProvider theme={webLightTheme}>
      <CopilotProvider
        mode='sidecar' // or 'canvas'
        copilotTokens={{
          colorBrandFlair1: "red", // replace with your brand colors
          colorBrandFlair2: "orange",
          colorBrandFlair3: "yellow"
        }}
      >
        <TranslationContext.Provider
          value={{
            rows,
            setRows: setRowsWithScore,
            showAll,
            setShowAll,
            project,
            setProject,
            query,
            allProjectCounts,
            updateQuerys,
            setUpdateQuerys
          }}>
          <GridContext.Provider value={{ startDate, setStartDate, locale, setLocale, filters, setFilters }}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<DashboardSection />} />
                <Route index path={Paths.Dashboard} element={<DashboardSection />} />
                <Route path={Paths.Term} element={<TermLibSection />} />
                <Route path={Paths.Project} element={<TermLibSection />} />
                <Route path={Paths.Settings} element={<TermLibSection />} />
              </Routes>
            </BrowserRouter>
          </GridContext.Provider>
        </TranslationContext.Provider>
      </CopilotProvider>
    </FluentProvider>
  );
}
