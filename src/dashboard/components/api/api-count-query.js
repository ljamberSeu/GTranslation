import { getDataFromDBStatus } from '../../../api/list';
import { TranslationStatus, TranslationProject } from '../../grid/components/constants';

export class TranslationDBCountQuery {
  constructor(startDate, locale, setAllProjectCounts) {
    this.startDate = startDate;
    this.locale = locale;
    this.setAllProjectCounts = setAllProjectCounts;
    this.getData();
  }

  getData(after) {
    // Loop TranslationProject
    Object.values(TranslationProject).forEach((project) => {
      getDataFromDBStatus({
        status: TranslationStatus.UNKNOEN,
        startDate: this.startDate,
        project: project,
        locale: this.locale,
        after,
        first: 100,
        onlyPrimary: true,
      // eslint-disable-next-line no-loop-func
      }).then((data) => {
        this.setAllProjectCounts((rows) => ({ ...rows, [project]: data?.hasNextPage ? 100 : data?.items?.length }));
      });
    });
  }
}
