import React from 'react';
import { Link } from 'react-router-dom';

const NoteList = ({ notes }) => (
  <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    {notes.map((note) => (
      <div key={note.id} className="note-card">
        <Link to={`/notes/${note.id}`}>
          <h3 className="text-xl font-semibold mb-2 text-primary">{note.title}</h3>
          <p className="text-gray-600 mb-3 line-clamp-2">{note.body}</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {note.tags.map((tag, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-500">
            {new Date(note.createdAt).toLocaleDateString()}
          </span>
        </Link>
      </div>
    ))}
  </div>
);

export default NoteList;