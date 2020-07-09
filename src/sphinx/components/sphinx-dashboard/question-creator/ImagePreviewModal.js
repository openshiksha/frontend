
import React from 'react'
import { Modal } from 'antd'
import PropTypes from 'prop-types'

const ImagePreviewModal = (props) => {
  const { previewVisible, previewTitle, previewImage } = props
  return (
    <Modal
      visible={previewVisible}
      title={previewTitle}
      footer={null}
      onCancel={props.handleClosePreviewWindow}
    >
      <img alt="preview" style={{ width: '100%' }} src={previewImage} />
    </Modal>
  )
}

ImagePreviewModal.propTypes = {
  previewTitle: PropTypes.string.isRequired,
  previewVisible: PropTypes.bool.isRequired,
  previewImage: PropTypes.string.isRequired,
  handleClosePreviewWindow: PropTypes.func.isRequired
}

export default ImagePreviewModal
