import type { CollectionConfig } from 'payload'

export const Recipes: CollectionConfig = {
  slug: 'recipes',
  admin: {
    useAsTitle: 'title',
    defaultColumns: [
      'title',
      'difficulty',
      'image',
      'category',
      'prepTime',
      'cookTime',
      'published',
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Brief description of the recipe',
      },
    },
    {
      name: 'ingredients',
      type: 'richText',
      required: true,
      admin: {
        description: 'List of ingredients with quantities',
      },
    },
    {
      name: 'instructions',
      type: 'richText',
      required: true,
      admin: {
        description: 'Step-by-step cooking instructions',
      },
    },
    {
      name: 'prepTime',
      type: 'number',
      admin: {
        description: 'Preparation time in minutes',
        step: 5,
      },
    },
    {
      name: 'cookTime',
      type: 'number',
      admin: {
        description: 'Cooking time in minutes',
        step: 5,
      },
    },
    {
      name: 'servings',
      type: 'number',
      admin: {
        description: 'Number of servings',
        step: 1,
      },
    },
    {
      name: 'difficulty',
      type: 'select',
      options: [
        { label: 'Easy', value: 'easy' },
        { label: 'Medium', value: 'medium' },
        { label: 'Hard', value: 'hard' },
      ],
      defaultValue: 'medium',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Recipe image',
      },
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories' as const,
      hasMany: true,
      admin: {
        description: 'Select recipe categories',
      },
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Make this recipe publicly visible',
      },
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data, operation }) => {
        if (operation === 'create' && data?.title && !data?.slug) {
          data.slug = data.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
        }
        return data
      },
    ],
  },
}
