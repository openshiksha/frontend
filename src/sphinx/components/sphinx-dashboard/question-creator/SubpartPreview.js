
import React from 'react'
import { Card, Input, Radio, Dropdown, Menu, Button } from 'antd'
import PropTypes from 'prop-types'
import { DownOutlined } from '@ant-design/icons'

const radioStyle = {
  display: 'block'
}

class SubpartPreview extends React.PureComponent {
  renderAnswer (templateType, correctAnswer) {
    switch (templateType) {
      case 'textual': {
        return (
          <>
            <span className='margin-half--bottom' > Correct Answer: </span>
            <Input className='margin-half--bottom' disabled={true} value={correctAnswer[templateType].text} />
          </>
        )
      }
      case 'numerical': {
        return (
          <>
            <span className='margin-half--bottom' > Correct Answer: </span>
            <Input className='margin-half--bottom' disabled={true} value={correctAnswer[templateType].text} />
          </>
        )
      }
      case 'MCSAQ': {
        const { format, correct, incorrect } = correctAnswer[templateType]
        if (format === 'radio') {
          return (
            <>
              <Radio.Group>
                <Radio style={radioStyle} checked={true} key={999999}>
                  <span>{correct[0].text}</span>
                  {
                    correct[0].images.length
                      ? <div className='center'>
                        {
                          correct[0].images.map((imageFile, index) => {
                            return (<img key={index} alt={`preview-correct-${index}`} src={imageFile.thumbUrl} />)
                          })
                        }
                      </div>
                      : null
                  }
                </Radio>
                {
                  incorrect.map((incorrectAnswer, answerIndex) => {
                    return (
                      <Radio style={radioStyle} key={answerIndex} checked={false} disabled={true} value={incorrectAnswer.text}>
                        <span> {incorrectAnswer.text} </span>
                        {
                          incorrectAnswer.images.length
                            ? <div className='center'>
                              {
                                incorrectAnswer.images.map((imageFile, index) => {
                                  return (<img key={index} alt={`preview-incorrect-${answerIndex}-${index}`} src={imageFile.thumbUrl} />)
                                })
                              }
                            </div>
                            : null
                        }
                      </Radio>
                    )
                  })
                }
              </Radio.Group>
            </>
          )
        } else {
          const dropdownMenu = (
            <Menu>
              <Menu.Item key={999999}>
                <>
                  <p>{correct[0].text}</p>
                  {
                    correct[0].images.length
                      ? <div className='center'>
                        {
                          correct[0].images.map((imageFile, index) => {
                            return (<img key={index} alt={`preview-correct-${index}`} src={imageFile.thumbUrl} />)
                          })
                        }
                      </div>
                      : null
                  }
                </>
              </Menu.Item>
              {
                incorrect.map((incorrectAnswer, answerIndex) => {
                  return (
                    <Menu.Item key={answerIndex} danger>
                      <>
                        <p>{incorrectAnswer.text}</p>
                        {
                          incorrectAnswer.images.length
                            ? <div className='center'>
                              {
                                incorrectAnswer.images.map((imageFile, index) => {
                                  return (<img key={index} alt={`preview-incorrect-${answerIndex}-${index}`} src={imageFile.thumbUrl} />)
                                })
                              }
                            </div>
                            : null
                        }
                      </>
                    </Menu.Item>
                  )
                })
              }
            </Menu>
          )
          return (
            <Dropdown overlay={dropdownMenu} >
              <Button>
                Choose an Answer <DownOutlined />
              </Button>
            </Dropdown>
          )
        }
      }
      case 'MCMAQ': {
        const { correct, incorrect } = correctAnswer[templateType]
        return (
          <>
            <Radio.Group>
              {
                correct.map((correctAnswer, answerIndex) => {
                  return (
                    <Radio style={radioStyle} key={answerIndex} checked={true}>
                      <span> {correctAnswer.text} </span>
                      {
                        correctAnswer.images.length
                          ? <div className='center'>
                            {
                              correctAnswer.images.map((imageFile, index) => {
                                return (<img key={index} alt={`preview-correct-${answerIndex}-${index}`} src={imageFile.thumbUrl} />)
                              })
                            }
                          </div>
                          : null
                      }
                    </Radio>
                  )
                })
              }
              {
                incorrect.map((incorrectAnswer, answerIndex) => {
                  return (
                    <Radio style={radioStyle} key={answerIndex} checked={false} disabled={true} value={incorrectAnswer.text}>
                      <span> {incorrectAnswer.text} </span>
                      {
                        incorrectAnswer.images.length
                          ? <div className='center'>
                            {
                              incorrectAnswer.images.map((imageFile, index) => {
                                return (<img key={index} alt={`preview-incorrect-${answerIndex}-${index}`} src={imageFile.thumbUrl} />)
                              })
                            }
                          </div>
                          : null
                      }
                    </Radio>
                  )
                })
              }
            </Radio.Group>
          </>
        )
      }
      default:
        return null
    }
  }

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
        variablesNumber,
        correctAnswer
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
            <div>{contentText}</div>
          </div>
          <div>
            <div className='center'>
              {
                contentImages.map((imageFile, index) => {
                  return (<img key={index} alt={`preview-solution-${index}`} src={imageFile.thumbUrl} />)
                })
              }
            </div>
          </div>
          <div>
            {this.renderAnswer(templateType, correctAnswer)}
          </div>
        </Card>
        <Card type="inner" title="Hint Preview" className='margin--ends'>
          <div>
            <div>{hintText}</div>
          </div>
          <div>
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
            <div>{solutionText}</div>
          </div>
          <div>
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
