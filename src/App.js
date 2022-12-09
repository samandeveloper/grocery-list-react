import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  //either list exists or not
  if (list) {
    return (list = JSON.parse(localStorage.getItem('list')));
  } else {
    return [];
  }
};

function App() {
  const [list,setList] = useState(getLocalStorage())  //instead of array we use the localStorage function
  const [value, setValue] = React.useState("");  //values in the form
  const [isEditing, setIsEditing] = useState(false) //is the item edited or not
  const [editID,setEditId] = useState(null)   //which item is edited
  const [alert,setAlert] = useState({show:false,msg:"",type:""})   //the alert is an object

  const handleChange = (e) =>{
    let value = e.target.value
    setValue(value)  
    console.log(value)
  }

  //submit button can be submit or edit
  const handleSubmit = (e)=>{
    e.preventDefault();
      if(!value){
        showAlert(true,"danger","Please enter value")  //or don't write the showAlert function and instead write setAlert(show:true,type:"danger",msg:"Please enter value") 
      }
      //value exists and we are editing
      else if(value && isEditing){
        setList(list.map((item)=>{ 
          if(item.id === editID){  
            return{...item,title:value}  //item will be the same but title will be changed and equal to the value
          }
          else{
            return item 
          }
        })
        )
        setValue("")
        setEditId(null)
        setIsEditing(false)
        showAlert(true,'success','value changed')
      }
      //add a new item
      else{
        showAlert(true,'success','item added to the list')
        const newItem = {id: new Date().getTime().toString(), title:value}  //or use react id library
        setList((prevState)=> [...prevState,newItem])  //answer of each item will be {id:...,title:...}
        setValue("")
      }
  }
  //define a seperate alert function for alert
  const showAlert = (show=false,type="", msg="")=>{
    setAlert({show,type,msg})  //this is ES6 it's equal to setAlert({show:show,type:type,msg:msg}) in ES5
  }

  //clear items function
  const clearList = () =>{
    showAlert(true,'danger','empty list')
    setList([])  //the list will be empty
  }

  const removeItem = (id) =>{
    showAlert(true,'danger','item removed')
    setList(list.filter((item)=>{
      return item.id !== id
    }   
    ))
  }

  const handleEditbtn = (id) =>{
    //note: .find returns the FIRST element of an array which pass the condition 
    const specificItem = list.find((item)=>item.id===id);
    console.log(specificItem)  //answer:{id:...,title:....}
    setIsEditing(true)
    setEditId(id)
    setValue(specificItem.title)  //answer: the title which as same as value
  }

  useEffect(()=>{
    setList(list)
    setValue(value)
    console.log(list)
  },[list])

  //to set the local storage
  useEffect(()=>{
    localStorage.setItem('list',JSON.stringify(list))
  },[list])
  
  return(
    <div>
      <section className='section-center'>
        <form className='grocery-form' onSubmit={handleSubmit}>
          {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}  
          <h3>grocery bud</h3>
          <div className='form-control'>
            <input type="text" className='grocery' placeholder='e.g. eggs' value={value} onChange={handleChange}/>
            <button type='submit' className='submit-btn'>{isEditing ? "edit" : "submit"}</button>
          </div>
        </form>

        {list.length > 0  && (
            <div className='grocery-container'>
                <List list={list} handleEditbtn={handleEditbtn} removeItem={removeItem}/>
            <button className='clear-btn' onClick={clearList}>clear items</button>
          </div>
        )}
      </section>
    </div>
  )
}

export default App

