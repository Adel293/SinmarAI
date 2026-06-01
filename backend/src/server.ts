import { buildPrompt } from "./prompts/buildPrompt";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

app.get("/", (req, res) => {
  res.send("Sinmar AI Backend Running");
});

app.post("/generate-sql", async (req, res) => {
  try {
    const {
      question,
      messages,
      branch,
    } = req.body;

    const recentMessages =
      messages
        ?.filter((m: any) => m.role === "user")
        .slice(-3)
        .map((m: any) => m.content)
        .join("\n") || "";

    const prompt = buildPrompt(
      question,
      recentMessages,
      branch || "01"
    );

    const response =
      await openai.chat.completions.create({
        model: "deepseek/deepseek-chat",
        messages: [
          {
            role: "system",
            content: prompt,
          },
        ],
        temperature: 0,
      });

    const result =
      response.choices[0].message.content?.trim() ||
      "";

    const cleanedResult = result
      .replace(/```sql/g, "")
      .replace(/```/g, "")
      .trim();

    if (
      cleanedResult.startsWith("CLARIFY:")
    ) {
      return res.json({
        success: true,
        type: "clarification",
        message: cleanedResult
          .replace("CLARIFY:", "")
          .trim(),
      });
    }

    return res.json({
      success: true,
      type: "sql",
      sql: cleanedResult,
    });
  } catch (error: any) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message:
        error?.message ||
        "Internal Server Error",
    });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(
    `Sinmar AI Backend Running On Port ${PORT}`
  );
});