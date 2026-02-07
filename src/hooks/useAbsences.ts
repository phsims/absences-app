import { useState } from "react";
import type { Absence } from "../types/Absences";

const baseUrl = import.meta.env.VITE_BASE_API;

export function useAbsences() {
  const [data, setData] = useState<Absence[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fetchAbsences = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/absences`);
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

  return { data, loading, error, fetchAbsences };
}