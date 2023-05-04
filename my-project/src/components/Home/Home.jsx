import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts'
import {Posts, Form} from '../../components'

const Home = () => {
    const [currentId, setCurrentId] = useState(null)

    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getPosts());
    }, [ dispatch]);
  return (
    <div className="overflow-hidden px-4 sm:px-16 lg:px-36 min-h-[80vh] grid sm:grid-cols-4 gap-6 py-10">
        <div className='sm:col-span-3 '>
          <Posts setCurrentId={setCurrentId}/> 
        </div>
        <div className="sm:col-span-1">
          <div className='w-full'>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </div>
        </div>
      </div>
  )
}

export default Home