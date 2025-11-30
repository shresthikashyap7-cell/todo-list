import { useState, useEffect } from 'react';
import { axiosInstance } from '../lib/axios';
import type { Note } from '../types';

export const useFetchNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axiosInstance.get('/notes', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setNotes(response.data.notes);
      setError(null);
    } catch (err) {
      setError('Failed to fetch notes');
      console.error("Error fetching notes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return { notes, loading, error, refetch: fetchNotes };
};