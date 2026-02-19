"use client";

import type { UIMessage, FileUIPart } from "ai";

import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputBody,
  PromptInputButton,
  PromptInputFooter,
  PromptInputHeader,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
  usePromptInputAttachments,
} from "@/components/ai-elements/prompt-input";
import {
  Attachments,
  Attachment,
  AttachmentPreview,
  AttachmentRemove,
} from "@/components/ai-elements/attachments";
import { Suggestion, Suggestions } from "@/components/ai-elements/suggestion";
import {
  ModelSelector,
  ModelSelectorTrigger,
  ModelSelectorContent,
  ModelSelectorInput,
  ModelSelectorList,
  ModelSelectorEmpty,
  ModelSelectorGroup,
  ModelSelectorItem,
  ModelSelectorLogo,
} from "@/components/ai-elements/model-selector";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { MessageCircle, ChevronDown, Sparkles } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { availableModels, defaultModel, type ModelConfig } from "@/lib/models";

const suggestions = [
  "Explain React hooks with examples",
  "How to optimize database queries?",
  "Write a function to reverse a linked list",
  "Best practices for TypeScript",
  "Debug this code for me",
  "Explain async/await in JavaScript",
];

const SuggestionItem = ({
  suggestion,
  onClick,
}: {
  suggestion: string;
  onClick: (suggestion: string) => void;
}) => {
  const handleClick = useCallback(() => {
    onClick(suggestion);
  }, [onClick, suggestion]);

  return <Suggestion onClick={handleClick} suggestion={suggestion} />;
};

// Helper function to convert blob URL to data URL
const convertBlobUrlToDataUrl = async (url: string): Promise<string | null> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
};

// Component that handles the prompt input with attachments
// Must be rendered inside PromptInput to access the attachments context
const ChatPromptInput = ({
  input,
  setInput,
  status,
  selectedModel,
  onModelChange,
}: {
  input: string;
  setInput: (value: string) => void;
  status: "streaming" | "submitted" | "error" | "ready";
  selectedModel: ModelConfig;
  onModelChange: (model: ModelConfig) => void;
}) => {
  const attachments = usePromptInputAttachments();
  const [modelSelectorOpen, setModelSelectorOpen] = useState(false);

  const isSubmitDisabled = status === "streaming" || (!input.trim() && attachments.files.length === 0);

  return (
    <>
      <PromptInputHeader>
        {attachments.files.length > 0 && (
          <Attachments variant="grid" className="px-2 pt-2">
            {attachments.files.map((file) => (
              <Attachment
                key={file.id}
                data={file}
                onRemove={() => attachments.remove(file.id)}
              >
                <AttachmentPreview />
                <AttachmentRemove />
              </Attachment>
            ))}
          </Attachments>
        )}
      </PromptInputHeader>
      <PromptInputBody>
        <PromptInputTextarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about coding..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (!isSubmitDisabled) {
                const form = e.currentTarget.closest('form');
                form?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
              }
            }
          }}
        />
      </PromptInputBody>
      <PromptInputFooter>
        <PromptInputTools>
          <PromptInputActionMenu>
            <PromptInputActionMenuTrigger />
            <PromptInputActionMenuContent>
              <PromptInputActionAddAttachments />
            </PromptInputActionMenuContent>
          </PromptInputActionMenu>
          
          {/* Model Selector */}
          <ModelSelector open={modelSelectorOpen} onOpenChange={setModelSelectorOpen}>
            <ModelSelectorTrigger asChild>
              <PromptInputButton variant="ghost" className="gap-1.5">
                <Sparkles className="size-3.5" />
                <span className="text-xs text-muted-foreground">{selectedModel.name}</span>
                <ChevronDown className="size-3 text-muted-foreground" />
              </PromptInputButton>
            </ModelSelectorTrigger>
            <ModelSelectorContent title="Select AI Model">
              <ModelSelectorInput placeholder="Search models..." />
              <ModelSelectorList>
                <ModelSelectorEmpty>No models found.</ModelSelectorEmpty>
                <ModelSelectorGroup heading="Available Models">
                  {availableModels.map((model) => (
                    <ModelSelectorItem
                      key={model.id}
                      onSelect={() => {
                        onModelChange(model);
                        setModelSelectorOpen(false);
                      }}
                      className="flex items-center gap-2"
                    >
                      <ModelSelectorLogo 
                        provider={model.provider === "google" ? "google" : "openai"} 
                        className="size-4"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{model.name}</span>
                        <span className="text-xs text-muted-foreground">{model.description}</span>
                      </div>
                      {selectedModel.id === model.id && (
                        <span className="ml-auto text-xs text-primary">✓</span>
                      )}
                    </ModelSelectorItem>
                  ))}
                </ModelSelectorGroup>
              </ModelSelectorList>
            </ModelSelectorContent>
          </ModelSelector>
        </PromptInputTools>
        <PromptInputSubmit
          disabled={isSubmitDisabled}
          status={
            status === "streaming"
              ? "streaming"
              : status === "submitted"
                ? "submitted"
                : "ready"
          }
        />
      </PromptInputFooter>
    </>
  );
};

