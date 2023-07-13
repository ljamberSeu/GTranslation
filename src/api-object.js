import { getDataFromDBStatus } from './api/list';
import './App.css';
import { TranslationStatus } from './dashboard/grid/components/constants';

export class TranslationDBQuery {
  constructor(showAll, project, startDate, setRows) {
    this.showAll = showAll;
    this.project = project;
    this.startDate = startDate;
    this.shouldStopPreviousCall = false;
    this.setRows = setRows;
    this.apiCallTimes = 0;
    this.apiIsprogressing = false;
  }

  getData(after) {
    getDataFromDBStatus({
      status: this.showAll ? null : TranslationStatus.UNKNOEN,
      startDate: this.startDate,
      project: this.project,
      after,
    // eslint-disable-next-line no-loop-func
    }).then((data) => {
      if (this.shouldStopPreviousCall) {
        this.apiIsprogressing = false;
        return;
      }
      if (after) {
        this.setRows((rows) => [...rows, ...(data.value || [])]);
      } else {
        this.setRows(data.value || []);
      }
      after = data?.nextLink && (new URL(data.nextLink))?.searchParams?.get?.('$after');
      if (after !== undefined && this.shouldStopPreviousCall === false && this.apiCallTimes < 10) {
        this.apiCallTimes++;
        this.getData(after);
      } else {
        this.apiIsprogressing = false;
      }
    });
  }

  startAPIcall() {
    this.apiIsprogressing = true;
    this.getData();
  };

  stopAPIcall() {
    this.shouldStopPreviousCall = true;
  }

  IsAPIcallInProgress() {
    return this.apiIsprogressing;
  }
}
