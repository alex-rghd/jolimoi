import React, { useState } from "react";
import "./App.css";
import DisplayError from "./components/display-error";
import { v4 as uuidv4 } from "uuid";

interface ApiResponse {
  data?: string;
}

function App() {
  const [inputValue, setInputValue] = useState<number | "">("");
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<ApiResponse | null>();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const connectionId = uuidv4();

    const eventSource = new EventSource(
      `http://localhost:3001/roman/events?connectionId=${connectionId}`
    );

    eventSource.onmessage = (event) => {
      const parsed = JSON.parse(event.data);
      setResponse(parsed);
    };

    eventSource.onerror = () => {
      eventSource.close();
      setLoading(false);
    };

    try {
      const res = await fetch("http://localhost:3001/roman/convert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          number: inputValue,
          connectionId: connectionId,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.data);
        setResponse(null);
        eventSource.close();
        return;
      }
    } catch {
      setError("API Error");
      setLoading(false);
      eventSource.close();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-center text-3xl py-6 font-bold">Jolimoi</h1>
      <form className="max-w-sm mx-auto mt-10" onSubmit={handleSubmit}>
        <label
          htmlFor="inputValue"
          className={`block font-semibold mb-2 ${error && "text-red-500"}`}
        >
          Enter a number between 1 and 100
        </label>
        <input
          type="number"
          id="inputValue"
          name="inputValue"
          onChange={(e) =>
            setInputValue(e.target.value === "" ? "" : Number(e.target.value))
          }
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          required
        />
        <button
          type="submit"
          disabled={loading || inputValue === ""}
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
        >
          {loading ? "..." : "Convert"}
        </button>
      </form>

      <DisplayError error={error} />

      {response && (
        <div className="max-w-sm mx-auto mt-10 text-center">
          <p className="text-3xl font-bold">{response.data}</p>
        </div>
      )}
    </>
  );
}

export default App;
