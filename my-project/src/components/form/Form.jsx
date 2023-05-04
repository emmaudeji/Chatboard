import { useState, useEffect } from "react";
import FileBase from 'react-file-base64';
import { createPost, updatePost } from "../../actions/posts";
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom'


const Form = ({currentId, setCurrentId}) => {
  
  const [postData, setPostData] = useState({ 
     title: '', message: '', tags: '', selectedFile: '' });
  const user = JSON.parse(localStorage.getItem('profile'))
    
  const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null) ;

  const dispatch = useDispatch()

  useEffect(() => {
      if(post) setPostData(post)
    }, [post])


  const handleChange = (e) => {
    const {name, value} = e.target;
    setPostData(prevValue => {
      if(name === 'tags'){
        return {
          ...prevValue,
          [name]: value.split(',')
        } 
      } else {
      return {
        ...prevValue,
        [name]: value
      }
    }
  })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // post request
    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }))
    }
    clearData();
  }

  const clearData = () => {
    setPostData({
       title: '', message: '', tags: '', selectedFile: ''
      })
    setCurrentId(null);
  }

  // console.log('post', post, 'currentId', currentId, 'filtered', useSelector((state) => state.posts.filter((p) => p._id === currentId)), 'all posts', useSelector((state) => state.posts), 'postdata', postData)

  if(!user?.result?.name){
    return (
      <div className="grid gap-3 p-4 text-[14px] border border-zinc-300 rounded">
        <p>{`You can register or signin to start adding memories and liking others post.`}</p> 
        <Link to='auth'
        className="bg-blue-600 p-2 text-white hover:bg-blue-500 duration-300 rounded text-center cursor-pointer">Register</Link>
      </div>
    )
  }

  return (
    <div className="w-full p-2 border border-zinc-300">
      <form onSubmit={handleSubmit} className="flex gap-2 flex-col ">
        {/* post title */}
        <div className="flex justify-center items-center p-2 font-semibold">
          <h3>
            {currentId ? `Editting a Memory` : `Create a Memory`}
          </h3>
        </div>

               
        {/* title field */}
        <FormInput
          handleChange={handleChange} value={postData.title} title={'title'} placeholder={`Enter title of message`}
        />

        {/* message field */}
        <FormInput
          handleChange={handleChange} value={postData.message} title={'message'} placeholder={`Enter your message`}
        />

        {/* tags field */}
        <FormInput
          handleChange={handleChange} value={postData.tags} title={'tags'} placeholder={``}
        />

        {/* file input */}
        <div className="">
          <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
          {/* <input type="file" name="selectedFile" onChange={handleChange}/> */}
        </div>

        {/* submit btn */}
        <button type="submit" className="flex rounded bg-red-500 w-full p-3 justify-center items-center">
          Submit
        </button>

        {/* clear btn */}
        <div className="flex rounded bg-blue-500 w-full p-3 justify-center items-center"
        onClick={clearData}>
          Clear
        </div>

      </form>
    </div>
  )
}

export default Form


export const FormInput = ({handleChange, value, title, placeholder}) => {
  return (
    <div className="flex-1 rounded">
          <p className="text-zinc-700 capitalize">{title}</p>
          <div className="flex-1 bg-white w-full overflow-hidden py-3 px-4 border border-zinc-300">
            <input type="text" name={title} value={value} placeholder={placeholder} 
            onChange={handleChange}
            className="w-full"/>
          </div>
        </div>
  )
}