
import React from 'react'
import { Card } from 'antd'
import PropTypes from 'prop-types'

class SubpartPreview extends React.PureComponent {
  render () {
    const {
      subpartPreview: {
        index,
        contentText,
        solutionText,
        hintText,
        hintImages,
        solutionImages,
        contentImages,
        templateType,
        variablesNumber
      } = {},
      isInner
    } = this.props
    return (
      <Card type={isInner ? 'inner' : null} className={!isInner ? 'margin-double--top' : ''} title={`Subpart ${index} Preview`} >
        <div className='margin--ends'>
          <span className='strong margin--right'>Subpart Index:</span>
          <span className='margin-double--right'>{index}</span>
          <span className='strong margin--right'>No of Variables:</span>
          <span className='margin-double--right'>{variablesNumber}</span>
          <span className='strong margin--right'>Template Type:</span>
          <span>{templateType}</span>
        </div>
        <Card type="inner" title="Question Preview" className='margin--ends'>
          <div>
            <div className='strong'>Question Text:</div>
            <div>{contentText}</div>
          </div>
          <div>
            <span className='strong'>Question Images:</span>
            <div className='center'>
              {
                contentImages.map((imageFile, index) => {
                  return (<img key={index} alt={`preview-solution-${index}`} src={imageFile.thumbUrl} />)
                })
              }
            </div>
          </div>
        </Card>
        <Card type="inner" title="Hint Preview" className='margin--ends'>
          <div>
            <div className='strong'>Hint Text:</div>
            <div>{hintText}</div>
          </div>
          <div>
            <span className='strong'>Hint Images:</span>
            <div className='center'>
              {
                hintImages.map((imageFile, index) => {
                  return (<img key={index} alt={`preview-solution-${index}`} src={imageFile.thumbUrl} />)
                })
              }
            </div>
          </div>
        </Card>
        <Card type="inner" title="Solution Preview" className='margin--ends'>
          <div>
            <div className='strong'>Solution Text:</div>
            <div>{solutionText}</div>
          </div>
          <div>
            <span className='strong'>Solution Images:</span>
            <div className='center'>
              {
                solutionImages.map((imageFile, index) => {
                  return (<img key={index} alt={`preview-solution-${index}`} src={imageFile.thumbUrl} />)
                })
              }
            </div>
          </div>
        </Card>
      </Card>
    )
  }
}

SubpartPreview.propTypes = {
  subpartPreview: PropTypes.object.isRequired,
  isInner: PropTypes.bool
}

export default SubpartPreview
