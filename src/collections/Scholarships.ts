import type { CollectionConfig } from 'payload'

const Scholarships: CollectionConfig = {
  slug: 'scholarships',
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
      label: 'Country',
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
      name: 'about',
      type: 'text',
      label: 'About Scholarship',
    },
    {
      name: 'types_of_scholarship',
      type: 'text',
      label: 'Types of Scholarships',
    },
    {
      name: 'how_to_apply',
      type: 'text',
      label: 'How to Apply',
    },
    {
      name: 'tips',
      type: 'text',
      label: 'Application Tips',
    },
    {
      name: 'scholarship_details',
      type: 'array',
      label: 'Scholarship Details',
      fields: [
        {
          name: 'provider_type',
          type: 'select',
          label: 'Provider Type',
          options: [
            { label: 'Government', value: 'government' },
            { label: 'College', value: 'college' },
            { label: 'Independent', value: 'independent' },
          ],
          required: true,
        },
        {
          name: 'grant',
          type: 'text',
          label: 'Grant Amount or Type',
          required: true,
        },
        {
          name: 'deadline',
          type: 'date',
          label: 'Application Deadline',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Scholarship Title',
          required: true,
        },
        {
          name: 'criteria',
          type: 'text',
          label: 'Eligibility Criteria',
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

export default Scholarships
