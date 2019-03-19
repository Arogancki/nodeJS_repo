import React, { useState } from 'react'
import styled from 'styled-components'
import { UserInputConsumer } from 'contextes/UserInput'
import { Button } from '@material-ui/core'
import CenteredModal from 'components/CenteredModal'

const P = styled.p`
    text-align: center;
    margin: 1rem;
`

const TextArea=styled.textarea`
  resize: none;
  height: 100%;
`

const Div = styled.div`
  display: flex;
  flex-flow: column;
  margin: 1rem;
  height: 80%;
  width: 80%;
  justify-content: space-around;
`

const hints = {
  untouched: [
    'Type your json', 
    'or upload it from a file'
  ],
  touched: [
    'Click outside the textarea to proceed', 
    'or delete your json and upload it from a file'
  ]
}

function UserInput(){
  const [typing, setTyping] = useState(false)

  const loadFile = (file) => {
    const fileReader = new FileReader()
    const fileLoading = new Promise((res, rej)=>{
      fileReader.onloadend = ()=>res(fileReader.result)
      fileReader.onabort = (err)=>rej(err)
      fileReader.onerror = (err)=>rej(err) 
    })
    fileReader.readAsText(file)
    return fileLoading
  }

  const handleTextChange=(e)=>
    ! typing
    ? setTyping(true)
    : e.target.value===""
    && setTyping(false)
    return (
      <UserInputConsumer>
      {context =>(
        <Div>
          <CenteredModal
            onRequestClose={context.clearError}
            content={context.error}
            isOpen={!!context.error}
          />
          <P>{typing ? hints.touched[0] : hints.untouched[0]}</P>
          <TextArea
            onChange={handleTextChange}
            onBlur={(e)=>e.target.value && 
              context.setJson(e.target.value)
            }
          />
          <P>{typing ? hints.touched[1] : hints.untouched[1]}</P>
          <input
            disabled={typing}
            accept=".json"
            id="json-in-button"
            type="file"
            style={{display: 'none'}}
            onChange={(e)=>context.setJson(loadFile(e.target.files[0]))}
          />
          <label htmlFor="json-in-button" style={{textAlign: 'center'}}>
            <Button variant="contained" component="span" disabled={typing}>
              Upload
            </Button>
          </label>
          </Div>
      )}
      </UserInputConsumer>
    )
}

export default UserInput
