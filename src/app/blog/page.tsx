"use client"
import BlogPage from '@/components/templates/BlogPage'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import BlogDetailsPage from '@templates/BlogDetailsPage';

const Blog = () => {
  const blogTitle = useSearchParams().get("title")




  return (
    <>
      {
        blogTitle === null ? <BlogPage /> : <BlogDetailsPage slug={blogTitle} />
      }

    </>
  )
}

export default Blog