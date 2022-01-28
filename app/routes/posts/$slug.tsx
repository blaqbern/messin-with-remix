import type { LoaderFunction } from 'remix'
import { useLoaderData } from 'remix'

import type { PostContent } from '~/post'
import { getPost } from '~/post'

export const loader: LoaderFunction = ({ params }) => {
  try {
    if (!params.slug) throw new Error('Caught below')
    return getPost(params.slug)
  } catch (err) {
    console.error(err)
  }
}

const PostSlug = () => {
  const post = useLoaderData<PostContent>()

  return (
    <div>
      <h1>{post.slug}</h1>
      <section>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </section>
    </div>
  )
}

export default PostSlug
