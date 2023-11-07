'use client'
import Image from 'next/image'
import Avatar from 'react-avatar';
import { MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useBoardStore } from '@/store/BoradStore';
import { useEffect, useState } from 'react';
import fetchSuggestion from '@/lib/fetchSuggestionFunc';
function Header() {
  const [board,searchString,setSearchString] =useBoardStore((state)=>[
    state.board ,
    state.searchString,
    state.setSearchString
  ])
  const [loading ,setLoading] = useState<boolean>(false)
  const [suggestion, setSugestion] = useState<string>("");

   useEffect(()=>{
    if(board.columns.size ===0) return;
    setLoading(true)
    const fetchSuggestionFunc = async ()=>{
       const suggestion = await fetchSuggestion(board);
       setSugestion(suggestion);
       setLoading(false)
    }
    fetchSuggestionFunc()
   },[board])

  return (
    <header>
      <div className='flex  flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl'>
        <div
          className=' absolute top-0 left-0 w-full  h-80
            bg-gradient-to-br
          from-pink-300
          to-[#0055d1]
           rounded-md
          filter
          blur-3xl opacity-50
           -z-50
            
           '
        />

        <Image
          src="https://links.papareact.com/c2cdd5"
          alt='Trello Logo'
          width={100}
          height={100}
          className='w-44 md:w-40 pb-10 md:pb-0 object-contain '

        />
        <div className=' flex items-center space-x-5 flex-1 justify-end w-full ' >
          {/* searchBox */}
          <form className='flex items-center space-x-5 bg-white rounded-md p-2 shadow-md
                flex-1 md:flex-initial
                '>
            <MagnifyingGlassIcon className='h-6 w-6 text-gray-400' />
            <input 
            onChange={(e)=>setSearchString(e.target.value)}
            type="text" 
            placeholder='Search'
             className=' flex-1 outline-none p-1' />
            <button hidden type='submit'>Search</button>
          </form>
          {/* Avater */}
          <Avatar name="Jimmy" round color='#0055d1' size='50' />
        </div>


      </div>
      <div className=' flex items-center justify-center px-5 py-3 md:py-5 '>
        <p className=' flex items-center text-sm p-5 font-light pr-5 shadow-xl rounded-xl w-fit bg-white italic max-w-3xl  text-[#0055d1]'>
          <UserCircleIcon 
          className={`inline-block h-10 w-10 text-[#0055d1] mr-1 ${
            loading && "animate-spin"
          }`} />
         {suggestion && !loading 
         ? suggestion
         :"GPT is summarising your tasks for the day..."

         }
        </p>

      </div>
    </header>
  )
}

export default Header