import { getDataFromDBStatus, maxAPICallTimes } from './apis';
import { TranslationStatus } from '../../grid/components/constants';

export const StringCondition = {
  EQUALS: 'eq',
  STARTS_WITH: 'startsWith',
  ENDS_WITH: 'endsWith',
  CONTAINS: 'contains',
  NOT_CONTAINS: 'notContains',
};

export class Filter {
  constructor() {
    this.value = null;
    this.column = null;
    this.condition = null;
  }

  getCondition() {
    return this.condition;
  }

  setCondition(condition) {
    this.condition = condition;
  }

  getColumn() {
    return this.column;
  }

  setColumn(column) {
    this.column = column;
  }

  getValue() {
    return this.value;
  }

  setValue(value) {
    this.value = value;
  }

  setFilterObject(filter) {
    if (this.column && this.condition && this.value) {
      filter[this.column] = `{ ${this.condition}: "${this.value}" }`;
    }
  }
}

export class TranslationDBQuery {
  constructor(showAll, project, startDate, locale, setRows, filters) {
    this.showAll = showAll;
    this.project = project;
    this.startDate = startDate;
    this.locale = locale;
    this.shouldStopPreviousCall = false;
    this.setRows = setRows;
    this.pageCounts = 0;
    this.apiIsprogressing = true;
    this.filter = {};
    filters?.map?.((filter) => filter.setFilterObject(this.filter));
    this.getData();
  }

  getData(after) {
    getDataFromDBStatus({
      status: this.showAll ? null : TranslationStatus.UNKNOEN,
      startDate: this.startDate,
      project: this.project,
      locale: this.locale,
      after,
      filter: this.filter,
    // eslint-disable-next-line no-loop-func
    }).then((data) => {
      if (this.shouldStopPreviousCall) {
        this.apiIsprogressing = false;
        return;
      }
      if (after) {
        this.setRows((rows) => [...(rows[this.project] || []), ...(data?.items || [])]);
      } else {
        this.setRows(() => data?.items || []);
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
