"use client";

import { useEffect, useState } from "react";
import { Ticket } from "../tickets-page";

type Props = {
  onSuccess: () => void;
  editingTicket: Ticket | null;
  onCancelEdit: () => void;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function TicketForm({
  onSuccess,
  editingTicket,
  onCancelEdit,
}: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Ticket["priority"]>("Baixa");
  const [status, setStatus] = useState<Ticket["status"]>("Aberto");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isEditing = !!editingTicket;

  useEffect(() => {
    if (editingTicket) {
      setTitle(editingTicket.title);
      setDescription(editingTicket.description);
      setPriority(editingTicket.priority);
      setStatus(editingTicket.status);
      setError("");
      return;
    }

    setTitle("");
    setDescription("");
    setPriority("Baixa");
    setStatus("Aberto");
    setError("");
  }, [editingTicket]);

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

      const url =
        isEditing && editingTicket
          ? `${API_URL}/tickets/${editingTicket.id}`
          : `${API_URL}/tickets`;

      const method = isEditing ? "PUT" : "POST";

      const payload = {
        title: title.trim(),
        description: description.trim(),
        priority,
        status,
      };

      console.log("Payload enviado:", payload);

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errorBody: unknown = null;

        try {
          errorBody = await response.json();
        } catch {
          errorBody = await response.text();
        }

        console.error("Erro da API:", errorBody);

        throw new Error(
          typeof errorBody === "string"
            ? errorBody
            : JSON.stringify(errorBody)
        );
      }

      setTitle("");
      setDescription("");
      setPriority("Baixa");
      setStatus("Aberto");

      onSuccess();
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : isEditing
            ? "Falha ao atualizar ticket na API."
            : "Falha ao criar ticket na API."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-slate-800">
          {isEditing ? "Editar Ticket" : "Novo Ticket"}
        </h2>

        {isEditing && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Cancelar
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-800">
            Título
          </label>
          <input
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none focus:border-slate-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-800">
            Descrição
          </label>
          <textarea
            className="min-h-32 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none focus:border-slate-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-800">
            Prioridade
          </label>
          <select
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Ticket["priority"])}
          >
            <option>Baixa</option>
            <option>Média</option>
            <option>Alta</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-800">
            Status
          </label>
          <select
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800"
            value={status}
            onChange={(e) => setStatus(e.target.value as Ticket["status"])}
          >
            <option>Aberto</option>
            <option>Em Análise</option>
            <option>Resolvido</option>
          </select>
        </div>

        {error && <p className="text-sm text-red-600 break-words">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl bg-slate-900 px-4 py-3 font-medium text-white transition hover:bg-slate-800 disabled:opacity-60"
        >
          {submitting
            ? isEditing
              ? "Salvando..."
              : "Criando..."
            : isEditing
              ? "Salvar alterações"
              : "Criar ticket"}
        </button>
      </div>
    </form>
  );
}