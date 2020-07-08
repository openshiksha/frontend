import React from 'react'
import PropTypes from 'prop-types'
import { Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { getBase64 } from '../../../../common/utils'
class ImageUploader extends React.Component {
  onChangeImageList ({ fileList }) {
    this.props.onChangeImageList(fileList, this.props.imageType)
  }

  async handlePreview (file) {
    const filePreview = await getBase64(file.originFileObj)
    const fileName = file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    this.props.onTriggerImagePreview(filePreview, fileName)
  };

  render () {
    const { imageList } = this.props
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    return (
      <div className="clearfix">
        <Upload
          action={(file) => Promise.resolve('Success').then((data) => {
            console.log(file)
          })
          }
          listType="picture-card"
          fileList={imageList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {imageList.length >= 8 ? null : uploadButton}
        </Upload>
      </div>
    )
  }
}

ImageUploader.propTypes = {
  imageList: PropTypes.object.isRequired,
  imageType: PropTypes.string.isRequired,
  onTriggerImagePreview: PropTypes.func.isRequired,
  onChangeImageList: PropTypes.func.isRequired
}

export default ImageUploader
