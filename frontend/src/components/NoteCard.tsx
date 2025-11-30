import { memo } from 'react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Note } from '../types';

interface NoteCardProps {
  note: Note;
}

const NoteCard = memo(({ note }: NoteCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-4 h-80 w-full sm:w-56 bg-white rounded-2xl px-6 py-6 shadow-md hover:-translate-y-1 transition-transform duration-200">      
      <div className='w-full flex justify-start'>
        <Check 
          size={24} 
          className={`text-white rounded-full p-1 ${
            note.status === 'pending' ? 'bg-gray-800' : 'bg-green-500'
          }`}
        />
      </div>
      
      <div className='flex-1 w-full text-center space-y-3'>
        <h3 className='text-black font-bold text-2xl'>
          {note.title}
        </h3>   
        <p className='text-gray-600 text-sm line-clamp-3'>
          {note.description}
        </p>
      </div>
      
      <button 
        className='text-white bg-blue-500 text-sm sm:text-base font-medium py-2 px-4 sm:px-6 rounded-lg hover:bg-blue-700 transition-colors'
        onClick={() => navigate(`/note/${note._id}`)}
      >
        VIEW
      </button>
    </div>
  );
});

export default NoteCard;