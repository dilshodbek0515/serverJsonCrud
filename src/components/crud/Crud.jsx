import React, { useEffect, useState } from 'react'
import './Crud.scss'
import axios from 'axios'

const Crud = () => {
  const [user, setUser] = useState(null)
  const [reload, setReload] = useState(false)
  const [edit, setEdit] = useState(null)

  useEffect(() => {
    axios
      .get('http://localhost:3000/user')
      .then(res => setUser(res.data))
      .catch(err => console.log(err))
      .finally()
  }, [reload])

  const handleCreateAndEdit = e => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const user = Object.fromEntries(formData)

    if (edit) {
      axios.put(`http://localhost:3000/user/${edit.id}`, user).then(res => {
        setEdit(null)
        setReload(prev => !prev)
        e.target.reset()
      })
    } else {
      axios.post('http://localhost:3000/user', user).then(res => {
        e.target.reset()
        setReload(prev => !prev)
      })
    }
  }
  const handleEditUser = user => {
    setEdit(user)
  }
  const handleDeleteUser = id => {
    axios.delete(`http://localhost:3000/user/${id}`).then(res => {
      setReload(prev => !prev)
    })
  }

  return (
    <div>
      <div className='crud'>
        <form className='crud_form' onSubmit={handleCreateAndEdit}>
          <div className='input_collection'>
            <div>
              <input
                type='text'
                placeholder='image'
                name='image'
                required
                defaultValue={edit?.image || ''}
              />
              <input
                type='text'
                placeholder='name'
                name='name'
                required
                defaultValue={edit?.name || ''}
              />
              <input
                type='text'
                placeholder='fname'
                name='fname'
                required
                defaultValue={edit?.fname || ''}
              />
            </div>
            <div>
              <input
                type='number'
                placeholder='age'
                name='age'
                required
                defaultValue={edit?.age || ''}
              />
              <input
                type='gmail'
                placeholder='gmail'
                name='gmail'
                required
                defaultValue={edit?.gmail || ''}
              />
              <input
                type='text'
                placeholder='description'
                name='desc'
                required
                defaultValue={edit?.desc || ''}
              />
            </div>
          </div>
          <button>{edit ? 'Save' : 'Create'}</button>
        </form>
      </div>

      <div className='card_collection'>
        {user?.map(user => (
          <div className='user_card' key={user.id}>
            <img className='user_img' src={user.img} alt='img' />
            <div className='userName'>
              <h3>{user.name}</h3>
              <h3>{user.fname}</h3>
            </div>
            <div className='userName'>
              <p>{user.age}</p>
              <p>{user.gmail}</p>
            </div>
            <p className='desc'>{user.desc}</p>
            <div className='user_btn_content'>
              <button onClick={() => handleEditUser(user)}>Edit</button>
              <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Crud
