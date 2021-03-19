import React, { useEffect, useState } from 'react'
import { TextField, Button, makeStyles } from '@material-ui/core'
import { v4 as uuidv4 } from 'uuid' // eslint-disable-line import/no-extraneous-dependencies
import { FormTemplateProps } from '../types/FormTemplate.type'
import Section from './Section.component'

interface SectionInfo {
  title: string
  fields: Array<any>
  sectionId: string
}

const useStyles = makeStyles((theme) => ({
  addButton: {
    marginTop: '2em',
  },
}))

const FormTemplate: React.FC<FormTemplateProps> = (props) => {
  const classes = useStyles()
  const [formTitle, setTitle] = useState()
  const [formDescription, setDescription] = useState()
  const [sectionsState, setSections] = useState<Array<SectionInfo>>([])

  useEffect(() => {
    props.sendForm({
      title: formTitle,
      desc: formDescription,
      sections: sectionsState,
    })
  }, [formTitle, formDescription, sectionsState])

  const handleTitleChange = (event: { target: { value: any } }) => {
    setTitle(event.target.value)
  }

  const handleDescriptionChange = (event: { target: { value: any } }) => {
    setDescription(event.target.value)
  }

  const addSection = () => {
    setSections([
      ...sectionsState,
      { title: '', fields: [], sectionId: uuidv4() },
    ])
  }

  const getSectionState = (val: any): void => {
    const updatedSections: Array<SectionInfo> = [...sectionsState]
    const updatedIndex = sectionsState.findIndex(
      (section) => section.sectionId === val.sectionId
    )
    updatedSections[updatedIndex] = val
    setSections(updatedSections)
  }

  return (
    <div>
      <div>
        <TextField
          id='standard-basic'
          label='Form Template Title'
          inputProps={{ style: { fontSize: 48, fontWeight: 'lighter' } }}
          fullWidth
          onChange={handleTitleChange}
        />
      </div>
      <div>
        <TextField
          id='standard-basic'
          label='Form Template Description'
          fullWidth
          inputProps={{ style: { fontSize: 24 } }}
          onChange={handleDescriptionChange}
        />
      </div>
      <div>
        {sectionsState.map((section) => (
          <Section
            key={section.sectionId}
            title={section.title}
            sectionId={section.sectionId}
            sendData={getSectionState}
          />
        ))}
      </div>
      <Button
        color='primary'
        onClick={addSection}
        className={classes.addButton}
      >
        + Add Section
      </Button>
    </div>
  )
}

export default FormTemplate
