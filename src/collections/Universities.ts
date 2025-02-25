import type { CollectionConfig } from 'payload'

const University: CollectionConfig = {
  slug: 'universities',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true, // Allow public access for reading blogs
    // Or if you need to restrict access, specify roles or conditions
  },
  fields: [
    { name: 'name', type: 'text', required: true },

    { name: 'bannerImage', type: 'upload', relationTo: 'media' },
    { name: 'quote', type: 'text' },
    { name: 'rank', type: 'text' },
    { name: 'internationalStudentsPercentage', type: 'text' },
    { name: 'location', type: 'text' },
    { name: 'famousCourses', type: 'text' },
    { name: 'establishedYear', type: 'text' },
    { name: 'feeRange', type: 'text' },
    { name: 'introduction', type: 'text' },
    { name: 'whyChooseUni', type: 'text' },
    { name: 'academicInformation', type: 'text' },
    { name: 'admissionDetails', type: 'text' },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    // Tuition Fees (Array Field)
    {
      name: 'tuitionFees',
      type: 'array',
      fields: [
        { name: 'program', type: 'text', required: true },
        { name: 'feePerYear', type: 'text', required: true },
        { name: 'duration', type: 'text', required: true },
      ],
    },

    // Alumni Success Stories (Array Field)
    {
      name: 'alumniSuccessStories',
      type: 'array',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'name', type: 'text', required: true },
        { name: 'details', type: 'text' },
      ],
    },

    // FAQs (Array Field)
    {
      name: 'faqs',
      type: 'array',
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'text' },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if ((operation === 'create' || operation === 'update') && data.name && !data.slug) {
          data.slug = data.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '')
        }
        return data
      },
    ],
  },
}

export default University