export const ChatClient = () => {
  const [input, setInput] = useState("");
  const [selectedModel, setSelectedModel] = useState<ModelConfig>(defaultModel);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ 
      api: "/api/chat",
      body: { model: selectedModel.id },
    }),
    onError: (error) => {
      toast.error("Error", {
        description: error.message || "Failed to send message",
      });
    },
  });

  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      if (status === "streaming") return;
      sendMessage({ text: suggestion });
    },
    [status, sendMessage]
  );

  return (
    <div className="relative flex h-full flex-col overflow-hidden max-w-4xl mx-auto w-full">
      <Conversation className="flex-1 px-4 sm:px-6 lg:px-8">
        <ConversationContent className="max-w-3xl mx-auto">
          {messages.length === 0 ? (
            <ConversationEmptyState
              title="Start a conversation"
              description="Ask me anything about coding, debugging, or software development."
              icon={<MessageCircle className="size-8" />}
            />
          ) : (
            messages.map((message: UIMessage) => {
              const textParts = message.parts.filter((p) => p.type === "text");
              const fileParts = message.parts.filter((p) => p.type === "file") as FileUIPart[];
              
              return (
                <Message key={message.id} from={message.role}>
                  <MessageContent>
                    {fileParts.length > 0 && (
                      <Attachments variant="grid" className="mb-3">
                        {fileParts.map((file, index) => (
                          <Attachment
                            key={index}
                            data={{ ...file, id: `${message.id}-${index}` }}
                          >
                            <AttachmentPreview />
                          </Attachment>
                        ))}
                      </Attachments>
                    )}
                    <MessageResponse>
                      {textParts.map((part) => part.text).join("")}
                    </MessageResponse>
                  </MessageContent>
                </Message>
              );
            })
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="border-t bg-background px-4 sm:px-6 lg:px-8 py-4">
        {messages.length === 0 && (
          <Suggestions className="mb-4 max-w-3xl mx-auto">
            {suggestions.map((suggestion) => (
              <SuggestionItem
                key={suggestion}
                onClick={handleSuggestionClick}
                suggestion={suggestion}
              />
            ))}
          </Suggestions>
        )}

        <PromptInput
          className="max-w-3xl mx-auto"
          onSubmit={async (message) => {
            if (status === "streaming") return;
            if (!message.text.trim() && message.files.length === 0) return;

            // Convert files to data URLs and create file parts
            const fileParts: FileUIPart[] = await Promise.all(
              message.files.map(async (file) => {
                let url = file.url || "";
                // Convert blob URL to data URL if needed
                if (url.startsWith("blob:")) {
                  const dataUrl = await convertBlobUrlToDataUrl(url);
                  if (dataUrl) {
                    url = dataUrl;
                  }
                }
                return {
                  type: "file" as const,
                  url,
                  filename: file.filename,
                  mediaType: file.mediaType,
                };
              })
            );

            // Build message parts
            const parts: Array<{ type: "text"; text: string } | FileUIPart> = [];
            if (message.text.trim()) {
              parts.push({ type: "text", text: message.text });
            }
            parts.push(...fileParts);

            // Send message with parts
            sendMessage({
              role: "user",
              parts,
            });

            // Clear input
            setInput("");
          }}
        >
          <ChatPromptInput
            input={input}
            setInput={setInput}
            status={status}
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
          />
        </PromptInput>
      </div>
    </div>
  );
};
