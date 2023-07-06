import * as React from 'react';
import SendReportButton from './send-report-button';
export default function EmptyRowsCard({ rows }) {
  return (
    <div style={{display: 'flex', gap: '10px', alignItems: 'center', flexDirection: 'column'}}>
      <img src="OIG.jpg" alt="OIG Logo" width={"50%"} title="Congratulations! You have successfully completed today's review."/>
      <SendReportButton rows={rows} displaytext />
    </div>
  );
}