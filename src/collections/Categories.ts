import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'description'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Brief description of the category',
      },
    },
    {
      name: 'color',
      type: 'text',
      admin: {
        description: 'Color hex code for category display (e.g., #FF5733)',
        placeholder: '#FF5733',
      },
    },
  ],
}
