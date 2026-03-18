# Mini Sistema de Chamados

Mini sistema de chamados desenvolvido com FastAPI + SQLAlchemy + SQLite
no back-end e Next.js + TypeScript + Tailwind CSS no front-end.

## Como rodar o projeto

### Backend

1. cd backend
2. python -m venv .venv
3. .venv\Scripts\Activate(Windows)
4. pip install -r requirements.txt
5. uvicorn app.main:app --reload

Acesse: http://localhost:8000

### Swagger

Utilize o Swagger para testar endpoints:
http://localhost:8000/docs

### Frontend

1. cd frontend
2. npm install
3. criar .env.local com: NEXT_PUBLIC_API_URL=http://localhost:8000
4. npm run dev

Acesse: http://localhost:3000

## Funcionalidades

- Criar ticket
- Listar tickets
- Editar ticket
- Excluir ticket
- Filtro por título
- Prazo automático para prioridade alta

## Observação

Banco SQLite com criação automática (sem migrations)

---

## 1 - Resposta Pergunta Relacionado a Suporte

Inicialmente eu analisaria os logs do servidor para buscar as exceções relacionadas ao erro o qual estaria ocorrendo, tendo esses logs eu iria verificar a origem do erro, se ele pode estar relacionado a banco de dados, inconsistencias entre o payload, schemas ou models ou se estaria relacionado a propria lógica da aplicação, desse modo eu utiliziria de ferramentas como swagger e postman para realizar verificação nos endpoints, tendo a causa do erro eu aplicaria a correção, garantindo a consistencia entre processamento, entrada e a resposta da API.

---

## 2 - Resposta Integração Entre N8N e Slack ou Discord

Fluxo o qual eu Criaria.

1 - Quando um novo ticket for criado eu adicionaria ao meu back-end uma função de validação de prioridade, verificando se a prioridade do ticket é "Alta"  
2 - A prioridade sendo alta o backend envia uma requisição HTTP para um webhook do n8n.  
3 - o n8n recebe todos os dados referentes ao ticket "id","title","priority","status","created_at","description","prazo_resolucao"  
4 - Com esses dados o n8n envia um HTTP Request ao Slack ou Discord com a mensagem montada.

### Estrutura do Fluxo

1 - Webhook Trigger: Recebe os dados enviados pelo backend.  
2 - IF Node: Valida se a prioridade do ticket realmente é "Alta"  
3 - Slack Node ou HTTP Request: envia a mensagem ao canal configurado.  
4 - Recomendavel: Registrar log da automação, tratar erros relacionados ao envio e reenfileirar em caso de falhas.

### Exemplo de mensagem enviada

Novo ticket de prioridade ALTA criado  
 -ID:02  
 -Título: Site do Fulano da Silva esta fora do ar e apresenta erro 404.  
 -Prioridade: Alta  
 -Status: Aberto  
 -Criado em: 18/03/2026 14:30  
 -Descrição: Cliente relata que o seu site esta fora do ar, e ao tentar acessar no navegador é exibido erro 404, pagina não encontrada.  
 -Prazo de Resolução: 18/03/2026 18:30  

---

### Fluxograma

```
[Início]
   ↓
[Usuário cria um novo ticket pela API]
   ↓
[Backend recebe a requisição]
   ↓
[Valida os dados do ticket]
   ↓
[Salva o ticket no banco de dados]
   ↓
[Prioridade do ticket é "Alta"?]
   ├── Não → [Finaliza fluxo sem notificação]
   └── Sim
         ↓
[Backend envia POST para Webhook do n8n]
         ↓
[n8n recebe os dados do ticket]
         ↓
[n8n valida se a prioridade continua sendo "Alta"]
         ↓
[Formata a mensagem de alerta]
         ↓
[Envia notificação para Slack ou Discord]
         ↓
[Notificação entregue ao canal]
         ↓
[Registrar sucesso ou erro da automação]
         ↓
[Fim]
```
