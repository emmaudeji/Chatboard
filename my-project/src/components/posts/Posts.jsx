import { useSelector } from 'react-redux';
import Post from './post/Post';
import { CircularProgress } from '@material-ui/core';


const Posts = ({setCurrentId}) => {
  const posts = useSelector((state) => state.posts);
  // console.log(posts)
  return (
    <>
    {
      !posts .length ? <CircularProgress /> : (
        <div className=" grid sm:grid-cols-3 gap-3">
          {
            posts?.map(({_id, title, createdAt, message, likeCount, selectedFile, creator, tags}) => (
              <div key={_id}>
                <Post setCurrentId={setCurrentId} _id={_id}
                title={title} message={message} selectedFile={selectedFile} creator={creator} tags={tags} createdAt={createdAt} likeCount={likeCount}/>
              </div>
            ))
          }
        </div>
      )
    }
    </>
  )
}

export default Posts 