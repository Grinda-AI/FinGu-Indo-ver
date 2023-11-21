"use client";

import ChatBody from "@/components/ChatBody";
import ChatFooter from "@/components/ChatFooter";
import { Header } from "@/components/Header";
import Spinner from "@/components/Spinner";
import SystemPromptEditor from "@/components/SystemPromptEditor";
import { DEFAULT_SYSTEM_PROMPT } from "@/constant";
import { useReadSessionQuery } from "@/store/authApi";
import { useReadMessagesQuery } from "@/store/chatBotApi";
import { useChat } from "ai/react";
import { useState } from "react";
import { v4 as uuid } from "uuid";

export default function Chat() {
  const [systemPrompt, setSystemPrompt] = useState(DEFAULT_SYSTEM_PROMPT);
  const session = useReadSessionQuery({})
  const messagesArr = useReadMessagesQuery({ pageSize: 100, page: 1, order: "desc" })

  const accessToken = session?.data?.access_token

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    append,
    error,
  } = useChat({
    initialMessages: messagesArr.data,
    headers: {
      "Authorization": `Bearer ${accessToken}`
    },
  });

  return (
    <main className="m-auto flex h-full w-full max-w-screen-2xl flex-col ">
      <Header/>
      <div className="flex flex-1 overflow-hidden">
        <SystemPromptEditor value={systemPrompt} onChange={setSystemPrompt} />
        <div className="flex flex-1 flex-col overflow-auto">
          {error && (
            <div className="flex flex-1 items-center justify-center p-4">
              <div className="text-error-content">{error.message}</div>
            </div>
          )}
          {messagesArr.isSuccess && (
            <>
              <ChatBody messages={messages} isLoading={isLoading} />

              <ChatFooter
                input={input}
                onInputChange={handleInputChange}
                onSubmit={handleSubmit}
                onSuggestionClick={(suggestion) => {
                  append({
                    id: uuid(),
                    content: suggestion,
                    role: "user",
                  });
                }}
              />
            </>
          )}
          {messagesArr.isFetching && (
            <div className="flex h-full w-full flex-col items-center justify-center space-y-4 text-sm text-base-content">
              <Spinner />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}