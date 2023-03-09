import React from 'react'

const BrowseCategory = ({color, text, img}) => {
  return (
      <div className=''>
          <div className={`relative flex min-h-[12rem]  w-[100%]  ${color} text-white  mt-4 rounded-lg cursor-pointer hover:opacity-75 duration-150`}>
              <h1 className='p-4 font-bold text-[22px]'>{text}</h1>
              <div className='max-h-[250px] overflow-hidden '>
              <img src={img} className="w-[200px] h-[100px] object-cover  mt-24 ml-2  rotate-12" alt="" />
              </div>
              </div>
    </div>
  )
}

export default BrowseCategory