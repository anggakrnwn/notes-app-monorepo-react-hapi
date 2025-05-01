import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api';

const NoteForm = ({ isEdit = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    tags: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEdit) {
      setLoading(true);
      API.get(`/notes/${id}`)
        .then((res) => {
          const note = res.data.data.note;
          setFormData({
            title: note.title,
            body: note.body,
            tags: note.tags.join(', '),
          });
          setLoading(false);
        })
        .catch((err) => {
          setError('Gagal memuat catatan');
          setLoading(false);
        });
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    const payload = {
      title: formData.title,
      body: formData.body,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
    };

    const apiCall = isEdit 
      ? API.put(`/notes/${id}`, payload)
      : API.post('/notes', payload);

    apiCall
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        setError(err.response?.data?.message || 'Gagal menyimpan catatan');
        setLoading(false);
      });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-primary">
        {isEdit ? 'Edit Catatan' : 'Tambah Catatan Baru'}
      </h1>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Judul</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            required
            disabled={loading}
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Isi Catatan</label>
          <textarea
            name="body"
            value={formData.body}
            onChange={handleChange}
            rows="8"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            required
            disabled={loading}
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">
            Tag (pisahkan dengan koma)
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={loading}
            placeholder="contoh: pekerjaan, penting, proyek"
          />
        </div>
        
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Menyimpan...' : isEdit ? 'Update Catatan' : 'Simpan Catatan'}
          </button>
          
          <button
            type="button"
            onClick={() => navigate('/')}
            className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100 transition-colors"
            disabled={loading}
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;