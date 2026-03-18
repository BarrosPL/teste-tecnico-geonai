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
