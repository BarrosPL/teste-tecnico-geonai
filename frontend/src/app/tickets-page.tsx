"use client";

import { useEffect, useMemo, useState } from "react";
import TicketForm from "./components/ticket-form";
import TicketFilter from "./components/ticket-filter";
import TicketList from "./components/ticket-list";

export type Ticket = {
  id: number;
  title: string;
  description: string;
  priority: "Baixa" | "Média" | "Alta";
  status: "Aberto" | "Em Análise" | "Resolvido";
  created_at: string;
  prazo_resolucao?: string | null;
};

const API_URL = "http://localhost:8000";

export default function TicketPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadTickets() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/tickets`, {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Falha ao buscar tickets");
      }

      const data: Ticket[] = await response.json();
      setTickets(data);
    } catch (err) {
      setError("Não foi possível carregar os tickets da API.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTickets();
  }, []);

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) =>
      ticket.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [tickets, search]);

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-3xl font-bold text-slate-800">
          Mini Sistema de Chamados
        </h1>

        <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
          <TicketForm onCreated={loadTickets} />

          <section className="space-y-4">
            <TicketFilter value={search} onChange={setSearch} />

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
                {error}
              </div>
            )}

            <TicketList tickets={filteredTickets} loading={loading} />
          </section>
        </div>
      </div>
    </main>
  );
}