window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
});

// Suaviza a rolagem para links da navbar (apenas se houver links internos)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Funções e eventos do chatbot (apenas se existir o chat)
function scrollToBottom() {
  const chatBox = document.getElementById('chatBox');
  if (chatBox) {
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

function addMessage(content, isUser = false) {
  const chatBox = document.getElementById('chatBox');
  if (chatBox) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    messageDiv.textContent = content;
    chatBox.appendChild(messageDiv);
    scrollToBottom();
  }
}

function getBotResponse(userMessage) {
  const message = userMessage.toLowerCase();
  if (message.includes('oi') || message.includes('olá')) {
    return 'Oi! Tudo bem? Como posso te ajudar hoje?';
  } else if (message.includes('projeto') || message.includes('projetos')) {
    return 'Eu sei sobre os projetos do Gustavo! Ele criou um chatbot em JavaScript, trabalhou como SDR na Capitão Consórcios e desenvolveu uma API para bancos de dados. Quer saber mais sobre algum deles?';
  } else if (message.includes('chatbot')) {
    return 'Esse sou eu! Fui criado em JavaScript pelo Gustavo para ajudar a responder perguntas de forma interativa. O que acha de mim? 😄';
  } else if (message.includes('sdr') || message.includes('atendimento')) {
    return 'O Gustavo trabalhou como SDR na Capitão Consórcios, qualificando leads e construindo relacionamentos com clientes. Quer saber mais sobre essa experiência?';
  } else if (message.includes('api') || message.includes('banco de dados')) {
    return 'A API do Gustavo permite acesso seguro e eficiente a bancos de dados com arquitetura REST. É um projeto bem legal! Quer detalhes técnicos?';
  } else if (message.includes('gustavo') || message.includes('quem é')) {
    return 'Gustavo Martins é um desenvolvedor e SDR apaixonado por tecnologia. Ele cria chatbots, APIs e trabalha na Capitão Consórcios. Quer conhecer os links dele?';
  } else if (message.includes('link') || message.includes('redes')) {
    return 'Aqui estão os links do Gustavo: Instagram (https://www.instagram.com/gustavo_s.m.r/), LinkedIn (https://www.linkedin.com/in/gustavo-da-silva-martins-429b8331a/), e Capitão Consórcios (https://www.capitaoconsorcios.com/cópia-início).';
  } else {
    return 'Hmm, não sei sobre isso. Tente perguntar sobre os projetos do Gustavo, como o chatbot, SDR ou a API!';
  }
}

// Só ativa o chatbot se os elementos existirem na página
const sendButton = document.getElementById('sendButton');
const userInput = document.getElementById('userInput');

if (sendButton && userInput) {
  sendButton.addEventListener('click', () => {
    const message = userInput.value.trim();
    if (message) {
      addMessage(message, true);
      setTimeout(() => {
        const response = getBotResponse(message);
        addMessage(response);
      }, 500);
      userInput.value = '';
    }
  });

  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendButton.click();
    }
  });
}
