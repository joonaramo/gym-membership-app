import React, { useState, useEffect } from 'react'

const SelectListItem = ({
  title,
  name,
  value,
  updatedObject,
  setUpdatedObject,
  setHasUnsavedChanges,
  listItems,
}) => {
  const [updatedValue, setUpdatedValue] = useState(value)
  useEffect(() => {
    updateField()
  }, [updatedValue])

  useEffect(() => {
    setUpdatedValue(value)
  }, [value])

  const updateField = () => {
    if (updatedValue !== value) {
      setUpdatedObject({ ...updatedObject, [name]: updatedValue })
      setHasUnsavedChanges(true)
    } else {
      setHasUnsavedChanges(false)
    }
  }

  const onChange = (e) => {
    setUpdatedValue(e.target.value)
  }

  return (
    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 lg:px-8">
      <dt className="text-sm font-medium text-gray-500">{title}</dt>
      <div className="flex items-center h-5">
        <select
          id="list_items"
          name="list_items"
          onChange={(e) => onChange(e)}
          value={updatedValue}
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
        >
          <option value="">Select (optional)</option>
          {listItems.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default SelectListItem
