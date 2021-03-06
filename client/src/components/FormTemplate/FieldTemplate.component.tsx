import React, { useState, useEffect } from 'react'
import {
  MenuItem,
  TextField,
  Select,
  InputLabel,
  FormControl,
  makeStyles,
} from '@material-ui/core'
import { FieldProps } from '../../types/Field.type'
import TextInput from '../questions/TextInput.component'
import NumInput from '../questions/NumInput.component'
import TFInput from '../questions/TFInput.component'
import MCInput from '../questions/MCInput.component'
import CBInput from '../questions/CBInput.component'

const useStyles = makeStyles((theme) => ({
  centeredRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  fieldBox: {
    display: 'flex',
    flexDirection: 'column',
    border: '2px solid #828282',
    borderRadius: theme.spacing(2),
    padding: theme.spacing(2),
  },
  dropdown: {
    width: '20%',
    minWidth: '160px',
    marginTop: theme.spacing(1),
  },
  fieldTitle: {
    marginRight: theme.spacing(3),
  },
}))

const FieldTemplate: React.FC<FieldProps> = (props) => {
  const classes = useStyles()

  const { fieldData } = props

  const [jsonState, setJson] = useState({
    title: fieldData ? fieldData.title : '',
    type: fieldData ? fieldData.type : '',
    response: fieldData ? fieldData.response : '',
    options: fieldData ? fieldData.options : [''],
  })

  useEffect(() => {
    const { fieldID: id } = props
    props.sendData({
      ...jsonState,
      fieldID: id,
    })
  }, [jsonState])

  const handleTypeChange = (event: { target: { value: any } }) => {
    setJson((prevState) => {
      return {
        ...prevState,
        type: event.target.value,
        options: [''],
        response: '',
      }
    })
  }

  const handleTitleChange = (event: { target: { value: any } }) => {
    setJson((prevState) => {
      return {
        ...prevState,
        title: event.target.value,
      }
    })
  }

  const renderDropdown = () => {
    return (
      <FormControl className={classes.dropdown}>
        <InputLabel>Type</InputLabel>
        <Select
          data-cy='formMenuItemSelector'
          value={jsonState.type}
          onChange={handleTypeChange}
        >
          <MenuItem data-cy='formMenuItemText' value='TEXT'>
            Text
          </MenuItem>
          <MenuItem data-cy='formMenuItemInt' value='INT'>
            Integer
          </MenuItem>
          <MenuItem data-cy='formMenuItemMC' value='MC'>
            Multiple Choice
          </MenuItem>
          <MenuItem data-cy='formMenuItemCB' value='CB'>
            Checkbox
          </MenuItem>
          <MenuItem data-cy='formMenuItemTF' value='TF'>
            True/False
          </MenuItem>
        </Select>
      </FormControl>
    )
  }

  const getInputState = (val: any) => {
    const hasOption = (json: { type: string }) => {
      return json.type === 'MC' || json.type === 'CB'
    }

    setJson((prevState) => {
      return {
        ...prevState,
        response: val.response,
        options: hasOption(jsonState) ? val.options : [''],
      }
    })
  }

  const renderQuestion = () => {
    switch (jsonState.type) {
      case 'TEXT':
        return <TextInput enabled={false} sendResponse={getInputState} />
      case 'INT':
        return <NumInput enabled={false} sendResponse={getInputState} />
      case 'MC':
        return (
          <MCInput
            sendResponse={getInputState}
            enabled={false}
            optionsData={fieldData ? fieldData.options : ['']}
          />
        )
      case 'CB':
        return (
          <CBInput
            sendResponse={getInputState}
            enabled={false}
            optionsData={fieldData ? fieldData.options : ['']}
          />
        )
      case 'TF':
        return <TFInput enabled={false} sendResponse={getInputState} />
      default:
        return ''
    }
  }

  return (
    <div data-cy='fieldBox' className={classes.fieldBox}>
      <div className={classes.centeredRow}>
        <TextField
          data-cy='titleTextField'
          label='Field Title'
          value={jsonState.title}
          onChange={handleTitleChange}
        />
        <div data-cy='fieldDropdown'>{renderDropdown()}</div>
      </div>
      <div data-cy='fieldQuestion'>{renderQuestion()}</div>
    </div>
  )
}

export default FieldTemplate
