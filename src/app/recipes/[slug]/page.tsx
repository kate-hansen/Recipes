import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default async function RecipePage({ params }: { params: { slug: string } }) {
  const payload = await getPayload({ config })
  
  const { docs: recipes } = await payload.find({
    collection: 'recipes',
    where: {
      slug: { equals: params.slug },
      published: { equals: true },
    },
    depth: 2,
  })

  const recipe = recipes[0]

  if (!recipe) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="text-blue-600 hover:text-blue-800">
              ← Back to Recipes
            </Link>
            <Link
              href="/admin"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Admin
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {recipe.image && typeof recipe.image === 'object' && 'url' in recipe.image && (
            <div className="aspect-video relative bg-gray-200">
              <Image
                src={recipe.image.url as string}
                alt={recipe.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{recipe.title}</h1>
              
              {recipe.description && (
                <p className="text-lg text-gray-600 mb-4">{recipe.description}</p>
              )}

              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <span className="capitalize bg-gray-100 px-3 py-1 rounded-full">
                  {recipe.difficulty}
                </span>
                {recipe.prepTime && (
                  <span className="bg-gray-100 px-3 py-1 rounded-full">
                    Prep: {recipe.prepTime} min
                  </span>
                )}
                {recipe.cookTime && (
                  <span className="bg-gray-100 px-3 py-1 rounded-full">
                    Cook: {recipe.cookTime} min
                  </span>
                )}
                {recipe.servings && (
                  <span className="bg-gray-100 px-3 py-1 rounded-full">
                    Serves: {recipe.servings}
                  </span>
                )}
              </div>

              {recipe.categories && Array.isArray(recipe.categories) && recipe.categories.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {recipe.categories.map((category) => (
                    <span
                      key={typeof category === 'object' ? category.id : category}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {typeof category === 'object' ? category.name : category}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ingredients</h2>
                <div 
                  className="text-gray-700"
                  dangerouslySetInnerHTML={{ __html: recipe.ingredients }}
                />
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Instructions</h2>
                <div 
                  className="text-gray-700"
                  dangerouslySetInnerHTML={{ __html: recipe.instructions }}
                />
              </section>
            </div>
          </div>
        </article>
      </main>
    </div>
  )
}
