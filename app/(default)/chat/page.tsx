"use client";

import { useState, useEffect, useRef } from "react";

export default function Blog() {
  const [messages, setMessages] = useState<
    Array<{ sender: string; message: string }>
  >([]);

  const [input, setInput] = useState("");
  const ws = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const user =
    typeof window !== "undefined"
      ? sessionStorage.getItem("user") || "Anonymous"
      : "Anonymous";

  useEffect(() => {
    ws.current = new WebSocket(
      `wss://b1ev5f5h6j.execute-api.ap-southeast-2.amazonaws.com/prod?user=${user}&chatroom=1`
    );

    ws.current.onmessage = (event) => {
      const receivedData = JSON.parse(event.data);
      const newMessage = {
        sender: receivedData.user,
        message: receivedData.message,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    ws.current.onclose = () => {
      console.log("WebSocket closed");
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (ws.current && input.trim()) {
      const newMessage = { message: input, chatroom: "1", user };
      ws.current.send(JSON.stringify(newMessage));
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: user, message: input },
      ]);
      setInput("");
    }
  };

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Page header */}
          <div className="max-w-3xl pb-12 md:pb-20 text-center md:text-left">
            <h1 className="h1 mb-4">Douglas Demo Chat room</h1>
          </div>

          {/* Main content */}
          <div className="flex flex-col justify-between h-[500px]">
            <div className="overflow-y-auto flex-grow mb-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 my-2 rounded-lg max-w-xs ${
                    msg.sender === user
                      ? "bg-blue-500 text-white self-end ml-auto"
                      : "bg-gray-300 text-black self-start"
                  }`}
                >
                  <p className="font-semibold">{msg.sender}</p>
                  <p>{msg.message}</p>
                </div>
              ))}
              <div ref={messagesEndRef}></div>
            </div>

            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="form-input w-full border rounded-l-lg p-2"
                placeholder="Type your message..."
              />
              <button
                onClick={sendMessage}
                className="bg-blue-600 text-white px-4 py-2 rounded-r-lg"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
