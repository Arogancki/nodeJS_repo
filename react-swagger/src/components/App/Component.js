import React from 'react'
import styled from 'styled-components'
import { backgroundColor, fontColor, fontFamily } from 'global'
import { UserInputProvider, UserInputConsumer } from 'contextes/UserInput'
import Header from 'components/Header'
import Frame from 'components/Frame'
import UserInput from 'components/UserInput'
import Row from 'components/Row'
import JsonContainer from 'components/JsonContainer'
import Validation from 'components/Validation'

const Wrapper = styled.div`
  background-color: ${backgroundColor};
  height: 100%;
  color: ${fontColor};
  font-family: ${fontFamily};
  display: flex;
  flex-flow: column;
`;

const ReturnButton = styled.div`
  padding: 1rem;
  cursor: pointer;
  z-index: 1;
  &:hover {
    background-color: ${fontColor};
    color: ${backgroundColor};
  }
  p {
    margin: 0;
  }
`

function App(){
    return (
      <Wrapper>
        <Header title="OpenAPI Swagger"/>
        <UserInputProvider>
          <UserInputConsumer>
            {context => (
              <Frame>
                {context.json 
                ? <Row>
                    <Validation
                      json={context.json}
                      validation={context.validation}
                      header={
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                          <ReturnButton onClick={context.clearJson}>
                            <p>X</p>
                          </ReturnButton>
                          <p style={{margin: '1rem'}}>Tree View</p>
                        </div>
                      }
                      style={{flex: '0.3'}}
                    />
                  <JsonContainer 
                    onChange={context.setJson}
                    style={{flex: "0.7"}}
                    src={context.json}/>
                </Row>
                : context.loading 
                ? <p style={{fontSize: '2rem'}}>...</p>
                : <UserInput/>
                }
              </Frame>
            )}
          </UserInputConsumer>
        </UserInputProvider>
      </Wrapper>
    )
}

export default App