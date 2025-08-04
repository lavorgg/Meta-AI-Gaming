console.log(document.getElementById('aiResponse'));


const apiKeyInput = document.getElementById('apiKey')
const gameSelect = document.getElementById('gameSelect')
const questionInput = document.getElementById('questionInput')
const askButton = document.getElementById('askButton')
const aiResponse = document.getElementById('aiResponse')
const form = document.getElementById('form')

const markdownToHtml = (markdown) => {
  const converter = new showdown.Converter()
  return converter.makeHtml(markdown)
}

const perguntarAI = async (question, game, apiKey) => {
  const model = "gemini-2.5-flash"
  const geminiURL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent=true?key=${apiKey}`

  const pergunta = `
    ##Especialidade
    -Você é um especialista assistente de Meta para o jogo ${game}

    ##Tarefas
    -Você deve responder as perguntas do usuário com base no seu conhecimento do jogo, estrátegias, dicas, etc.

    ##Regras
    -Se você não sabe a resposta, responda "Eu não sei" e não tente inventar nenhuma outra resposta.
    -Se a pergunta não for sobre o jogo escolhido, responda a pergunta com "Não está relacionada ao jogo escolhido.
    -Considere a data atual ${new Date().toLocaleDateString()}.
    -Faça pesquisas atualizadas sobre a versão de jogo mais atual. Se a pergunta pedir uma versão antiga, busque a versão mais antiga, se não houver, busque a mais recente.
    -Nunca responda coisas que você não tem certeza sobre o jogo escolhido.

    ##Respostas
    -Economize na resposta, sejá direto e não responda com um texto tão longo
    -Não precisa fazer nenhuma saudação ou despedida, apenas responda o que o usuário está perguntando.
    Reponda em markdown.

    ---
    Aqui está a pergunta: ${question}
  `

  const contents = [{
    role: "user",
    parts: [{
      text: pergunta
    }]
  }]

  const tools = [{
    google_search: {}
}]

  const response = await fetch("http://127.0.0.1:5000/api/gemini", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents,
      tools
    })
  })

  const data = await response.json()
  return data.candidates[0].content.parts[0].text
}

const sendForm = async (event) => {
  event.preventDefault()

  const apiKey = apiKeyInput.value
  const game = gameSelect.value
  const question = questionInput.value

  if(apiKey == '' || game == '' || question == '') {
    alert('Informe todos os dados!')
    return
  }

  askButton.disabled = true
  askButton.innerText = 'Perguntando...'
  askButton.classList.add('loading')

  try {
    const text = await perguntarAI(question, game, apiKey)
    aiResponse.querySelector('.response_content').innerHTML = markdownToHtml(text)
    aiResponse.classList.remove('hidden')
  } catch(error) {
      console.log('Erro: ', error)
    } finally {
      askButton.disabled = false
      askButton.innerText = 'Perguntar'
      askButton.classList.remove('loading')
    }
  
  }

form.addEventListener('submit', sendForm)