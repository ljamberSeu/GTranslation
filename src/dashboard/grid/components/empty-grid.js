import * as React from 'react';

export default function EmptyRowsCard() {
  return (
    <div style={{display: 'flex', gap: '10px', alignItems: 'center', flexDirection: 'column'}}>
      <img src="OIG.jpg" alt="OIG Logo" width={"30%"} title="Congratulations! You have successfully completed today's review."/>
    </div>
  );
}