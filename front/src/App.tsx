import { useState } from "react";
import "./App.css";

interface ApiResponse {
  data?: string;
}

function App() {
  const [inputValue, setInputValue] = useState<number | "">("");
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const callApi = async () => {
    setResponse(null);
    setError(null);
    if (inputValue === "" || inputValue < 1 || inputValue > 100) {
      setError("The number must be between 1 and 100.");
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/roman/convert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ number: inputValue }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.data);
        return;
      }

      const data: ApiResponse = await res.json();
      setResponse(data);
    } catch {
      setError("API Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-center text-3xl py-6 font-bold">Jolimoi</h1>
      <form className="max-w-sm mx-auto mt-10">
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
          onClick={callApi}
          disabled={loading || inputValue === ""}
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
        >
          {loading ? "..." : "Convert"}
        </button>
      </form>

      {error && (
        <div className="max-w-sm mx-auto mt-10 text-center">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {response && (
        <div className="max-w-sm mx-auto mt-10 text-center">
          <p className="text-3xl font-bold">{response.data}</p>
        </div>
      )}
    </>
  );
}

export default App;
