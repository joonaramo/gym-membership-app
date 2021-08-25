import React, { useState, useEffect } from 'react'

const ListListItem = ({
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
    if (JSON.stringify(updatedValue) !== JSON.stringify(value)) {
      setUpdatedObject({ ...updatedObject, [name]: updatedValue })
      setHasUnsavedChanges(true)
    } else {
      setHasUnsavedChanges(false)
    }
  }

  const onChange = (e) => {
    if (!e.target.checked) {
      setUpdatedValue(updatedValue.filter((id) => id !== e.target.name))
    } else {
      setUpdatedValue([...updatedValue, e.target.name])
    }
  }

  return (
    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 lg:px-8">
      <dt className="text-sm font-medium text-gray-500">{title}</dt>
      <fieldset className="space-y-5">
        <legend className="sr-only">{title}</legend>
        {listItems.map((item) => (
          <div key={item.id} className="relative flex items-start">
            <div className="flex items-center h-5">
              <input
                id={item.id}
                aria-describedby="description"
                name={item.id}
                defaultChecked={value.includes(item.id)}
                onChange={(e) => onChange(e)}
                type="checkbox"
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor={item.id} className="font-medium text-gray-700">
                {item.code}
              </label>
              <p id="description" className="text-gray-500">
                {item.value}€
              </p>
            </div>
          </div>
        ))}
      </fieldset>
    </div>
  )
}

export default ListListItem
