import { Check, Pencil } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import type { Note } from '../types';
import { useFetchNotes } from '../hooks/usefetchNotes';

const Home = () => {
    const navigate = useNavigate();
    const { notes } = useFetchNotes();

    return (
        <div className=" py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
                
                <div className='w-full flex flex-col items-center gap-4 sm:gap-5'>
                    {notes.slice(0,4).map((note:Note) => (
                        <div key={note._id} className='flex items-center gap-3 sm:gap-4 bg-white w-full max-w-2xl min-h-[100px] sm:h-28 rounded-2xl sm:rounded-3xl px-4 sm:px-6 py-4'>
                            <Check size={24} className={`text-white rounded-full p-1 ${note.status === 'pending'?'bg-gray-800' :'bg-green-500'}`}/>
                            <div className='flex-1 min-w-0 mr-3'>
                                <h3 className='text-black font-semibold sm:text-[1.6rem] sm:text-lg mb-1'>
                                    {note.title}
                                </h3>   
                                <p className='text-gray-600 text-xs sm:text-sm line-clamp-2'>
                                    {note.description}
                                </p>
                            </div>
                            <button className='text-white bg-blue-500  text-sm sm:text-base font-medium py-2 px-4 sm:px-6 rounded-lg hover:bg-blue-700 transition-colors'
                            onClick={()=> navigate(`/note/${note._id}`)}
                            >
                                VIEW
                            </button>
                        </div>
                    ))}
                </div>

                <button className='text-white text-lg font-medium underline hover:text-blue-400 transition-colors mt-2' onClick={() => {navigate('/notes')}}>
                    View All
                </button>

                <button className='flex items-center gap-2 text-white bg-blue-600 text-base sm:text-lg font-medium py-3 px-10 rounded-lg hover:bg-blue-700 transition-colors mt-4'
                    onClick={()=> navigate(`/note`)}
                >
                    Add Todo 
                    <div className='bg-white p-1 rounded ml-2'>
                        <Pencil size={18} className=' fill-blue-600 font-bold'/>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default Home
