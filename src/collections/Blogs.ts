import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

const Blog: CollectionConfig = {
  slug: 'blogs',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true, // Allow public access for reading blogs
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
      name: 'writer',
      type: 'text',
      required: true,
    },
    {
      name: 'writerImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },

    {
      name: 'writerPosition',
      type: 'text',
      label: 'Writer Position',
      required: false,
    },
    {
      name: 'factCheckedBy',
      type: 'text',
      required: false,
    },
    {
      name: 'reviewedBy',
      type: 'text',
      required: false,
    },

    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: false,
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
    {
      name: 'sections',
      type: 'array',
      label: 'Blog Sections',
      required: false,
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Section Heading',
          required: true,
        },
        {
          name: 'content',
          type: 'richText',
          editor: lexicalEditor({}),
          label: 'Section Content',
          required: false,
        },
      ],
    },
    {
      name: 'faqs',
      type: 'array',
      label: 'FAQs',
      required: false,
      fields: [
        {
          name: 'question',
          type: 'text',
          label: 'FAQ Question',
          required: true,
        },
        {
          name: 'answer',
          type: 'richText',
          editor: lexicalEditor({}),
          label: 'FAQ Answer',
          required: false,
        },
      ],
    },
    {
      name: 'sources',
      type: 'array',
      label: 'Sources',
      required: false,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Source Title',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'Source URL',
          required: true,
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation, req }: any) => {
        if (operation === 'create') {
          if (data.title && !data.slug) {
            data.slug = data.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-|-$/g, '')
          }
        }

        if (operation === 'update') {
          const oldTitle = req?.originalDoc?.title
          const newTitle = data.title

          // Only update slug if title changed
          if (newTitle && newTitle !== oldTitle) {
            data.slug = newTitle
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-|-$/g, '')
          }
        }

        return data
      },
    ],
  },
}

export default Blog
