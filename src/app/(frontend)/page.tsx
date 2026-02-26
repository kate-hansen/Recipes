import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Recipe Collection</h2>
      <p className="text-gray-600 mb-8">
        Start building your recipe collection by adding your first recipe in the admin panel.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">📝 Add Recipes</h3>
          <p className="text-sm text-gray-600">
            Create detailed recipes with ingredients, instructions, and cooking times.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">🏷️ Organize Collections</h3>
          <p className="text-sm text-gray-600">Group recipes by meal type, cuisine, or occasion.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">🔍 Filter & Search</h3>
          <p className="text-sm text-gray-600">
            Find recipes by diet, cooking method, or ingredients.
          </p>
        </div>
      </div>
    </div>
  )
}
