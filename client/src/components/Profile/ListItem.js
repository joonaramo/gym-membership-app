import React, { useState, useEffect } from 'react'
import { PencilAltIcon, CheckIcon } from '@heroicons/react/outline'
import { format } from 'date-fns'
import { classNames } from '../../utils/helpers'

const ListItem = ({
  title,
  name,
  value,
  type,
  updatedObject,
  setUpdatedObject,
  setHasUnsavedChanges,
  editable = true,
}) => {
  const [editState, setEditState] = useState(false)
  const [updatedValue, setUpdatedValue] = useState(value)
  const updateField = (e) => {
    e.preventDefault()
    if (updatedValue !== value) {
      if (name === 'api_key' || name === 'lat' || name === 'lng') {
        setUpdatedObject({
          ...updatedObject,
          maps: {
            ...updatedObject.maps,
            [name]: updatedValue,
          },
        })
      } else if (
        name === 'facebook' ||
        name === 'instagram' ||
        name === 'twitter'
      ) {
        setUpdatedObject({
          ...updatedObject,
          social_urls: {
            ...updatedObject.social_urls,
            [name]: updatedValue,
          },
        })
      } else if (name === 'welcome_email' || name === 'order_email') {
        setUpdatedObject({
          ...updatedObject,
          [name]: {
            ...updatedObject[name],
            message: updatedValue,
          },
        })
      } else {
        setUpdatedObject({ ...updatedObject, [name]: updatedValue })
      }
      setHasUnsavedChanges(true)
    }
    setEditState(false)
  }
  useEffect(() => {
    setUpdatedValue(value)
  }, [value])
  return (
    <form
      onSubmit={(e) => updateField(e)}
      className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 lg:px-8"
    >
      <dt className="text-sm font-medium text-gray-500">{title}</dt>
      {editState ? (
        <>
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0">
            <input
              id={name}
              name={name}
              type={type}
              value={updatedValue}
              onChange={(e) => setUpdatedValue(e.target.value)}
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </dd>
          <dd className="flex mt-1 text-sm text-gray-900 sm:mt-0">
            <button type="submit">
              <CheckIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </dd>
        </>
      ) : (
        <>
          <dd
            className={classNames(
              editable ? '' : 'col-span-2',
              'mt-1 text-sm text-gray-900 sm:mt-0'
            )}
          >
            {name === 'birth_date'
              ? format(new Date(value), 'dd.MM.yyyy')
              : value}
          </dd>
          {editable && (
            <dd className="flex mt-1 text-sm text-gray-900 sm:mt-0">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  setEditState(true)
                }}
              >
                <PencilAltIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </dd>
          )}
        </>
      )}
    </form>
  )
}

export default ListItem
