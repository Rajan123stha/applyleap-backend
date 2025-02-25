import type { CollectionConfig } from 'payload'

const Courses: CollectionConfig = {
  slug: 'courses',
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
      name: 'oneLiner',
      type: 'text',
      label: 'One Liner',
    },
    {
      name: 'field',
      type: 'text',
      label: 'Field of Study',
    },
    {
      name: 'duration',
      type: 'text',
      label: 'Course Duration',
    },
    {
      name: 'introduction',
      type: 'text',
      label: 'Introduction',
    },
    {
      name: 'keyHighlights',
      type: 'text',
      label: 'Key Highlights',
    },
    {
      name: 'admissionDetails',
      type: 'text',
      label: 'Admission Details',
    },
    {
      name: 'careerOpportunities',
      type: 'text',
      label: 'Career Opportunities',
    },
    {
      name: 'courseDetails',
      type: 'array',
      label: 'Course Details',
      fields: [
        {
          name: 'field',
          type: 'text',
          label: 'Field',
        },
        {
          name: 'description',
          type: 'text',
          label: 'Description',
        },
      ],
    },
    {
      name: 'studentReviews',
      type: 'array',
      label: 'Student Reviews',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Student Image',
        },
        {
          name: 'name',
          type: 'text',
          label: 'Student Name',
        },
        {
          name: 'review',
          type: 'text',
          label: 'Review',
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
        },
        {
          name: 'answer',
          type: 'text',
          label: 'FAQ Answer',
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

export default Courses
