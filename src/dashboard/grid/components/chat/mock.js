import {
  Mail20Regular
} from "@fluentui/react-icons";
import {
  Image
} from "@fluentui/react-components";
export const initialAttachments = [
  {
    content: "2023 Project Planning.docx",
    media: (
      <Image
        alt="DOCX file type"
        height={20}
        src="https://res-1.cdn.office.net/files/fabric-cdn-prod_20221209.001/assets/item-types/20/docx.svg"
        width={20}
      />
    )
  },
  {
    content: "Millennium Point Request for Proposal",
    media: <Mail20Regular />
  },
  {
    content: "Summit Center Budget.xlsx",
    media: (
      <Image
        alt="XLSX file type"
        height={20}
        src="https://res-1.cdn.office.net/files/fabric-cdn-prod_20221209.001/assets/item-types/20/xlsx.svg"
        width={20}
      />
    )
  },
  {
    content: "Summit Center Client Update - Feb 16 2023.ppt",
    media: (
      <Image
        alt="PPTX file type"
        height={20}
        src="https://res-1.cdn.office.net/files/fabric-cdn-prod_20221209.001/assets/item-types/20/pptx.svg"
        width={20}
      />
    )
  },
  {
    content: "March Sales.pdf",
    media: (
      <Image
        alt="PDF file type"
        height={20}
        src="https://res-1.cdn.office.net/files/fabric-cdn-prod_20221209.001/assets/item-types/20/pdf.svg"
        width={20}
      />
    )
  },
  {
    content: "March Sales Summary.ppt",
    media: (
      <Image
        alt="PPTX file type"
        height={20}
        src="https://res-1.cdn.office.net/files/fabric-cdn-prod_20221209.001/assets/item-types/20/pptx.svg"
        width={20}
      />
    )
  }
];

export const mockSuggestions =
["Can you make the text sound more like how a person would say it?",
  "The translation needs to be payment-related."];
