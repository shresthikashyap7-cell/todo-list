import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { useFetchNotes } from '../hooks/usefetchNotes';
import NoteCard from '../components/NoteCard';

const Notes = () => {
    const { notes } = useFetchNotes();
    const [sortBy, setSortBy] = useState('newest');
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredAndSortedNotes = useMemo(() => {
      let result = [...notes];
      
      if (filterStatus !== 'all') {
        result = result.filter(note => note.status === filterStatus);
      }
      
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        result = result.filter(note => 
          note.title.toLowerCase().includes(query) ||
          note.description.toLowerCase().includes(query)
        );
      }
      
      switch(sortBy) {
        case 'newest':
          return result.sort((a, b) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return dateB - dateA;
          });
        case 'oldest':
          return result.sort((a, b) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return dateA - dateB;
          });
        case 'alphabetical':
          return result.sort((a, b) => 
            a.title.localeCompare(b.title)
          );
        case 'reverse-alphabetical':
          return result.sort((a, b) => 
            b.title.localeCompare(a.title)
          );
        default:
          return result;
      }
    }, [notes, sortBy, filterStatus, searchQuery]);

  return (
    <div className='py-8 px-4 sm:px-6 lg:px-8'> 
      <div className='max-w-7xl mx-auto'>
        <div className='mb-6 space-y-4'>

          <div className='relative max-w-md'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
            <input
              type="text"
              placeholder="Search tasks by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
              >
                <X size={20} />
              </button>
            )}
          </div>

          <div className='flex flex-col sm:flex-row gap-3 sm:justify-end'>
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className='px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer'
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="complete">Complete</option>
            </select>

            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className='px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer'
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="alphabetical">A to Z</option>
              <option value="reverse-alphabetical">Z to A</option>
            </select>
          </div>
        </div>


        <div className='mb-4 text-gray-600 text-sm'>
          Showing {filteredAndSortedNotes.length} of {notes.length} tasks
        </div>

        {filteredAndSortedNotes.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-y-12 gap-x-20'>
            {filteredAndSortedNotes.map((note) => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>
        ) : (
          <div className='text-center py-12'>
            <p className='text-gray-500 text-lg'>No tasks found</p>
            {(searchQuery || filterStatus !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilterStatus('all');
                }}
                className='mt-4 text-blue-600 hover:text-blue-700 font-medium'
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
