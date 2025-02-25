import type { CollectionConfig } from 'payload'

const Tests: CollectionConfig = {
  slug: 'tests',
  labels: {
    singular: 'Test',
    plural: 'Tests',
  },
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
      name: 'banner_image',
      type: 'upload',
      relationTo: 'media',
      label: 'Banner Image',
    },
    {
      name: 'short_intro',
      type: 'text',
      label: 'Short Introduction',
    },
    {
      name: 'why_take_exam',
      type: 'text',
      label: 'Why Take Exam?',
    },
    {
      name: 'exam_types',
      type: 'text',
      label: 'Exam Types',
    },
    {
      name: 'exam_format',
      type: 'text',
      label: 'Exam Format',
    },
    {
      name: 'test_guide',
      type: 'text',
      label: 'Test Guide',
    },
    {
      name: 'costs',
      type: 'array',
      label: 'Cost Details',
      fields: [
        {
          name: 'test_type',
          type: 'text',
          label: 'Test Type',
          required: true,
        },
        {
          name: 'cost',
          type: 'text',
          label: 'Cost',
          required: true,
        },
      ],
    },
    {
      name: 'comparisons',
      type: 'array',
      label: 'Comparison',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Comparison Title',
          required: true,
        },
        {
          name: 'content',
          type: 'text',
          label: 'Comparison Content',
        },
      ],
    },
    {
      name: 'faqs',
      type: 'array',
      label: 'FAQs',
      fields: [
        {
          name: 'question',
          type: 'text',
          label: 'FAQ Question',
          required: true,
        },
        {
          name: 'answer',
          type: 'text',
          label: 'FAQ Answer',
          required: true,
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

export default Tests
