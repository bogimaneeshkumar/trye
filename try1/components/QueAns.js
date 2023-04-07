import { useState } from "react";
import styles from "./QueAns.module.css";
import Cors from "cors";
const cors = Cors();

function QueAns() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://127.0.0.1:5000/api/answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });

    const { answer } = await response.json();
    setAnswer(answer);
  };

  const handleChange = (event) => {
    setQuestion(event.target.value);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <label className={styles.label}>
          Question:
          <input
            type="text"
            value={question}
            onChange={handleChange}
            className={styles.input}
          />
        </label>
        <button type="submit" className={styles.button}>
          Ask
        </button>
      </form>
      {answer && (
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Answer</h2>
          <p className={styles.cardText}>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default QueAns;
