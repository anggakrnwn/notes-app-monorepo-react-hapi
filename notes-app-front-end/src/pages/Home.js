import React, { useEffect, useState } from 'react';
import NoteList from '../components/NoteList';
import API from '../api';
import { Link } from 'react-router-dom';

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    API.get('/notes')
      .then((res) => {
        setNotes(res.data.data.notes);
        setLoading(false);
      })
      .catch((err) => {
        setError('Gagal memuat catatan');
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Notes App</h1>
        <Link 
          to="/add" 
          className="btn-secondary flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Tambah Catatan
        </Link>
      </div>
      
      {loading ? (
        <div className="text-center py-8">Memuat catatan...</div>
      ) : error ? (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
          {error}
        </div>
      ) : notes.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500 mb-4">Belum ada catatan</p>
          <Link to="/add" className="btn-primary">
            Buat Catatan Pertama
          </Link>
        </div>
      ) : (
        <NoteList notes={notes} />
      )}
    </div>
  );
};

export default Home;