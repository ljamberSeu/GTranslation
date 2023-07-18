import * as React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';

import { TranslationContext } from '../../../data';
import { maxItems } from './apis';

export default function APIStatus() {
  const {query, updateQuerys, setUpdateQuerys}= React.useContext(TranslationContext);
  const isUpdateQueryIsProcessing = updateQuerys?.some?.((updateQuery) => updateQuery?.IsAPIcallInProgress?.());

  return (
    <>
        {(query?.IsAPIcallInProgress?.() || isUpdateQueryIsProcessing) && <LinearProgress /> }
        {query?.IsDataOverFlow?.() && <Alert severity="warning"> {`The maximum number of rows is ${maxItems}. Please narrow down your search criteria.` }</Alert> }
        {updateQuerys?.map?.((updateQuery, index) => {
          const errorMessage = updateQuery?.GetErrorMessage?.();
          return errorMessage &&
            <Alert
              key={index}
              severity="warning"
              onClose={() => setUpdateQuerys((querys) => 
                querys?.filter?.(q => q.GetId() !== updateQuery.GetId()) || []
              )}
            >
              {errorMessage}
            </Alert> 
        })}
    </>
  );
}