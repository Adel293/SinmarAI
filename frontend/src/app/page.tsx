"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import axios from "axios";

interface Message {
  role: "user" | "assistant";
  content: string;
  type?: "sql" | "clarification";
}

interface ChatSession {
  id: number;
  title: string;
  messages: Message[];
}

interface Branch {
  id: string;
  name: string;

}
export default function Home() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  
  const [sessions, setSessions] = useState<
    ChatSession[]
  >([]);

  const [currentChatId, setCurrentChatId] =
    useState<number | null>(null);
const [searchTerm, setSearchTerm] =
  useState("");

const [editingChatId, setEditingChatId] =
  useState<number | null>(null);

const [editingTitle, setEditingTitle] =
  useState("");

const [selectedBranch, setSelectedBranch] =
  useState("01");

const branches: Branch[] = Array.from(
  { length: 99 },
  (_, i) => ({
    id: String(i + 1).padStart(2, "0"),
    name: `Branch ${String(i + 1).padStart(
      2,
      "0"
    )}`,
  })
);

  const currentChat = sessions.find(
    (chat) => chat.id === currentChatId
  );

  const messages = currentChat?.messages || [];
const filteredChats = sessions.filter(
  (chat) =>
    chat.title
      .toLowerCase()
      .includes(
        searchTerm.toLowerCase()
      )
);
  const messagesEndRef =
    useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  useEffect(() => {
    const saved =
      localStorage.getItem("sinmar-chats");

    if (saved) {
      const parsedChats =
        JSON.parse(saved);

      setSessions(parsedChats);

      if (parsedChats.length > 0) {
        setCurrentChatId(parsedChats[0].id);
      }
    } else {
      const firstChat = {
        id: Date.now(),
        title: "New Chat",
        messages: [],
      };

      setSessions([firstChat]);

      setCurrentChatId(firstChat.id);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "sinmar-chats",
      JSON.stringify(sessions)
    );
  }, [sessions]);

  const createNewChat = () => {
    const newChat: ChatSession = {
      id: Date.now(),
      title: "New Chat",
      messages: [],
    };

    setSessions((prev) => [
      newChat,
      ...prev,
    ]);

    setCurrentChatId(newChat.id);
  };

  const deleteChat = (chatId: number) => {
    const filteredChats =
      sessions.filter(
        (chat) => chat.id !== chatId
      );

    if (filteredChats.length === 0) {
      const newChat = {
        id: Date.now(),
        title: "New Chat",
        messages: [],
      };

      setSessions([newChat]);

      setCurrentChatId(newChat.id);

      return;
    }

    setSessions(filteredChats);

    if (currentChatId === chatId) {
      setCurrentChatId(
        filteredChats[0].id
      );
    }
  };

  const generateSQL = async () => {
    if (!question.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: question,
    };

    const updatedMessages = [
      ...messages,
      userMessage,
    ];

    setSessions((prev) =>
      prev.map((chat) =>
        chat.id === currentChatId
          ? {
              ...chat,

              title:
                chat.messages.length === 0
                  ? question.slice(0, 30)
                  : chat.title,

              messages: updatedMessages,
            }
          : chat
      )
    );

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/generate-sql",
        {
  question,
  messages: updatedMessages,
  branch: selectedBranch,
}
      );

      const aiMessage: Message = {
        role: "assistant",
        type: response.data.type,
        content:
          response.data.type === "clarification"
            ? response.data.message
            : response.data.sql,
      };

      setSessions((prev) =>
        prev.map((chat) =>
          chat.id === currentChatId
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  aiMessage,
                ],
              }
            : chat
        )
      );

      setQuestion("");
    } catch (error) {
      console.error(error);

      alert("Error generating SQL");
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setSessions((prev) =>
      prev.map((chat) =>
        chat.id === currentChatId
          ? {
              ...chat,
              messages: [],
            }
          : chat
      )
    );
  };

  return (
    <main className="min-h-screen bg-black text-white flex">
      <aside className="w-72 border-r border-zinc-800 p-4 hidden md:flex flex-col bg-black">
<button
  onClick={createNewChat}
  className="bg-white text-black rounded-2xl p-4 font-bold mb-6 hover:bg-zinc-200 transition"
>
  + New Chat
</button>

<input
  type="text"
  placeholder="Search chats..."
  value={searchTerm}
  onChange={(e) =>
    setSearchTerm(e.target.value)
  }
  className="mb-4 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2 w-full"
/>
        <div className="space-y-3 overflow-auto">
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              className={
                currentChatId === chat.id
                  ? "bg-zinc-800 border border-zinc-600 rounded-2xl p-3 flex items-center justify-between group"
                  : "bg-zinc-950 border border-zinc-800 rounded-2xl p-3 flex items-center justify-between hover:bg-zinc-900 transition group"
              }
            >
              <div
                onClick={() =>
                  setCurrentChatId(chat.id)
                }
                className="flex-1 truncate cursor-pointer"
              >
                {chat.title}
              </div>

              <button
                onClick={() =>
                  deleteChat(chat.id)
                }
                className="ml-3 text-zinc-500 hover:text-red-500 transition opacity-0 group-hover:opacity-100"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </aside>

      <div className="flex-1">
        <div className="max-w-5xl mx-auto p-6 pb-40">
          <div className="flex items-center justify-between mb-10">
            <h1 className="text-4xl font-bold">
              Sinmar AI SQL Assistant
            </h1>
<div className="mt-4 mb-6 flex items-center gap-3">
  <span className="text-zinc-400">
    Branch:
  </span>

  <select
    value={selectedBranch}
    onChange={(e) =>
      setSelectedBranch(e.target.value)
    }
    className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2"
  >
    {branches.map((branch) => (
      <option
        key={branch.id}
        value={branch.id}
      >
        {branch.id}
      </option>
    ))}
  </select>

  <span className="text-zinc-500 text-sm">
    Invt-{selectedBranch}-Current
  </span>
</div>
            <button
              onClick={clearChat}
              className="bg-zinc-800 hover:bg-zinc-700 transition px-5 py-3 rounded-2xl border border-zinc-700"
            >
              Clear Chat
            </button>
          </div>

          <div className="space-y-6 mb-10">
            {messages.map((message, index) => (
              <div
                key={index}
                className={
                  message.role === "user"
                    ? "flex justify-end"
                    : "flex justify-start"
                }
              >
                <div
                  className={
                    message.role === "user"
                      ? "bg-white text-black p-4 rounded-2xl max-w-2xl shadow-lg"
                      : "bg-zinc-900 border border-zinc-700 p-4 rounded-2xl max-w-3xl w-full shadow-lg"
                  }
                >
                  {message.role === "assistant" ? (
                    message.type ===
                    "clarification" ? (
                      <p className="leading-8 text-base">
                        {message.content}
                      </p>
                    ) : (
                      <div className="relative">
                        <button
                          onClick={() =>
                            navigator.clipboard.writeText(
                              message.content
                            )
                          }
                          className="absolute top-0 right-0 bg-white text-black px-3 py-1 rounded-lg text-sm font-bold hover:bg-zinc-200 transition"
                        >
                          Copy
                        </button>

                        <pre className="overflow-auto pr-20 whitespace-pre-wrap text-sm leading-8 font-mono">
                          {message.content}
                        </pre>
                      </div>
                    )
                  ) : (
                    <p className="leading-8 text-base">
                      {message.content}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-zinc-900 border border-zinc-700 p-4 rounded-2xl shadow-lg animate-pulse">
                  Sinmar AI is thinking...
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="sticky bottom-0 bg-black pt-4">
            <div className="flex gap-4 items-end">
              <textarea
                value={question}
                onChange={(e) =>
                  setQuestion(e.target.value)
                }
                placeholder="اكتب سؤالك هنا..."
                className="flex-1 h-28 p-4 rounded-2xl bg-zinc-900 border border-zinc-700 focus:outline-none focus:border-white resize-none"
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    !e.shiftKey
                  ) {
                    e.preventDefault();

                    generateSQL();
                  }
                }}
              />

              <button
                onClick={generateSQL}
                disabled={loading}
                className="bg-white text-black px-8 h-28 rounded-2xl font-bold hover:bg-zinc-200 transition disabled:opacity-50"
              >
                {loading ? "..." : "إرسال"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}