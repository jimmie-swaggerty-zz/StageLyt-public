import React, { useState } from 'react'
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import axios from 'axios'

const UploaderDropzoneComp = (props) => {

const [imageData, setImageData] = useState([])

const handleChangeStatus = (files) => {
    console.log("files", files)
    const formData = new FormData();
    formData.append("profileImg", files.file);

    // formData.append("name", image.name);
    // console.log(image)
    // console.log(formData)

    axios
        .post(
            // `http://localhost:8080/api/images/profile/${profileid}`,
            `http://localhost:8080/api/image`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        )
        .then((res) => {
            // setImageData(res.data)
            console.log("results of submit", res);
        });
}

  
  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files) => { console.log(files.map(f => f.meta)) }
    return (
        <Dropzone
        onChangeStatus={handleChangeStatus}
        maxFiles={1}
        multiple={false}
        canCancel={false}
        inputContent="Drop A File"
        // onDragEvent={handleDragEvent}
        // onFileReceived={handleFileReceived}
        styles={{
          dropzone: { width: 400, height: 200 },
          dropzoneActive: { borderColor: 'green' },
        }}
      />


    )
}

export default UploaderDropzoneComp