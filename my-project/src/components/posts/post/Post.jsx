import moment from 'moment'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';

const Post = ({_id, title, message, selectedFile, likeCount, createdAt, creator, tags,  setCurrentId}) => {

const dispatch = useDispatch()

  return (
    <div>
        <div className="w-full rounded border border-zinc-300  relative">
      
      <div className="absolute top-5 right-0 left-0 px-3 z-20 text-white pb-0">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl">{creator} </h2>
          <div onClick={() => setCurrentId(_id)}
          className="font-bold cursor-pointer hover:scale-110 duration-300">
            <MoreHorizIcon/>
          </div>
        </div>
        <div className="pt-0">
        {moment(createdAt).fromNow()}
        </div>
      </div>

      <div className="img w-full h-48 overflow-hidden relative" >
        <img src={selectedFile} alt="post_img" className="w-full h-full object-cover hover:scale-110 duration-300"/>
        <div className="absolute bg-gradient-to-t from-black w-full h-full z-10 top-0 right-0 left-0" >
          {' '}
        </div>
      </div>
  
      <div className="p-3 h-48 relative">
        <div className="flex">
          {tags?.map((item, idx) => (
            <div key={idx} className="text-zinc-400  text-sm pr-1">{`#${item}`}</div>
          ))}
        </div>
        <div className="grid gap-2 h-full items-stretch pb-3">
          <h3 className="text-lg font-semibold">{title}</h3>
          <div className=""><p>{message}</p></div>
          <div className="flex justify-between items-center" >
            <div onClick={() => dispatch(likePost(_id))}
            className="flex gap-1"> <div className='cursor-pointer hover:text-blue-400 text-blue-700'><ThumbUpAltIcon/></div>{likeCount}</div>
            <button onClick={() => dispatch(deletePost(_id))}
            className='ursor-pointer hover:text-blue-400 text-blue-700'><DeleteIcon/></button>
          </div>
        </div>
      </div>
    </div>
    </div>
    
  )
}

export default Post