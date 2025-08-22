import { IconLogout } from '@tabler/icons-react';
import React from 'react';

const ButtonLogout = ({ onClick }) => {
  return (
    <button 
      className="
        group
        flex items-center justify-start
        w-[45px] h-[45px]
        cursor-pointer
        relative
        left-0
        overflow-hidden
        transition-all duration-300
        rounded-none
        hover:w-[125px] 
        hover:rounded-sm
        hover:bg-red-600
        active:translate-x-0.5 active:translate-y-0.5
      "
      onClick={onClick}
    >
      {/* Sign/Icon */}
      <div className="
        group
        transition-all duration-300
        flex items-center justify-center
        pl-1
        group-hover:w-[30%]
      ">
        <IconLogout className='group-hover:text-white 
        transition-all duration-300' />
      </div>
      
      {/* Text */}
      <div className="
        absolute
        right-0
        w-0 
        opacity-0
        transition-all duration-300
        group-hover:opacity-100 
        group-hover:text-white 
        group-hover:w-[70%] 
        group-hover:pr-2.5
        whitespace-nowrap
        overflow-hidden
        font-roboto
      ">
        Logout
      </div>
    </button>
  );
};

export default ButtonLogout;