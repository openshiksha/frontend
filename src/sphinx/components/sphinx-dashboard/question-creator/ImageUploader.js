import React from 'react'
import PropTypes from 'prop-types'
import { Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { getBase64 } from '../../../../common/utils'

class ImageUploader extends React.Component {
  async handlePreview (file) {
    const filePreview = await getBase64(file.originFileObj)
    const fileName = file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    this.props.onTriggerImagePreview(filePreview, fileName)
  };

  render () {
    const { imageList, imageType } = this.props
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    return (
      <div className="clearfix">
        <Upload
          action={(file) => Promise.resolve('Success')}
          listType="picture-card"
          fileList={imageList}
          onPreview={(file) => this.handlePreview(file)}
          onChange={({ fileList }) => this.props.onChangeImageList(fileList, imageType)}
          onRemove={(file) => this.props.onRemoveImageFromImageList(file, imageType)}
        >
          {imageList.length >= 8 ? null : uploadButton}
        </Upload>
      </div>
    )
  }
}

ImageUploader.propTypes = {
  imageList: PropTypes.array.isRequired,
  imageType: PropTypes.string.isRequired,
  onTriggerImagePreview: PropTypes.func.isRequired,
  onChangeImageList: PropTypes.func.isRequired,
  onRemoveImageFromImageList: PropTypes.func.isRequired
}

export default ImageUploader
