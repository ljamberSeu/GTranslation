import { getDataFromDBStatus } from "./apis";
import { TranslationStatus, TranslationProject } from "../../grid/components/constants";

let firstRun = true;
export class TranslationDBCountQuery {
  constructor (startDate, locale, setAllProjectCounts, project) {
    this.startDate = startDate;
    this.locale = locale;
    this.setAllProjectCounts = setAllProjectCounts;
    this.project = firstRun ? null : project;
    this.getData();
    firstRun = true;
  }

  getData (after) {
    // Loop TranslationProject
    Object.values(TranslationProject).forEach((project) => {
      if (!this.project || project === this.project) {
        getDataFromDBStatus({
          status: TranslationStatus.UNKNOEN,
          startDate: this.startDate,
          project,
          locale: this.locale,
          after,
          first: 100,
          onlyPrimary: true
        // eslint-disable-next-line no-loop-func
        }).then((data) => {
          this.setAllProjectCounts((rows) => ({ ...rows, [project]: data?.hasNextPage ? 100 : data?.items?.length }));
        });
      }
    });
  }
}
