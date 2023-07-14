import { getDataFromDBStatus, maxAPICallTimes } from '../../../api/list';
import { TranslationStatus } from '../../grid/components/constants';

export class TranslationDBQuery {
  constructor(showAll, project, startDate, locale, setRows) {
    this.showAll = showAll;
    this.project = project;
    this.startDate = startDate;
    this.locale = locale;
    this.shouldStopPreviousCall = false;
    this.setRows = setRows;
    this.pageCounts = 0;
    this.apiIsprogressing = true;
    this.getData();
  }

  getData(after) {
    getDataFromDBStatus({
      status: this.showAll ? null : TranslationStatus.UNKNOEN,
      startDate: this.startDate,
      project: this.project,
      locale: this.locale,
      after,
    // eslint-disable-next-line no-loop-func
    }).then((data) => {
      if (this.shouldStopPreviousCall) {
        this.apiIsprogressing = false;
        return;
      }
      if (after) {
        this.setRows((rows) => ({ ...rows, [this.project]: [...(rows[this.project] || []), ...(data?.items || [])] }));
      } else {
        this.setRows((rows) => ({ ...rows, [this.project]: data?.items || [] }));
      }
      after = data?.hasNextPage && data?.endCursor;
      if (after) {
        this.pageCounts++;
      }
      if (after && this.shouldStopPreviousCall === false && this.pageCounts < maxAPICallTimes) {
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
    return !this.IsAPIcallInProgress() && this.pageCounts > maxAPICallTimes - 1;
  }
}
