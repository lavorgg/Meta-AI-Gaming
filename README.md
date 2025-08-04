# Meta AI Gaming

O Meta AI Gaming utiliza a AI Gemini, do Google, como fonte de pesquisa para os jogos. Para receber as respostas, será necessário requisitar uma API Key da Gemini. Deixarei o passo a passo de como fazer isso abaixo.

- https://ai.google.dev/gemini-api/docs
Abra este link no seu navegador.

- Clique na opção: "Criar uma chave da API Gemini"

- Clique em: "Criar chave API"

- Selecione um projeto do Google Cloud. Se não tiver nenhum, terá que criar um antes.

- Crie a sua chave de API, copie ela e guarde.

# MUITO IMPORTANTE

NÃO COMPARTILHE SUA API KEY COM NINGUÉM!
ELA SE TRATA DE UMA CHAVE PESSOAL E CONTÉM DADOS E HISTÓRICO DE PESQUISA PESSOAIS.

# Rodando O Software

Para rodar o software, como ainda não tem hospedagem, você precisará se conectar a um servidor proxy direto do seu computador. Para isso, faça os seguintes passos: 

- Abra o terminal e instale as bibliotecas Flask e Flask CORS. Utilize o comando: pip install flask flask-cors request (verifique se o python3.x está instalado no seu PC).

- Depois abra a pasta onde está o projeto no terminal e digite o código que está comentado no arquivo Python (proxy_server.py): python proxy_server.py.

- Assim que digitar o comando, irá aparecer no terminal algo do tipo: "http://127.0.0.1:5000". Significa que está funcionando.

- Após isso, só abrir o servidor em live server, colocar a sua API Key na área que é solicitado e usufruir do software.