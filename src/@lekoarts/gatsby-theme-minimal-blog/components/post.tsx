/** @jsx jsx */
import { jsx, Heading } from "theme-ui"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import Layout from "./layout"
import ItemTags from "@lekoarts/gatsby-theme-minimal-blog/src/components/item-tags"
import SEO from "@lekoarts/gatsby-theme-minimal-blog/src/components/seo"

type PostProps = {
  data: {
    post: {
      slug: string
      title: string
      date: string
      tags?: {
        name: string
        slug: string
      }[]
      description?: string
      body: string
      excerpt: string
      timeToRead?: number
      banner?: {
        childImageSharp: {
          resize: {
            src: string
          }
        }
      }
    }
  }
}

const stripWhiteSpace = str => str.replace(/^\s+/, '').replace(/\s+$/, '')
const stripTags = str => {
  const patter = '<\\w+(\\s+("[^"]*"|\\\'[^\\\']*\'|[^>])+)?>|<\\/\\w+>'
  const reg = new RegExp(patter, 'gi')
  return str.replace(reg, '')
}
const wordsCount = str => {
  const patter = '\\w+'
  const reg = new RegExp(patter, 'g')
  return (str.match(reg) || []).length
}

const px = [`32px`, `16px`, `8px`, `4px`]
const shadow = px.map((v) => `rgba(0, 0, 0, 0.15) 0px ${v} ${v} 0px`)

const Post = ({ data: { post } }: PostProps) => (
  <Layout>
    <SEO
      title={post.title}
      description={post.description ? post.description : post.excerpt}
      image={post.banner ? post.banner.childImageSharp.resize.src : undefined}
      pathname={post.slug}
    />
    <Heading variant="styles.h2">{post.title}</Heading>
    <p sx={{ color: `secondary`, mt: 3, mb: 0, a: { color: `secondary` }, fontSize: [1, 1, 2] }}>
      <time>{post.date}</time>
      {post.timeToRead && ` — `}
      {post.timeToRead && <span>{Math.ceil(wordsCount(post.body) / 200)} min read</span>}
    </p>
    {post.tags && (
      <React.Fragment>
        {`Tags: `}
        <ItemTags tags={post.tags} />
      </React.Fragment>
    )}
    <section
      sx={{
        my: 5,
        ".gatsby-resp-image-wrapper": { mt: [4, 4, 5], mb: `0`, boxShadow: shadow.join(`, `) },
        variant: `layout.content`,
      }}
    >
      <MDXRenderer>{post.body}</MDXRenderer>
    </section>
  </Layout>
)

export default Post
