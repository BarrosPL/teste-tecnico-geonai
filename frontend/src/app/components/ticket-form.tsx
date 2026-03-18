"use client";

import { useState } from "react";

type Props = {
  onCreated: () => void;
};

const API_URL = "http://localhost:8000";

export default function TicketForm({ onCreated }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Baixa");
  const [status, setStatus] = useState("Aberto");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (title.trim().length < 3) {
      setError("O título deve ter pelo menos 3 caracteres.");
      return;
    }

    if (description.trim().length < 5) {
      setError("A descrição deve ter pelo menos 5 caracteres.");
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch(`${API_URL}/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          priority,
          status,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar ticket");
      }

      setTitle("");
      setDescription("");
      setPriority("Baixa");
      setStatus("Aberto");

      await onCreated();
    } catch (err) {
      setError("Falha ao criar ticket na API.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <h2 className="mb-4 text-xl font-semibold text-slate-800">Novo Ticket</h2>

      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-800">Título</label>
          <input
            className="w-full rounded-xl border border-slate-300 text-slate-800 px-4 py-3 outline-none focus:border-slate-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-800">Descrição</label>
          <textarea
            className="min-h-32 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none text-slate-800 focus:border-slate-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-800">Prioridade</label>
          <select
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Baixa</option>
            <option>Média</option>
            <option>Alta</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-800">Status</label>
          <select
            className="w-full rounded-xl border border-slate-300 text-slate-800 px-4 py-3"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Aberto</option>
            <option>Em Análise</option>
            <option>Resolvido</option>
          </select>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl bg-slate-900 px-4 py-3 font-medium text-white hover:bg-slate-800 disabled:opacity-60"
        >
          {submitting ? "Criando..." : "Criar ticket"}
        </button>
      </div>
    </form>
  );
}