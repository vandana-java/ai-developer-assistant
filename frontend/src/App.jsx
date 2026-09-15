import { useState } from "react";
import ReactMarkdown from "react-markdown";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");

    try {
      const response = await fetch(
        `http://localhost:8080/api/ask?question=${encodeURIComponent(question)}`
      );

      if (!response.ok) {
        throw new Error("Failed to get AI response");
      }

      const data = await response.text();
      setAnswer(data);
    } catch (error) {
      setAnswer(
        "Unable to connect to the AI backend. Please make sure Spring Boot and Ollama are running."
      );
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setQuestion("");
    setAnswer("");
  };

  return (
    <div className="app">
      <h1>AI Developer Assistant</h1>

      <p>Ask AI anything about software development.</p>

      <textarea
        placeholder="Ask a coding question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        disabled={loading}
      />

      <div className="buttons">
        <button onClick={askAI} disabled={loading || !question.trim()}>
          {loading ? "AI is thinking..." : "Ask AI"}
        </button>

        <button onClick={clearChat} disabled={loading}>
          Clear
        </button>
      </div>

      {answer && (
        <div className="answer">
          <h2>AI Response</h2>
          <ReactMarkdown>{answer}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default App;