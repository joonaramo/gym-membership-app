import React from 'react'
import Image from './Image'
import Text from './Text'

const ImageSection = ({
  reversed,
  imageUrl,
  title,
  subtitle,
  content,
  buttonText,
  buttonUrl,
}) => {
  return (
    <div id='about' className='relative bg-gray-800'>
      <Image imageUrl={imageUrl} reversed={reversed} />
      <Text
        reversed={reversed}
        title={title}
        subtitle={subtitle}
        content={content}
        buttonText={buttonText}
        buttonUrl={buttonUrl}
      />
    </div>
  )
}

export default ImageSection
