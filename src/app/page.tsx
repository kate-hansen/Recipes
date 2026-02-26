import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import Image from 'next/image'

export default async function HomePage() {
  const payload = await getPayload({ config })

  const { docs: recipes } = await payload.find({
    collection: 'recipes',
    where: {
      published: { equals: true },
    },
    sort: '-createdAt',
    limit: 12,
    depth: 1,
  })

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2>Latest Recipes</h2>
        <p className="text-gray-600">Discover delicious recipes from our collection</p>
      </div>

      {recipes.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-gray-500">No recipes found. Check back soon!</p>
          <Link
            href="/admin"
            className="inline-block px-4 py-2 mt-4 text-blue-600 rounded-md border border-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
          >
            Add Your First Recipe
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <Link
              key={recipe.id}
              href={`/recipes/${recipe.slug}`}
              className="block p-4 bg-white rounded-lg shadow-md transition-shadow hover:shadow-lg"
            >
              <div className="overflow-hidden relative mb-4 bg-gray-200 rounded-lg aspect-video">
                {recipe.image && typeof recipe.image === 'object' && 'url' in recipe.image ? (
                  <Image
                    src={recipe.image.url as string}
                    alt={recipe.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex justify-center items-center w-full h-full text-gray-400">
                    No Image
                  </div>
                )}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">{recipe.title}</h3>
              {recipe.description && (
                <p className="mb-3 text-sm text-gray-600 line-clamp-2">{recipe.description}</p>
              )}
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span className="capitalize">{recipe.difficulty}</span>
                {recipe.prepTime && recipe.cookTime && (
                  <span>{recipe.prepTime + recipe.cookTime} min</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
