import { useEffect, useMemo, useState } from "react";
import { socket } from "../api/socket";

// Imports three React hooks:
// useState: stores component state (values that change and trigger re-render).
// useEffect: runs side effects (like subscribing to socket events).
// useMemo: caches a computed value so it does not get recreated every render.

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState(""); //input stores whatever the user is typing in the input box.

// open stores whether the chat panel is visible.
// Starts as false (hidden).
// setOpen(true) opens it, setOpen(false) closes it.


  // Conversation messages: { from: "user" | "bot", text: string }
  const [messages, setMessages] = useState([ //messages is an array of message objects. It starts with a single bot message so the UI does not look empty.
    { from: "bot", text: "Hi. Open the chat and ask a question." }
  ]);

  // Predefined questions (your idea)
  const quickQuestions = useMemo( //Uses useMemo so the array is created once and reused.
    () => [
      "Hello",
      "How do I save a recipe?",
      "How do I login?",
      "How can I contact support?"
    ],
    [] //Empty dependency array means: “never recompute this, keep the same list forever.”
  );

  useEffect(() => { //first render
    // Listen for bot responses
    const onBotResponse = (payload) => { //Defines the handler function that runs when the backend sends a bot response.
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: payload?.text || "No response received." }
      ]);
    };

// Updates messages using the “functional” state update:
// prev is the previous messages array.
// ...prev copies the old messages.
// Adds a new bot message to the end.
// payload?.text uses optional chaining:
// If payload is undefined or null, it will not crash.
// If there is no payload.text, it shows "No response received."

    socket.on("chat:bot_response", onBotResponse);

    // Cleanup to avoid duplicate listeners (important in React).Removes the listener so you do not accumulate duplicate listeners.
    return () => {
      socket.off("chat:bot_response", onBotResponse);
    };
  }, []);

  //Helper function to send a message (used by both quick buttons and the form submit).
  function sendMessage(text) {
    const trimmed = (text || "").trim();
    if (!trimmed) return;

    // Add user message immediately
    setMessages((prev) => [...prev, { from: "user", text: trimmed }]);

    // Send to backend over socket
    socket.emit("chat:message", { text: trimmed });
  }

  //Runs when the user presses Enter or clicks “Send”.
  function handleSubmit(e) {
    e.preventDefault(); //Prevents the browser from reloading the page (default form behaviour).
    sendMessage(input);
    setInput("");
  }

  return (
    <div style={styles.wrapper}>
      {open && (
        <div style={styles.panel}>
          <div style={styles.header}>
            <div style={{ fontWeight: 600 }}>Help Chat</div>
            <button style={styles.closeBtn} onClick={() => setOpen(false)}>
              X
            </button>
          </div>

          <div style={styles.quickRow}>
            {quickQuestions.map((q) => (
              <button
                key={q}
                style={styles.quickBtn}
                onClick={() => sendMessage(q)}
                type="button"
              >
                {q}
              </button>
            ))}
          </div>

          <div style={styles.messages}>
            {messages.map((m, idx) => (
              <div
                key={idx}
                style={{
                  ...styles.bubble,
                  ...(m.from === "user" ? styles.userBubble : styles.botBubble)
                }}
              >
                {m.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a question..."
              style={styles.input}
            />
            <button type="submit" style={styles.sendBtn}>
              Send
            </button>
          </form>
        </div>
      )}

      {!open && (
        <button style={styles.fab} onClick={() => setOpen(true)}>
          Chat
        </button>
      )}
    </div>
  );
}

// Inline styles to keep implementation simple.
const styles = {
  wrapper: {
    position: "fixed",
    right: 16,
    bottom: 16,
    zIndex: 9999
  },
  fab: {
    padding: "12px 16px",
    borderRadius: 999,
    border: "1px solid #ccc",
    background: "white",
    cursor: "pointer",
    fontWeight: 600
  },
  panel: {
    width: 320,
    height: 420,
    background: "white",
    border: "1px solid #ddd",
    borderRadius: 12,
    boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden"
  },
  header: {
    padding: 12,
    borderBottom: "1px solid #eee",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  closeBtn: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontWeight: 700
  },
  quickRow: {
    padding: 10,
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    borderBottom: "1px solid #eee"
  },
  quickBtn: {
    padding: "6px 8px",
    borderRadius: 10,
    border: "1px solid #ddd",
    background: "white",
    cursor: "pointer",
    fontSize: 12
  },
  messages: {
    padding: 12,
    flex: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 8
  },
  bubble: {
    padding: "8px 10px",
    borderRadius: 10,
    maxWidth: "85%",
    fontSize: 14,
    lineHeight: 1.3
  },
  userBubble: {
    alignSelf: "flex-end",
    border: "1px solid #ddd"
  },
  botBubble: {
    alignSelf: "flex-start",
    border: "1px solid #eee",
    background: "#fafafa"
  },
  form: {
    display: "flex",
    gap: 8,
    padding: 10,
    borderTop: "1px solid #eee"
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    border: "1px solid #ddd"
  },
  sendBtn: {
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid #ddd",
    background: "white",
    cursor: "pointer",
    fontWeight: 600
  }
};
