import type { CollectionConfig } from 'payload'

export const Collection: CollectionConfig = {
  slug: 'collection',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'description', 'recipeCount'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Name of your recipe collection (e.g., "Weeknight Recipes")',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Brief description of this collection',
      },
    },
    {
      name: 'recipes',
      type: 'relationship',
      relationTo: 'recipes',
      hasMany: true,
      admin: {
        description: 'Add recipes to this collection',
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create' && data?.name && !data?.slug) {
          data.slug = data.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
        }
        return data
      },
    ],
  },
}
