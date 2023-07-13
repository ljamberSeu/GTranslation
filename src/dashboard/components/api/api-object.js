import { getDataFromDBStatus } from '../../../api/list';
import { TranslationStatus } from '../../grid/components/constants';

export const maxAPICallTimes = 30;

export class TranslationDBQuery {
  constructor(showAll, project, startDate, setRows) {
    this.showAll = showAll;
    this.project = project;
    this.startDate = startDate;
    this.shouldStopPreviousCall = false;
    this.setRows = setRows;
    this.apiCallTimes = 0;
    this.apiIsprogressing = true;
    this.getData();
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
        this.setRows((rows) => ({ ...rows, [this.project]: [...(rows[this.project] || []), ...(data.value || [])] }));
      } else {
        this.setRows((rows) => ({ ...rows, [this.project]: data.value || [] }));
      }
      after = data?.nextLink && (new URL(data.nextLink))?.searchParams?.get?.('$after');
      if (after !== undefined && this.shouldStopPreviousCall === false && this.apiCallTimes < maxAPICallTimes - 1) {
        this.apiCallTimes++;
        this.getData(after);
      } else {
        this.apiIsprogressing = false;
      }
    });
  }

  stopAPIcall() {
    this.shouldStopPreviousCall = true;
  }

  IsAPIcallInProgress() {
    return this.apiIsprogressing;
  }

  IsDataOverFlow() {
    return !this.IsAPIcallInProgress() && this.apiCallTimes > maxAPICallTimes - 1;
  }
}
