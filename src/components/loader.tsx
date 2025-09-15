import { Ring2 } from 'ldrs/react'
import 'ldrs/react/Ring2.css'

export function Loader() {
   return (
      // Default values shown
      <div className='flex justify-center items-center'>
         <Ring2
            size="40"
            stroke="5"
            strokeLength="0.25"
            bgOpacity="0.1"
            speed="0.8"
            color="var(--card)"
         />
      </div>
   )
}