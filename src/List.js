import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

const List = ({list, handleEditbtn, removeItem}) => {
  return(
    <div className='grocery-list'>
      {list.map((item)=>{ 
        console.log(item)
        const {id,title} = item   //sth assigned to id and title in App.js
       return( 
          <article className='grocery-item' key={id}>
            <p className='title'>{title}</p>
            <div className='btn-container'>
              <button type="button" className='edit-btn' onClick={()=>handleEditbtn(id)}><FaEdit /></button>
              <button type="button" className='delete-btn' onClick={()=>removeItem(id)}>< FaTrash/></button>
            </div>
          </article>

        ) 
       })} 
    </div>
   
  )
}

export default List




