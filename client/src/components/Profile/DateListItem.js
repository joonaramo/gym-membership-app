import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import { PencilAltIcon, CheckIcon } from '@heroicons/react/outline'
import { format } from 'date-fns'
import { classNames } from '../../utils/helpers'

const DateListItem = ({
  title,
  name,
  value,
  updatedObject,
  setUpdatedObject,
  setHasUnsavedChanges,
  editable,
  ...props
}) => {
  const [editState, setEditState] = useState(false)
  const [updatedValue, setUpdatedValue] = useState(value)

  const updateField = () => {
    if (updatedValue.getTime() !== value.getTime()) {
      setUpdatedObject({ ...updatedObject, [name]: updatedValue })
      setHasUnsavedChanges(true)
    }
    setEditState(false)
  }

  useEffect(() => {
    setUpdatedValue(value)
  }, [value])

  return (
    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 lg:px-8">
      <dt className="text-sm font-medium text-gray-500">{title}</dt>
      {editState ? (
        <>
          <div>
            <DatePicker
              {...props}
              selected={updatedValue}
              onChange={(val) => {
                setUpdatedValue(val)
              }}
            />
          </div>
          <dd className="flex mt-1 text-sm text-gray-900 sm:mt-0">
            <button onClick={() => updateField()}>
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
            {format(new Date(value), props.dateFormat)}
          </dd>
          {editable && (
            <dd className="flex mt-1 text-sm text-gray-900 sm:mt-0">
              <button onClick={() => setEditState(true)}>
                <PencilAltIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </dd>
          )}
        </>
      )}
    </div>
  )
}

DateListItem.defaultProps = {
  editable: true,
}

export default DateListItem
