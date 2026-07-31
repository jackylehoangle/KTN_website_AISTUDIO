"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Bot, Loader2, MessageCircle, Send, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

const welcomeMessage: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content: "Xin chào! Em là trợ lý trực tuyến của KTN. Em có thể biết tên để tiện xưng hô không ạ?",
};

function createSessionId() {
  return `ktn-web-${crypto.randomUUID()}`;
}

export function Chatbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const sessionId = useRef("");
  const scrollAnchor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollAnchor.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending]);

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = input.trim();
    if (!message || isSending) return;

    if (!sessionId.current) {
      sessionId.current = localStorage.getItem("ktn-chat-session") || createSessionId();
      localStorage.setItem("ktn-chat-session", sessionId.current);
    }

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: message,
    };
    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message, sessionId: sessionId.current }),
      });
      const result = (await response.json()) as { ok?: boolean; reply?: string; message?: string };
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: response.ok && result.reply
            ? result.reply
            : result.message || "Trợ lý KTN chưa thể phản hồi. Vui lòng thử lại.",
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Kết nối đang bị gián đoạn. Có thể gọi hotline **0877 008 216** để được hỗ trợ ngay.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="fixed bottom-[max(8.75rem,calc(env(safe-area-inset-bottom)+8.75rem))] right-3 z-50 sm:bottom-40 sm:right-6 print:hidden">
      {isOpen && (
        <section
          aria-label="Trợ lý trực tuyến KTN"
          className="absolute bottom-16 right-0 flex h-[min(34rem,calc(100dvh-8rem))] w-[min(24rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-3xl border bg-white shadow-2xl shadow-navy/20"
        >
          <header className="flex items-center gap-3 bg-navy px-4 py-3.5 text-white">
            <span className="grid size-10 place-items-center rounded-full bg-cyan">
              <Bot className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="font-black">Trợ lý KTN</h2>
              <p className="text-xs text-white/75">Tư vấn trực tuyến 24/7</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Đóng cửa sổ trò chuyện"
              className="grid size-9 place-items-center rounded-full transition hover:bg-white/10"
            >
              <X className="size-5" />
            </button>
          </header>

          <div aria-live="polite" className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-6 ${
                  message.role === "user"
                    ? "ml-auto rounded-br-md bg-primary text-white"
                    : "rounded-bl-md border bg-white text-foreground shadow-sm"
                }`}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    a: ({ ...props }) => <a {...props} target="_blank" rel="noreferrer" className="underline" />,
                    p: ({ children }) => <p>{children}</p>,
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            ))}
            {isSending && (
              <div className="flex w-fit items-center gap-2 rounded-2xl rounded-bl-md border bg-white px-3.5 py-3 text-sm text-muted-foreground shadow-sm">
                <Loader2 className="size-4 animate-spin" />
                KTN đang trả lời...
              </div>
            )}
            <div ref={scrollAnchor} />
          </div>

          <form onSubmit={sendMessage} className="border-t bg-white p-3">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Nhập câu hỏi tại đây..."
                aria-label="Nội dung trò chuyện"
                maxLength={2_000}
                disabled={isSending}
                autoComplete="off"
              />
              <Button
                type="submit"
                size="icon"
                aria-label="Gửi tin nhắn"
                disabled={!input.trim() || isSending}
                className="shrink-0 bg-orange hover:bg-orange/90"
              >
                {isSending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
              </Button>
            </div>
            <p className="mt-2 text-center text-[10px] text-muted-foreground">
              Không chia sẻ mật khẩu hoặc thông tin thanh toán trong hội thoại.
            </p>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-label={isOpen ? "Đóng trợ lý KTN" : "Mở trợ lý KTN"}
        aria-expanded={isOpen}
        className="group relative grid size-12 place-items-center rounded-full bg-primary text-white shadow-xl shadow-primary/35 transition hover:scale-110 hover:bg-primary/90 sm:size-13"
      >
        {!isOpen && <span className="absolute -inset-1 animate-ping rounded-full bg-primary/20" />}
        {isOpen ? <X className="relative size-6" /> : <MessageCircle className="relative size-6" />}
        {!isOpen && (
          <span className="pointer-events-none absolute right-15 whitespace-nowrap rounded-xl bg-navy px-3.5 py-2 text-xs font-black text-white opacity-0 shadow-xl transition group-hover:opacity-100">
            Chat trực tiếp với KTN
          </span>
        )}
      </button>
    </div>
  );
}

