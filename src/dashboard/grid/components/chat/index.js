import * as React from "react";
import {
  AttachmentMenu,
  AttachmentMenuItem,
  AttachmentMenuList,
  AttachmentMenuPopover,
  AttachmentMenuTrigger,
  AttachmentTag,
  CopilotProvider,
  FeedbackButtons,
  LatencyCancel,
  LatencyLoader,
  LatencyWrapper,
  OutputCard,
  Suggestion,
  SuggestionList
} from "@fluentai/react-copilot";
import { Textarea } from "@fluentai/textarea";
import {
  Body1,
  Button,
  Image,
  Link,
  MenuButton,
  makeStyles,
  shorthands,
  tokens
} from "@fluentui/react-components";
import {
  AppFolder16Regular,
  Attach16Regular,
  Mail16Regular,
  Mail20Regular,
  SparkleRegular,
  Sparkle16Regular
} from "@fluentui/react-icons";
import { Chat, ChatMessage, ChatMyMessage } from "@fluentui-contrib/react-chat";

const initialAttachments = [
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

const useStyles = makeStyles({
  provider: {
    maxWidth: "500px",
    backgroundColor: tokens.colorNeutralBackground3,
    ...shorthands.padding("16px"),
    ...shorthands.borderRadius("12px"),
    display: "flex",
    columnGap: "24px",
    flexDirection: "column",
    height: "600px"
  },
  latencyWrapper: {
    paddingTop: "16px",
    alignItems: "stretch"
  },
  tag: {
    maxWidth: "100%"
  },
  chat: {
    ...shorthands.padding(0, "16px", "16px"),
    overflowY: "scroll",
    height: "100%",
    marginLeft: `calc(${tokens.spacingHorizontalL} * -1)`,
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: tokens.colorNeutralForeground4,
      ...shorthands.border("2px", "solid", tokens.colorNeutralBackground3),
      ...shorthands.borderRadius(tokens.borderRadiusMedium)
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: tokens.colorNeutralBackground3
    },
    "&::-webkit-scrollbar": {
      width: tokens.spacingHorizontalS
    }
  },
  chatMessage: {
    display: "block",
    marginLeft: 0
  },
  chatMessageBody: {
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow4,
    boxSizing: "content-box",
    display: "block",
    maxWidth: "100%"
  },
  chatMyMessage: {
    gridTemplateAreas: "unset",
    marginLeft: 0
  },
  chatMyMessageBody: {
    backgroundColor: "#E0E7FF"
  },
  inputArea: {
    paddingTop: "16px"
  },
  card: {
    rowGap: tokens.spacingHorizontalM
  },
  prompts: {
    display: "flex",
    flexDirection: "column",
    rowGap: tokens.spacingHorizontalS
  },
  promptHighlight: {
    color: tokens.colorBrandForegroundLink
  },
  latency: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    ...shorthands.gap("8px")
  }
});

const initialChatHistory = [];

export const ReactChatIntegration = () => {
  const [loadingState, setLoadingState] = React.useState(undefined);
  const [text, setText] = React.useState("");
  const [latencyMessage, setLatencyMessage] = React.useState("");
  const [chatHistory, setCatHistory] = React.useState(initialChatHistory);
  const [suggestions, setSuggestions] = React.useState(
    ["Can you make the text sound more like how a person would say it?",
      "The translation needs to be payment-related."]);

  const menuButtonRef = React.useRef(null);

  const handleReload = (e) => {
    console.log("Reload");
  };

  const handleSubmit = (newMessage) => {
    setCatHistory((preChats) => [...preChats, {
      isUser: true,
      messages: [newMessage]
    }]);
    setText("");
    setLatencyMessage("Thinking about it...");
    setLoadingState("latency");
    setTimeout(() => {
      setLatencyMessage("Almost there...");
    }, 3000);
    setTimeout(() => {
      setLoadingState("loading");
    }, 6000);

    setTimeout(() => {
      setCatHistory((preChats) => [...preChats, {
        isUser: false,
        messages: ["从关注列表中添加或移除"]
      }]);
    }, 6500);

    setTimeout(() => {
      setLoadingState("done");
    }, 9000);
  };
  const scrollDiv = React.useRef(null);
  React.useEffect(() => {
    scrollDiv.current?.scrollTo({ top: scrollDiv.current.scrollHeight });
  });

  const styles = useStyles();

  return (
    <CopilotProvider className={styles.provider}>
      <Chat ref={scrollDiv} className={styles.chat}>
        <OutputCard className={styles.card}>
          <Body1>Hi Kat,</Body1>
          <Body1>
            The GPT translation is not good enough for you? Select one of the suggestions below
            or give me more hints to get
            a better translation  <Sparkle16Regular />!
          </Body1>
        </OutputCard>
        {
          chatHistory.map((chat) => {
            const { isUser, messages } = chat;
            const Message = isUser ? ChatMyMessage : ChatMessage;
            return <Message
              body={{ className: isUser ? styles.chatMyMessageBody : styles.chatMessageBody }}
              root={{ className: isUser ? styles.chatMyMessage : styles.chatMessage }}
            >
              {messages.map((message) => <Body1 block>{message}</Body1>)}
            </Message>;
          })
        }
        { loadingState === "latency" &&
            <LatencyWrapper className={styles.latencyWrapper}>
              <LatencyLoader header={latencyMessage} className={styles.latency}>
                <AttachmentTag
                  className={styles.tag}
                  media={<Mail16Regular />}
                  content="translation..."
                />
              </LatencyLoader>
              <LatencyCancel>Cancel</LatencyCancel>
            </LatencyWrapper>
        }
      </Chat>
      <div className={styles.inputArea}>
        <SuggestionList reload={{ onClick: handleReload }}>
          {suggestions.map((suggestion) => {
            return (<Suggestion onClick={() => handleSubmit(suggestion)}>
              {suggestion}
            </Suggestion>);
          })}
        </SuggestionList>
        <Textarea
          contentAfter={
            <>
              <Button
                aria-label="Copilot guide"
                appearance="transparent"
                icon={<SparkleRegular />}
              />
              <AttachmentMenu>
                <AttachmentMenuTrigger disableButtonEnhancement>
                  <MenuButton
                    appearance="transparent"
                    aria-label="Attach an item"
                    icon={<Attach16Regular />}
                    ref={menuButtonRef}
                    shape="circular"
                  />
                </AttachmentMenuTrigger>
                <AttachmentMenuPopover>
                  <AttachmentMenuList>
                    {initialAttachments.map((attachment, index) => {
                      return (
                        <AttachmentMenuItem
                          key={`Attachment-${index}`}
                          media={attachment.media}
                        >
                          {attachment.content}
                        </AttachmentMenuItem>
                      );
                    })}
                  </AttachmentMenuList>
                </AttachmentMenuPopover>
              </AttachmentMenu>
            </>
          }
          onChange={(e, d) => setText(d.value)}
          onSubmit={() => handleSubmit(text)}
          value={text}
        />
      </div>
    </CopilotProvider>
  );
};
