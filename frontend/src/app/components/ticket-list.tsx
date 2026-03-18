import { Ticket } from "../tickets-page";

type Props = {
  tickets: Ticket[];
  loading: boolean;
};

function priorityStyles(priority: Ticket["priority"]) {
  switch (priority) {
    case "Alta":
      return {
        container: "border-red-500",
        badge: "bg-red-100 text-red-700",
      };
    case "Média":
      return {
        container: "border-yellow-500",
        badge: "bg-yellow-100 text-yellow-700",
      };
    case "Baixa":
      return {
        container: "border-green-500",
        badge: "bg-green-100 text-green-700",
      };
    default:
      return {
        container: "border-slate-300",
        badge: "bg-slate-100 text-slate-700",
      };
  }
}

function statusBadge(status: Ticket["status"]) {
  switch (status) {
    case "Aberto":
      return "bg-blue-100 text-blue-700";
    case "Em Análise":
      return "bg-yellow-100 text-yellow-700";
    case "Resolvido":
      return "bg-green-100 text-green-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

export default function TicketList({ tickets, loading }: Props) {
  if (loading) {
    return <p className="text-slate-800">Carregando tickets...</p>;
  }

  if (!tickets.length) {
    return <p className="text-slate-800">Nenhum ticket encontrado.</p>;
  }

  return (
    <div className="grid gap-4">
      {tickets.map((ticket) => {
        const styles = priorityStyles(ticket.priority);

        return (
          <article
            key={ticket.id}
            className={`rounded-2xl border-2 bg-white p-5 shadow-sm ${styles.container}`}
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">
                  {ticket.title}
                </h3>
                <p className="text-sm text-slate-500">
                  Criado em:{" "}
                  {new Date(ticket.created_at).toLocaleString("pt-BR")}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${statusBadge(
                  ticket.status
                )}`}
              >
                {ticket.status}
              </span>
            </div>

            <p className="mb-3 text-slate-700">{ticket.description}</p>

            <div className="flex flex-wrap gap-2 text-sm">
              {/* Badge de prioridade */}
              <span
                className={`rounded-full px-3 py-1 font-medium ${styles.badge}`}
              >
                Prioridade: {ticket.priority}
              </span>

              {ticket.prazo_resolucao && (
                <span className="rounded-full bg-blue-100 px-3 py-1 text-slate-700">
                  Prazo:{" "}
                  {new Date(ticket.prazo_resolucao).toLocaleString("pt-BR")}
                </span>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}