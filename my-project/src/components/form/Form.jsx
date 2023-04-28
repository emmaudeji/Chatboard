import { useState } from "react";
import FileBase from 'react-file-base64';
import { createPost } from "../../actions/posts";
import { useDispatch, } from 'react-redux';


const Form = () => {
  const dispatch = useDispatch()

  const [postData, setPostData] = useState({ 
    creator: '', title: '', message: '', tags: '', selectedFile: '' });

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
    dispatch(createPost(postData));
    console.log(postData)
    clearData();
  }

  const clearData = () => {
    setPostData({
      creator: '', title: '', message: '', tags: '', selectedFile: ''
  })
  }

  return (
    <div className="w-full p-2 border border-zinc-300">
      <form onSubmit={handleSubmit} className="flex gap-2 flex-col ">
        {/* post title */}
        <div className="flex justify-center items-center p-2 font-semibold">
          <h3>
            {`Create a Memory`}
          </h3>
        </div>

        {/* creator field */}
        <FormInput
          handleChange={handleChange} value={postData.creator} title={'creator'} placeholder={`Enter your name`}
        />
        
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
          {/* <input type="file" name="selectedFile" value={postData.selectedFile}/> */}
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
          <div className="flex-1 bg-white w-full overflow-hidden py-3 text-zinc-400 px-4 border border-zinc-300">
            <input type="text" name={title} value={value} placeholder={placeholder} 
            onChange={handleChange}
            className="w-full"/>
          </div>
        </div>
  )
}