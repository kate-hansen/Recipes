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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Recipe Collection</h1>
            <Link
              href="/admin"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Admin
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Latest Recipes</h2>
          {recipes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No recipes found. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <Link
                  key={recipe.id}
                  href={`/recipes/${recipe.slug}`}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-video relative bg-gray-200 rounded-t-lg overflow-hidden">
                    {recipe.image && typeof recipe.image === 'object' && 'url' in recipe.image ? (
                      <Image
                        src={recipe.image.url as string}
                        alt={recipe.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{recipe.title}</h3>
                    {recipe.description && (
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{recipe.description}</p>
                    )}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="capitalize">{recipe.difficulty}</span>
                      {recipe.prepTime && recipe.cookTime && (
                        <span>{recipe.prepTime + recipe.cookTime} min</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
