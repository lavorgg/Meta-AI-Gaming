
# 🕹️ Meta Assistant – NLW Agents

Este é um assistente de IA focado em dar dicas, estratégias e sugestões personalizadas para jogos como **Counter-Strike, Apex Legends, Fortnite** e **Minecraft**, utilizando a API do **Gemini (Google AI)**.

---

##  Funcionalidade

O usuário informa:

- Sua **chave da API do Gemini**
- O **jogo desejado**
- E a **pergunta sobre o jogo**

O sistema envia a pergunta para um **servidor proxy em Python (Flask)**, que encaminha a requisição para a API Gemini e retorna uma resposta **formatada em Markdown**, exibida automaticamente na tela.

---

##  Tecnologias utilizadas

### Frontend

- HTML5
- CSS3
- JavaScript (Vanilla)
- [Showdown.js](https://github.com/showdownjs/showdown) (Markdown → HTML)

### Backend

- Python 3.x
- Flask
- Flask-CORS
- Requests

---

##  Estrutura do Projeto

```
nlw-agents/
├── assets/
│   └── logo.png
├── index.html
├── style.css
├── script.js
├── proxy_server.py
└── README.md
```

---

##  Como executar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/nlw-agents.git
cd nlw-agents
```

### 2. Instalar dependências do backend

```bash
pip install flask flask-cors requests
```

> Certifique-se de ter o Python 3.x instalado.  
> Recomendado: usar ambiente virtual.

### 3. Rodar o servidor proxy (Flask)

```bash
python proxy_server.py
```

Isso irá iniciar o backend em:

```
http://127.0.0.1:5000
```

---

##  Como funciona a integração com a API Gemini

Devido à política de segurança dos navegadores (CORS), **o frontend não pode se comunicar diretamente com a API Gemini**.

Por isso, criamos um **servidor proxy** em Python que:

1. Recebe os dados do frontend (`POST /api/gemini`)
2. Insere a API Key e faz a requisição para a [API do Gemini](https://ai.google.dev/)
3. Retorna apenas a resposta da IA para o frontend

Isso **evita erros de CORS** e também mantém sua **chave da API mais segura**, longe do navegador.

---

##  Exemplo de uso

1. Abra o arquivo `index.html` no navegador.
2. Insira sua chave de API Gemini (ex: `AIza...`)
3. Escolha um jogo (Ex: Apex Legends)
4. Faça uma pergunta (Ex: "Qual a melhor arma para curta distância?")
5. A resposta da IA será exibida na tela.

---

## 🛠️ Detalhes técnicos do proxy (`proxy_server.py`)

```python
@app.route('/api/gemini', methods=['POST'])
def proxy_to_gemini():
    payload = request.get_json()
    
    url = f'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={{API_KEY}}'

    response = requests.post(url, json=payload, headers={
        'Content-Type': 'application/json'
    })

    return jsonify(response.json()), response.status_code
```

- O servidor **reencaminha** a requisição para a API do Google.
- Utiliza a biblioteca `requests` para isso.
- Com `Flask-CORS`, o frontend local (localhost:5500) pode se comunicar com ele sem problemas de CORS.

---

##  Observações

- O projeto ainda está em desenvolvimento.
- A IA responde em **Markdown** para permitir formatações simples como listas, destaques, etc.
- A chave da API é inserida manualmente para facilitar testes (pode ser protegida via backend futuramente).

---

##  Créditos

- Projeto desenvolvido com base no **NLW - Rocketseat**
- Backend customizado para contornar limitações de CORS ao usar a API Gemini (Google)

---

##  Licença

MIT License © Gabriel Lavor
