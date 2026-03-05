import React from 'react'

export default async function HomePage() {
  return (
    <div className="py-12 text-center">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">Your Recipe Collection</h2>
      <p className="mb-8 text-gray-600">
        Go to{' '}
        <a href="/admin" className="text-blue-600 hover:underline">
          admin panel
        </a>{' '}
        to start adding recipes.
      </p>
    </div>
  )
}
