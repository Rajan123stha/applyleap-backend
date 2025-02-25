import type { CollectionConfig } from 'payload'

const Destinations: CollectionConfig = {
  slug: 'destinations',
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
      label: 'Banner Image',
    },
    {
      name: 'quote',
      type: 'text',
      label: 'Quote',
    },
    {
      name: 'shortIntro',
      type: 'text',
      label: 'Short Introduction',
    },
    {
      name: 'whyStudyHere',
      type: 'text',
      label: 'Why Study Here',
    },
    {
      name: 'courses',
      type: 'array',
      label: 'Courses',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Course Name',
        },
      ],
    },
    {
      name: 'scholarships',
      type: 'array',
      label: 'Scholarships',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Scholarship Name',
        },
        {
          name: 'details',
          type: 'text',
          label: 'Details',
        },
      ],
    },
    {
      name: 'universities',
      type: 'array',
      label: 'Universities',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'University Name',
        },
        {
          name: 'location',
          type: 'text',
          label: 'Location',
        },
      ],
    },
    {
      name: 'detailedRequirements',
      type: 'array',
      label: 'Detailed Requirements',
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Heading',
        },
        {
          name: 'content',
          type: 'text',
          label: 'Content',
        },
      ],
    },
    {
      name: 'benefits',
      type: 'array',
      label: 'Benefits',
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Heading',
        },
        {
          name: 'content',
          type: 'text',
          label: 'Content',
        },
      ],
    },
    {
      name: 'costDetails',
      type: 'array',
      label: 'Cost Details',
      fields: [
        {
          name: 'expense',
          type: 'text',
          label: 'Expense',
        },
        {
          name: 'costRange',
          type: 'text',
          label: 'Cost Range',
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
          label: 'Question',
        },
        {
          name: 'answer',
          type: 'text',
          label: 'Answer',
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

export default Destinations
