/* eslint-disable max-len */
import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./components/title";
import { Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { TranslationContext } from "../data";
import { TranslationProject, TranslationProjectNames } from "./grid/components/constants";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

const ProjectIntructions = {
  [TranslationProject.ADS]: `
  Microsoft Ads is a digital marketing solution that helps you showcase your business and products to potential customers through search engine marketing,
  video ads, streaming TV ads, retail advertising and more1. You can use Microsoft Ads to create and manage your ad campaigns, set your budget and goals,
  pay only for customers who click on your ads, and track your ad performance2. You can also import your existing ad campaigns from Google Ads, saving time and effort2.
  Microsoft Ads can help you reach 653 million monthly unique searchers on the Microsoft Search Network and 208 million unique users through native advertising on brand-safe experiences1.`,
  [TranslationProject.CRYPTODRAWER]:
  `Introducing XPay, your go-to payment platform for seamless online transactions.
  With millions of daily transactions and cutting-edge technology,
  XPay ensures secure and reliable money transfers for users worldwide.
  As a data-driven platform,
  XPay processes and analyzes large amounts of data to provide the best user experience.
  The egde://crypto-wallet-drawer page offers crypto transactions in some domains.
  With XPay, you can enjoy the convenience of using cryptocurrency for online payments.`,
  [TranslationProject.CRYPTOHUB]:
  `Introducing XPay, your go-to payment platform for seamless online transactions.
  With millions of daily transactions and cutting-edge technology,
  XPay ensures secure and reliable money transfers for users worldwide.
  As a data-driven platform,
  XPay processes and analyzes large amounts of data to provide the best user experience.
  Check out the egde://wallet and edge://wallet-drawer pages,
  owned by the XPay team and located in the Edge browser.
  The egde://wallet page offers a range of features including card and password management,
  order tracking, donations,
  and even crypto transactions.
  With XPay, you can enjoy the convenience of using cryptocurrency for online payments.`,
  [TranslationProject.CRYPTOSHARED]:
  `Introducing XPay, your go-to payment platform for seamless online transactions.
  With millions of daily transactions and cutting-edge technology,
  XPay ensures secure and reliable money transfers for users worldwide.
  As a data-driven platform,
  XPay processes and analyzes large amounts of data to provide the best user experience.
  Check out the egde://wallet and edge://wallet-drawer pages,
  owned by the XPay team and located in the Edge browser.
  The egde://wallet page offers a range of features including card and password management,
  order tracking, donations,
  and even crypto transactions.
  With XPay, you can enjoy the convenience of using cryptocurrency for online payments.`
};

export function Project () {
  const { project } = React.useContext(TranslationContext);

  return (
    <React.Fragment>
      <Title>{TranslationProjectNames[project]}</Title>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {ProjectIntructions[project]}
      </Typography>
      <div>
        <Link color="primary" href="https://msasg.visualstudio.com/Content%20Ecosystem/_git/xpay/pullrequests?_a=mine" >
          View {TranslationProjectNames[project]} repo
        </Link>
      </div>
    </React.Fragment>
  );
}

export function TranslationRules () {
  const [open, setOpen] = React.useState(false);
  const { project } = React.useContext(TranslationContext);

  return (
    <React.Fragment>
      <Title>{TranslationProjectNames[project]} Translation Rules</Title>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
         1. The translation outcome should adhere to the guidelines set forth in
         the <Link color="primary" href="https://learn.microsoft.com/en-us/style-guide/welcome/" >
          Microsoft Writing Style Guide
        </Link>
        . It is important to maintain a polite and unbiased tone in communication.
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
         2. Please ensure that the translation
         includes <Link
          color="primary"
          // eslint-disable-next-line max-len
          href="https://microsoftapc-my.sharepoint.com/:w:/g/personal/jubeeluo_microsoft_com/EfBKirN4KvlHiTrxQ9qxRGQBLXCMYVMDG2_LoPP1PIptjQ?e=AWlYYR" >
          {TranslationProjectNames[project]} terminology
        </Link> related to cryptocurrency payments.
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
         3. Punctuation in the translated string should match punctuation in the original string.
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
         4. Placeholders $1, $2, $3... should not be translated
      </Typography>
      <div>
        <Button color="primary" onClick={() => setOpen((e) => !e)}>
          Send your feedback to dev teams
        </Button>
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          Send Feedback
        </Box>
      </Modal>
    </React.Fragment>
  );
}
