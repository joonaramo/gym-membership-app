import React from 'react'
import { classNames } from '../../../utils/helpers'

const Text = ({
  reversed,
  title,
  subtitle,
  content,
  buttonText,
  buttonUrl,
}) => {
  return (
    <div className="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div
        className={classNames(
          reversed ? '' : 'md:ml-auto md:pl-10',
          'md:w-1/2 md:pr-10'
        )}
      >
        <h2 className="text-base font-semibold uppercase tracking-wider text-gray-300">
          {subtitle}
        </h2>
        <p className="mt-2 text-white text-3xl font-extrabold tracking-tight sm:text-4xl">
          {title}
        </p>
        <p className="mt-3 text-lg text-gray-300">{content}</p>
        <div className="mt-8">
          <div className="inline-flex rounded-md shadow">
            <a
              href={buttonUrl}
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50"
            >
              {buttonText}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Text
