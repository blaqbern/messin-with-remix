import { useLoaderData, Link } from 'remix'
import type { Post } from '~/post'
import { getPosts } from '~/post'

export const loader = () => {
  return getPosts()
}

const Posts = () => {
  const posts = useLoaderData<Post[]>()

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((p) => (
          <li key={p.slug}>
            <Link to={p.slug}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Posts
