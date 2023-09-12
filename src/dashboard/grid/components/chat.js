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
  PromptStarter,
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

export const ReactChatIntegration = () => {
  const [loadingState, setLoadingState] = React.useState(undefined);
  const [text, setText] = React.useState("");
  const [latencyMessage, setLatencyMessage] = React.useState("");
  const [cardContent, setCardContent] = React.useState(
    <Body1 block>
      Here are some documents that have relevant information for the marketing
      campaign meeting:
    </Body1>
  );

  const menuButtonRef = React.useRef(null);

  const handleReload = (e) => {
    console.log("Reload");
  };

  const handleSubmit = () => {
    setText("");
    setCardContent("");
    setLatencyMessage("Reading emails");
    setLoadingState("latency");
    setTimeout(() => {
      setLatencyMessage("Thinking about it...");
    }, 1500);
    setTimeout(() => {
      setLatencyMessage("Almost there...");
    }, 3000);
    setTimeout(() => {
      setLoadingState("loading");
    }, 6000);

    setTimeout(() => {
      setCardContent(
        <Body1 block>
          Here are some documents that have relevant information for the
          marketing campaign meeting:
        </Body1>
      );
    }, 6500);

    setTimeout(() => {
      setCardContent(
        <>
          <Body1 block>
            Here are some documents that have relevant information for the
            marketing campaign meeting:
          </Body1>
          <Body1>
            <ul>
              <li>
                <Link>Marketing Campaign Objectives</Link> outlines goals,
                including increasing brand awareness, increasing conversion
                rates, and improving customer retention.
              </li>
            </ul>
          </Body1>
        </>
      );
    }, 7800);

    setTimeout(() => {
      setCardContent(
        <>
          <Body1 block>
            Here are some documents that have relevant information for the
            marketing campaign meeting:
          </Body1>
          <Body1>
            <ul>
              <li>
                <Link>Marketing Campaign Objectives</Link> outlines goals,
                including increasing brand awareness, increasing conversion
                rates, and improving customer retention.
              </li>
              <li>
                <Link>Q4 Creative Concepts</Link> proposes ideas such as
                personalizing ads for target audiences and adding interactive
                elements.
              </li>
            </ul>
          </Body1>
          <div>
            <div>
              <FeedbackButtons />
            </div>
          </div>
        </>
      );
    }, 9000);

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
            Ready to explore? Select one of the suggestions below to get
            started...
          </Body1>

          <div className={styles.prompts}>
            <PromptStarter
              icon={<AppFolder16Regular />}
              category="Summarize"
              prompt={
                <Body1>
                  Review key points in{" "}
                  <span className={styles.promptHighlight}>file</span>
                </Body1>
              }
            />

            <PromptStarter
              icon={<AppFolder16Regular />}
              category="Create"
              prompt={<Body1>Write more about...</Body1>}
            />

            <PromptStarter
              icon={<AppFolder16Regular />}
              category="Ask"
              prompt={<Body1>Tell me about my day</Body1>}
              badge="NEW"
            />
          </div>
          <Body1>
            You can use the prompt guide for suggestions by selecting this
            button <Sparkle16Regular />
          </Body1>
        </OutputCard>
        <ChatMyMessage
          body={{ className: styles.chatMyMessageBody }}
          root={{ className: styles.chatMyMessage }}
        >
          Tell me about my day
        </ChatMyMessage>
        <ChatMessage
          body={{ className: styles.chatMessageBody }}
          root={{ className: styles.chatMessage }}
        >
          You have 2 new messages from Chris, and 3 meetings today
        </ChatMessage>
        {loadingState !== undefined && (
          <ChatMyMessage
            body={{ className: styles.chatMyMessageBody }}
            root={{ className: styles.chatMyMessage }}
          >
            Summarize my emails from Chris
          </ChatMyMessage>
        )}

        {loadingState !== undefined
          ? (
            loadingState === "latency"
              ? (
                <LatencyWrapper className={styles.latencyWrapper}>
                  <LatencyLoader header={latencyMessage} className={styles.latency}>
                    <AttachmentTag
                      className={styles.tag}
                      media={<Mail16Regular />}
                      content="Marketing Campaign"
                    />
                    {latencyMessage === "Almost there..." && (
                      <AttachmentTag
                        className={styles.tag}
                        media={<Mail16Regular />}
                        content="Q4 stuff"
                      />
                    )}
                  </LatencyLoader>
                  <LatencyCancel>Cancel</LatencyCancel>
                </LatencyWrapper>
              )
              : (
                <ChatMessage
                  body={{
                    children: (_, props) => (
                      <OutputCard isLoading={loadingState === "loading"} {...props}>
                        {cardContent}
                      </OutputCard>
                    ),

                    className: styles.chatMessageBody
                  }}
                  root={{
                    className: styles.chatMessage
                  }}
                ></ChatMessage>
              )
          )
          : null}
      </Chat>

      <div className={styles.inputArea}>
        <SuggestionList reload={{ onClick: handleReload }}>
          <Suggestion onClick={handleSubmit}>
            Summarize my emails from Chris
          </Suggestion>
          <Suggestion>
            Brainstorm ideas for virtual team bonding activity
          </Suggestion>
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
          onSubmit={handleSubmit}
          value={text}
        />
      </div>
    </CopilotProvider>
  );
};
