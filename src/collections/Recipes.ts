import type { CollectionConfig } from 'payload'

export const Recipes: CollectionConfig = {
  slug: 'recipes',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'difficulty', 'image', 'prepTime', 'cookTime', 'published'],
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
      type: 'array',
      fields: [
        {
          name: 'quantity',
          type: 'number',
          required: true,
          admin: {
            description: 'Amount (e.g., 2, 1.5, 0.75)',
            step: 0.25,
          },
        },
        {
          name: 'measurement',
          type: 'select',
          required: true,
          options: [
            { label: 'as needed', value: 'as needed' },
            { label: 'dash', value: 'dash' },
            { label: 'drop', value: 'drop' },
            { label: 'fluid ounce', value: 'fl oz' },
            { label: 'gallon', value: 'gal' },
            { label: 'gram', value: 'g' },
            { label: 'kilogram', value: 'kg' },
            { label: 'liter', value: 'l' },
            { label: 'milligram', value: 'mg' },
            { label: 'milliliter', value: 'ml' },
            { label: 'ounce', value: 'oz' },
            { label: 'pinch', value: 'pinch' },
            { label: 'pint', value: 'pt' },
            { label: 'pound', value: 'lb' },
            { label: 'quart', value: 'qt' },
            { label: 'smidgen', value: 'smidgen' },
            { label: 'tablespoon', value: 'tbsp' },
            { label: 'teaspoon', value: 'tsp' },
            { label: 'to taste', value: 'to taste' },
            { label: 'whole', value: 'whole' },
            { label: 'large', value: 'large' },
            { label: 'medium', value: 'medium' },
            { label: 'small', value: 'small' },
          ],
          defaultValue: 'whole',
        },
        {
          name: 'ingredient',
          type: 'text',
          required: true,
          admin: {
            description: 'Ingredient name (e.g., flour, onions, chicken breast)',
          },
        },
        {
          name: 'notes',
          type: 'text',
          admin: {
            description: 'Optional notes (e.g., diced, minced, at room temperature)',
          },
        },
      ],
      admin: {
        description: 'List of ingredients with quantities and measurements',
      },
    },
    {
      name: 'instructions',
      type: 'array',
      fields: [
        {
          name: 'stepNumber',
          type: 'number',
          required: true,
          admin: {
            description: 'Step number (auto-ordered)',
            step: 1,
          },
        },
        {
          name: 'instruction',
          type: 'richText',
          required: true,
          admin: {
            description: 'Step-by-step instruction',
          },
        },
      ],
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
      name: 'dishType',
      type: 'select',
      options: [
        { label: 'Appetizer', value: 'appetizer' },
        { label: 'Beverage', value: 'beverage' },
        { label: 'Bread', value: 'bread' },
        { label: 'Breakfast', value: 'breakfast' },
        { label: 'Condiment', value: 'condiment' },
        { label: 'Dessert', value: 'dessert' },
        { label: 'Dinner', value: 'dinner' },
        { label: 'Lunch', value: 'lunch' },
        { label: 'Main Course', value: 'main-course' },
        { label: 'Marinade', value: 'marinade' },
        { label: 'Pasta', value: 'pasta' },
        { label: 'Pizza', value: 'pizza' },
        { label: 'Salad', value: 'salad' },
        { label: 'Sandwich', value: 'sandwich' },
        { label: 'Sauce', value: 'sauce' },
        { label: 'Side Dish', value: 'side-dish' },
        { label: 'Snack', value: 'snack' },
        { label: 'Soup', value: 'soup' },
      ],
      admin: {
        description: 'Type of dish',
      },
    },
    {
      name: 'cookingMethod',
      type: 'select',
      options: [
        { label: 'Air Fryer', value: 'air-fryer' },
        { label: 'Deep Fryer', value: 'deep-fryer' },
        { label: 'Dutch Oven', value: 'dutch-oven' },
        { label: 'Grill', value: 'grill' },
        { label: 'Instant Pot', value: 'instant-pot' },
        { label: 'Microwave', value: 'microwave' },
        { label: 'No Cook', value: 'no-cook' },
        { label: 'Oven', value: 'oven' },
        { label: 'Pressure Cooker', value: 'pressure-cooker' },
        { label: 'Slow Cooker', value: 'slow-cooker' },
        { label: 'Smoker', value: 'smoker' },
        { label: 'Sous Vide', value: 'sous-vide' },
        { label: 'Stovetop', value: 'stovetop' },
        { label: 'Toaster Oven', value: 'toaster-oven' },
      ],
      admin: {
        description: 'Primary cooking method used',
      },
    },
    {
      name: 'dietTypes',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Dairy-Free', value: 'dairy-free' },
        { label: 'Egg-Free', value: 'egg-free' },
        { label: 'Flexitarian', value: 'flexitarian' },
        { label: 'Gluten-Free', value: 'gluten-free' },
        { label: 'Keto', value: 'keto' },
        { label: 'Low-Carb', value: 'low-carb' },
        { label: 'Mediterranean', value: 'mediterranean' },
        { label: 'Nut-Free', value: 'nut-free' },
        { label: 'Paleo', value: 'paleo' },
        { label: 'Pescatarian', value: 'pescatarian' },
        { label: 'Raw', value: 'raw' },
        { label: 'Soy-Free', value: 'soy-free' },
        { label: 'Vegan', value: 'vegan' },
        { label: 'Vegetarian', value: 'vegetarian' },
        { label: 'Whole30', value: 'whole30' },
      ],
      admin: {
        description: 'Dietary restrictions or preferences (select all that apply)',
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
