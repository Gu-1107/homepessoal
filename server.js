const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { v4: uuidv4 } = require('uuid'); // Adiciona uuid para gerar IDs únicos
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Simples armazenamento em memória para chats (não persiste após reiniciar o servidor)
const chats = {};

app.post('/api/gemini', async (req, res) => {
  try {
    const { message, chatId } = req.body;
    let currentChatId = chatId;

    if (!currentChatId) {
      currentChatId = uuidv4();
      chats[currentChatId] = [];
    }
    if (!chats[currentChatId]) {
      chats[currentChatId] = [];
    }

    chats[currentChatId].push({ role: 'user', content: message });

    const systemPrompt = `Você é um chatbot criado por Gustavo, um desenvolvedor de software. Você pode responder perguntas sobre seus projetos, como o chatbot que você está usando agora.
    Você também pode responder perguntas sobre programação, desenvolvimento de software e tecnologia em geral.
    Você não deve responder perguntas pessoais ou fornecer informações que não sejam relevantes para o desenvolvimento de software.
    Você deve sempre manter um tom amigável e profissional.
    Dados do Gustavo para referência:
    Tenho 22 anos e sou analista tecnológico, desenvolvedor de software sites e aplicativos, com experiência em JavaScript, Node.js, React, HTML, CSS, Python. Sempre buscando aprender mais e se aprimorar na área de tecnologia.
    - Nome: Gustavo Martins
    - Instagram: https://www.instagram.com/gustavo_s.m.r/
    - LinkedIn: https://www.linkedin.com/in/gustavo-da-silva-martins-429b8331a/
    - Email: gustavoflautist@gmail.com
    - GitHub: https://github.com/Gu-1107`;

    // Junta o systemPrompt com o histórico do chat
    const promptText = [
      systemPrompt,
      ...chats[currentChatId].map(msg => `${msg.role === 'user' ? 'Usuário' : 'Assistente'}: ${msg.content}`)
    ].join('\n');

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(promptText);
    const response = await result.response;

    chats[currentChatId].push({ role: 'assistant', content: response.text() });

    res.json({ reply: response.text(), chatId: currentChatId });
  } catch (error) {
    console.error(error);
    res.json({ reply: "Erro ao conectar com a IA." });
  }
});

app.listen(5000, () => console.log('Servidor rodando na porta 5000'));