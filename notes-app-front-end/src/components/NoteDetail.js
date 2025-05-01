import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API from '../api';

const NoteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    API.get(`/notes/${id}`)
      .then((res) => {
        setNote(res.data.data.note);
        setLoading(false);
      })
      .catch((err) => {
        setError('Gagal memuat catatan');
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus catatan ini?')) {
      API.delete(`/notes/${id}`)
        .then(() => navigate('/'))
        .catch(err => console.error(err));
    }
  };

  if (loading) return <div className="text-center py-8">Memuat...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!note) return <div className="text-center py-8">Catatan tidak ditemukan</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="note-card">
        <h1 className="text-2xl font-bold mb-4 text-primary">{note.title}</h1>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {note.tags.map((tag, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="prose max-w-none mb-6">
          <p className="whitespace-pre-line">{note.body}</p>
        </div>
        
        <div className="flex justify-between items-center text-sm text-gray-500 mb-6">
          <span>Dibuat: {new Date(note.createdAt).toLocaleString()}</span>
          <span>Diupdate: {new Date(note.updatedAt).toLocaleString()}</span>
        </div>
        
        <div className="flex gap-3">
          <Link to={`/edit/${note.id}`} className="btn-primary">
            Edit
          </Link>
          <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors">
            Hapus
          </button>
          <Link to="/" className="text-gray-600 hover:text-gray-900 underline">
            Kembali
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NoteDetail;