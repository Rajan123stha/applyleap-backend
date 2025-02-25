import type { CollectionConfig } from 'payload'

const Events: CollectionConfig = {
  slug: 'events',
  labels: {
    singular: 'Event',
    plural: 'Events',
  },
  admin: {
    useAsTitle: 'event_name',
  },
  access: {
    read: () => true, // Allow public access for reading blogs
  },
  fields: [
    {
      name: 'event_name',
      type: 'text',
      required: true,
    },
    {
      name: 'event_details',
      type: 'array',
      fields: [
        {
          name: 'event_name',
          type: 'text',
          required: true,
        },
        {
          name: 'banner_image',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
        {
          name: 'date',
          type: 'date',
          required: true,
        },
        {
          name: 'time',
          type: 'text',
          required: true,
        },
        {
          name: 'location',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          required: false,
        },
      ],
    },
    {
      name: 'faqs',
      type: 'array',
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}

export default Events
