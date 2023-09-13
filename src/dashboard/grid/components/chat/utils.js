export function getUserInputForCode (message) {
  return {
    role: "user",
    content: message
  };
}

export function getAssistantOutput (message) {
  return {
    role: "assistant",
    content: message
  };
}

export const getNewAPICallSendData = (chatHistory, row) => {
  if (chatHistory.length > 0 && row) {
    let firstUser = true;
    return chatHistory.map((chat) => {
      const { isUser, messages } = chat;

      let extendMessage = "";
      if (firstUser && isUser) {
        extendMessage = `${messages.join(",")}, the description of this string is ${row.devComment},
        and current tranlation is ${row.finalTranslation && row.finalTranslation.length > 0
    ? row.finalTranslation
    : row.gptTranslation},
        please help to regenerate the translation of following string:
        ${row.original}`;
        firstUser = false;
      }

      return isUser ? getUserInputForCode(extendMessage || messages.join(",")) : getAssistantOutput(messages.join(","));
    });
  }
  return null;
};
