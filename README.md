Mini Sistema de Chamados

Mini sistema de chamados desenvolvido com FastAPI + SQLAlchemy + SQLite
no back-end e Next.js + TypeScript + Tailwind CSS no front-end.

Como rodar o projeto

Backend

1.  cd backend
2.  python -m venv .venv
3.  .venv(Windows)
4.  pip install -r requirements.txt
5.  uvicorn app.main:app –reload

Acesse: http://localhost:8000

Swagger

Utilize o Swagger para testar endpoints: http://localhost:8000/docs

Frontend

1.  cd frontend
2.  npm install
3.  criar .env.local com: NEXT_PUBLIC_API_URL=http://localhost:8000
4.  npm run dev

Acesse: http://localhost:3000

Funcionalidades

-   Criar ticket
-   Listar tickets
-   Editar ticket
-   Excluir ticket
-   Filtro por título
-   Prazo automático para prioridade alta

Observação

Banco SQLite com criação automática (sem migrations)



Reposta Pergunta Relacionado a Suporte: Inicialmente eu analisaria os logs do servidor para buscar as exceções relacionadas ao erro o qual estaria ocorrendo, tendo esses logs eu iria verificar a origem do erro, se ele pode estar relacionado a banco de dados, inconsistencias entre o payload, schemas ou models ou se estaria relacionado a propria lógica da aplicação, desse modo eu utiliziria de ferramentas como swagger e postman para realizar verificação nos endpoints, tendo a causa do erro eu aplicaria a correção, garantindo a consistencia entre processamento, entrada e a resposta da API.
