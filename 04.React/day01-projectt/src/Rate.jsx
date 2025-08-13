import { useState } from "react";

import { Button } from "@/components/ui/button";

const API_URL = "https://api.frankfurter.app/latest?from=USD&to=KRW";
export default function Rate() {
  const [input, setInput] = useState("");
  const [rate, setRate] = useState(null);
  const [krw, setKrw] = useState(null);
  const [error, setError] = useState(null);

  const fetchRate = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) {
        return;
      }

      const data = await res.json();
      const resultRate = data?.rates?.KRW;
      setRate(resultRate);
      return resultRate;
    } catch (error) {
      console.error(error);
      setError(error.message);
      setRate(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input) {
      return;
    }
    const result = await fetchRate();
    setKrw((input * 1 || 0) * result);
  };

  const formatted = (num) => Number(num).toLocaleString();

  return (
    <div>
      <h1>USD KRW 환율 계산기</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="USD 금액 입력"
        />
        <div className="p-4 bg-pink-500 text-white rounded-lg">Tailwind OK</div>
        <Button className="bg-pink-500">변환</Button>
      </form>

      {error && <p className="error">{error}</p>}

      <p className="rateResult">현재 환율: 1 USD = {formatted(rate)} KRW</p>
      <p className="krwResult">
        {krw != null &&
          Number(input) > 0 &&
          `결과: ${formatted(input)} USD = ${formatted(krw)} KRW`}
      </p>
    </div>
  );
}
