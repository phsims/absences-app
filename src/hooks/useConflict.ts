import { useState } from "react";
import type { Conflict } from "../types/Conflict";

const baseUrl = import.meta.env.VITE_BASE_API;

export function useConflict() {
  const [data, setData] = useState<Conflict | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchConflict  = async (id:number) => {
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/conflict/${id}`);
      const data = await res.json();
      setData(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchConflict };
}