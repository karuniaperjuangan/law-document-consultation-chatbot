import { StringOutputParser } from "@langchain/core/output_parsers";
import { chatModel } from "./chatModel.js";
import { generateChatHistoryTitlePrompt } from "./prompt.js";
import type { Message } from "../model/message.js";

export async function generateChatHistoryTitle(messages: Message[]) {
    // Message is an array of two strings, the first being the role of sender and the second being the message
    const contentString = messages.map(message => `${message.role}: ${message.content}`).join('\n');
    const pipe = generateChatHistoryTitlePrompt.pipe(chatModel).pipe(new StringOutputParser());
    const title = await pipe.invoke({"query":contentString});
    return title;
}