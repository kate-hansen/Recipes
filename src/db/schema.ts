import { mysqlTable, varchar, text, int, timestamp, boolean } from 'drizzle-orm/mysql-core'

export const recipes = mysqlTable('recipes', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  ingredients: text('ingredients').notNull(),
  instructions: text('instructions').notNull(),
  prepTime: int('prep_time'),
  cookTime: int('cook_time'),
  servings: int('servings'),
  difficulty: varchar('difficulty', { length: 50 }),
  imageUrl: varchar('image_url', { length: 500 }),
  published: boolean('published').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
})

export const categories = mysqlTable('categories', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
})

export const recipeCategories = mysqlTable('recipe_categories', {
  id: int('id').primaryKey().autoincrement(),
  recipeId: int('recipe_id').notNull(),
  categoryId: int('category_id').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

export type Recipe = typeof recipes.$inferSelect
export type NewRecipe = typeof recipes.$inferInsert
export type Category = typeof categories.$inferSelect
export type NewCategory = typeof categories.$inferInsert
