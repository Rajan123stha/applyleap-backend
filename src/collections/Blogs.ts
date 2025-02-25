import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

const Blog: CollectionConfig = {
  slug: 'blogs',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true, // Allow public access for reading blogs
    // Or if you need to restrict access, specify roles or conditions
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },

    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'bannerImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: false,
    },
    {
      name: 'writer',
      type: 'text',
      required: true,
    },
    {
      name: 'publishDate',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
    },
    {
      name: 'summary',
      type: 'textarea',
      required: false,
    },
    // ✅ Blog Sections Array
    {
      name: 'sections',
      type: 'array',
      label: 'Blog Sections', // Add label
      required: false,
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Section Heading', // Add label
          required: true,
        },
        {
          name: 'content',
          editor: lexicalEditor({}), // Configure the rich text editor
          type: 'richText',
          label: 'Section Content', // Add label
          required: false,
        },
      ],
    },
    // ✅ FAQs Array
    {
      name: 'faqs',
      type: 'array',
      label: 'FAQs', // Add label
      required: false,
      fields: [
        {
          name: 'question',
          type: 'text',
          label: 'FAQ Question', // Add label
          required: true,
        },
        {
          name: 'answer',
          type: 'richText',
          editor: lexicalEditor({}),
          label: 'FAQ Answer', // Add label
          required: false,
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if ((operation === 'create' || operation === 'update') && data.title && !data.slug) {
          data.slug = data.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '')
        }
        return data
      },
    ],
  },
}

export default Blog
