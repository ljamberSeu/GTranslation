import * as React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';

import { TranslationContext } from '../../../data';
import { maxAPICallTimes } from './api-object';

export default function APIStatus() {
  const {query}= React.useContext(TranslationContext);

  return (
    <>
        {query?.IsAPIcallInProgress?.() && <LinearProgress /> }
        {query?.IsDataOverFlow?.() && <Alert severity="warning"> {`The maximum number of rows is ${maxAPICallTimes * 100}. Please narrow down your search criteria.` }</Alert> }
    </>
  );
}