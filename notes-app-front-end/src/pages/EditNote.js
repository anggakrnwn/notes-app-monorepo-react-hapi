// src/pages/EditNote.js
import React from 'react';
import NoteForm from '../components/NoteForm';

const EditNote = () => {
  return (
    <div>
      <h1>Edit Catatan</h1>
      <NoteForm isEdit={true} />
    </div>
  );
};

export default EditNote;