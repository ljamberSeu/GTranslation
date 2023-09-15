import * as React from "react";

import { updateSingleTranslation } from "./apis";
import { TranslationContext } from "../../../data";
import { TranslationDBCountQuery } from "./api-count-query";

const getNewRow = (row, newFiles) => ({
  ...row,
  ...newFiles,
  reviewer: "danluo@microsoft.com"
});

export class TranslationDBUpdateQuery {
  constructor (id, rows, newFileds, setRows, setAllProjectCounts, project) {
    this.rows = rows;
    this.id = id;
    this.newFileds = newFileds;
    this.setRows = setRows;
    this.apiIsprogressing = true;
    this.error = null;
    this.row = this.getRow();
    this.setAllProjectCounts = setAllProjectCounts;
    this.project = project;
    this.UpdateData();
  }

  UpdateData () {
    const newRow = getNewRow(this.row, this.newFileds);
    updateSingleTranslation(newRow).then((r) => {
      if (r) {
        this.setRows((rows) => rows?.map?.((or) => or.id === r.id ? { ...newRow, ...r } : or));
      } else {
        this.setRows((rows) => rows?.map?.((or) => or));
        this.error =
          `Update 
          "${this.row?.original}" 
          API call failed by someone has changed this translation, please refresh the page and try again.`;
      }
      this.setAllProjectCounts(all => all[this.project]--);
    }).catch((e) => {
      this.error = "API call failed.";
    }).finally(() => {
      this.apiIsprogressing = false;
    });
  }

  getRow () {
    for (let i = 0; i < this.rows.length; i++) {
      if (this.rows[i].id === this.id) {
        return this.rows[i];
      }
    }
  }

  IsAPIcallInProgress () {
    return this.apiIsprogressing;
  }

  GetErrorMessage () {
    return this.error;
  }

  GetId () {
    return this.row?.id + this.row?.locale + this.row?.original;
  }
}

export const useUpdateQuerys = () => {
  const { setRows, rows, setUpdateQuerys, setAllProjectCounts, project, locale, startDate } =
    React.useContext(TranslationContext);

  const update = React.useCallback((
    id,
    updateFileds
  ) => {
    setUpdateQuerys((querys) => [
      ...(querys?.filter?.(q => q.IsAPIcallInProgress() || q.GetErrorMessage()) || []),
      new TranslationDBUpdateQuery(
        id, rows,
        updateFileds,
        setRows, setUpdateQuerys, setAllProjectCounts, project
      )]);
  }, [rows, setRows, setUpdateQuerys, setAllProjectCounts, project]);

  return update;
};
