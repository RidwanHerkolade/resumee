export const generateResumee = async (prompt) => {
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "Smart Resume Builder",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-prover-v2:free",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) {
      throw new Error(await res.text() || "Failed to fetch");
    }

    const data = await res.json();
    return data.choices[0].message.content;
  } catch (err) {
    console.error("OpenRouter error:", err);
    throw err;
  }
};
