import { useState, useEffect } from 'react';
import { Heading, Posts, Form, Footer} from '../src/components/index'

import { useDispatch } from 'react-redux';
import { getPosts } from './actions/posts';


function App() {
  const [currentId, setCurrentId] = useState(null)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [ dispatch]);

  return (
    <>
      <Heading/>
      <div className="section-padding w-full min-h-[80vh] grid sm:grid-cols-4 gap-6 py-10">
        <div className='col-span-3 '>
          <Posts setCurrentId={setCurrentId}/> 
        </div>
        <div className="sm:col-span-1 grid">
          <div className='w-full'>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default App
