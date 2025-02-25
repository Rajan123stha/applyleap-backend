// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import cors from 'cors'
import express from 'express'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import Categories from './collections/Categories'
import Blogs from './collections/Blogs'
import Universities from './collections/Universities'
import Destinations from './collections/Destinations'
import Courses from './collections/Courses'
import Scholarships from './collections/Scholarships'
import Events from './collections/Events'
import Tests from './collections/Tests'
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Blogs,
    Categories,
    Universities,
    Destinations,
    Courses,
    Scholarships,
    Events,
    Tests,
  ],
  editor: lexicalEditor({}), // Configure the rich text editor

  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
  cors: ['http://localhost:5173', 'http://localhost:3000'],
})
