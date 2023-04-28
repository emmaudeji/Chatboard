import { useSelector } from 'react-redux';

const Posts = () => {
  const posts = useSelector((state) => state.posts);
  console.log(posts)
  return (
    <div className="w-full h-80 border border-zinc-300">Posts</div>
  )
}

export default Posts 