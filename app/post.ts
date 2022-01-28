import { resolve } from 'path'
import { readdir, readFile } from 'fs/promises'
import parseFrontMatter from 'front-matter'
import { marked } from 'marked'

const POSTS_DIR = resolve(__dirname, '..', 'posts')

export interface Post {
  slug: string
  title: string
}
export type PostContent = Post & { content: string }

interface PostMetadata {
  title: string
}

export const getPost = async (slug: string): Promise<PostContent> => {
  const fileContent = await readFile(resolve(POSTS_DIR, `${slug}.md`))
  const content = fileContent.toString()
  const { title } = getMetadata(content)
  return { slug, title, content: marked(content) }
}

export const getPosts = async (): Promise<Post[]> => {
  const files = await readdir(POSTS_DIR)
  return await Promise.all(files.map(async (f) => {
    const content = await readFile(resolve(POSTS_DIR, f))
    const { title } = getMetadata(content.toString())
    return {
      title,
      slug: f.replace(/\.md$/, ''),
    }
  }))
}

const getMetadata = (fileContent: string) => {
  console.log({ fileContent })
  const { attributes } = parseFrontMatter<{ title?: string }>(fileContent)
  if (!validateMetadata(attributes)) throw new Error('Posts must include a `title` in the metadata')
  return { title: attributes.title }
}

const validateMetadata = (metadata: { title?: string }): metadata is PostMetadata => {
  return Boolean(metadata?.title)
}
