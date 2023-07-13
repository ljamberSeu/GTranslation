import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './components/title';

export default function Deposits() {
  return (
    <React.Fragment>
      <Title>Xpay</Title>
      <Typography component="p" variant="h4">
        $3,024.00
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography>
      <div>
        <Link color="primary" href="https://msasg.visualstudio.com/Content%20Ecosystem/_git/xpay/pullrequests?_a=mine" >
          View Xpay repo
        </Link>
      </div>
    </React.Fragment>
  );
}
