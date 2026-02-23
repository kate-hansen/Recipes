import { getPayload } from 'payload'
import config from '@payload-config'
import { db } from '../db'
import { categories, recipes, recipeCategories } from '../db/schema'

const seedData = async () => {
  console.log('🌱 Starting seed...')

  const payload = await getPayload({ config })

  // Create categories
  const categoryData = [
    { name: 'Breakfast', description: 'Morning meals to start your day right', color: '#FFA500' },
    { name: 'Lunch', description: 'Midday meals for energy', color: '#32CD32' },
    { name: 'Dinner', description: 'Hearty evening meals', color: '#4169E1' },
    { name: 'Dessert', description: 'Sweet treats and indulgences', color: '#FF69B4' },
    { name: 'Snacks', description: 'Quick bites between meals', color: '#FFD700' },
  ]

  console.log('Creating categories...')
  const createdCategories = await Promise.all(
    categoryData.map(async (cat) => {
      const [category] = await db.insert(categories).values(cat).returning()
      
      // Also create in Payload
      await payload.create({
        collection: 'categories',
        data: cat,
      })
      
      return category
    })
  )

  // Create recipes
  const recipeData = [
    {
      title: 'Classic Pancakes',
      slug: 'classic-pancakes',
      description: 'Fluffy breakfast pancakes perfect for weekend mornings',
      ingredients: '<ul><li>2 cups all-purpose flour</li><li>2 tablespoons sugar</li><li>2 teaspoons baking powder</li><li>1 teaspoon salt</li><li>2 eggs</li><li>1¾ cups milk</li><li>¼ cup melted butter</li></ul>',
      instructions: '<ol><li>Mix dry ingredients in a large bowl</li><li>Whisk eggs, milk, and melted butter in another bowl</li><li>Pour wet ingredients into dry ingredients and stir until just combined</li><li>Heat griddle over medium heat</li><li>Pour ¼ cup batter for each pancake</li><li>Cook until bubbles form, then flip</li><li>Cook until golden brown</li></ol>',
      prepTime: 10,
      cookTime: 15,
      servings: 4,
      difficulty: 'easy',
      published: true,
    },
    {
      title: 'Caesar Salad',
      slug: 'caesar-salad',
      description: 'Crisp romaine lettuce with classic Caesar dressing',
      ingredients: '<ul><li>2 heads romaine lettuce</li><li>½ cup Caesar dressing</li><li>1 cup croutons</li><li>¼ cup parmesan cheese</li><li>2 cloves garlic</li><li>2 anchovy fillets</li></ul>',
      instructions: '<ol><li>Wash and chop romaine lettuce</li><li>Make dressing with garlic, anchovies, and other ingredients</li><li>Toss lettuce with dressing</li><li>Top with croutons and parmesan</li><li>Serve immediately</li></ol>',
      prepTime: 15,
      cookTime: 0,
      servings: 4,
      difficulty: 'easy',
      published: true,
    },
    {
      title: 'Spaghetti Carbonara',
      slug: 'spaghetti-carbonara',
      description: 'Classic Italian pasta with eggs, cheese, and pancetta',
      ingredients: '<ul><li>400g spaghetti</li><li>200g pancetta</li><li>4 large eggs</li><li>100g Pecorino Romano cheese</li><li>Black pepper</li><li>Salt</li></ul>',
      instructions: '<ol><li>Cook spaghetti according to package directions</li><li>Crisp pancetta in a large pan</li><li>Whisk eggs and grated cheese</li><li>Drain pasta, reserve some pasta water</li><li>Mix hot pasta with pancetta</li><li>Remove from heat, add egg mixture</li><li>Toss quickly, adding pasta water as needed</li><li>Season with pepper and serve</li></ol>',
      prepTime: 10,
      cookTime: 20,
      servings: 4,
      difficulty: 'medium',
      published: true,
    },
  ]

  console.log('Creating recipes...')
  const createdRecipes = await Promise.all(
    recipeData.map(async (recipe) => {
      const [createdRecipe] = await db.insert(recipes).values(recipe).returning()
      
      // Also create in Payload
      const payloadRecipe = await payload.create({
        collection: 'recipes',
        data: recipe,
      })
      
      return { drizzle: createdRecipe, payload: payloadRecipe }
    })
  )

  // Create recipe-category relationships
  console.log('Creating recipe-category relationships...')
  await Promise.all([
    // Classic Pancakes -> Breakfast
    db.insert(recipeCategories).values({
      recipeId: createdRecipes[0].drizzle.id,
      categoryId: createdCategories[0].id,
    }),
    // Caesar Salad -> Lunch
    db.insert(recipeCategories).values({
      recipeId: createdRecipes[1].drizzle.id,
      categoryId: createdCategories[1].id,
    }),
    // Spaghetti Carbonara -> Dinner
    db.insert(recipeCategories).values({
      recipeId: createdRecipes[2].drizzle.id,
      categoryId: createdCategories[2].id,
    }),
  ])

  console.log('✅ Seed completed successfully!')
}

seedData().catch(console.error)
