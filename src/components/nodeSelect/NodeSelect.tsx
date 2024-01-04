import React, { useState, useRef, useEffect } from 'react'
import {
  addNode,
  removeNode,
  setSelectedValues,
} from '../../redux/slices/nodeSlice'
import { useAppDispatch } from '../../redux/store'
import { SelectOption } from '../../types/interface'
import styles from './NodeSelect.module.scss'

interface NodeSelectProps {
  id: string
  options: SelectOption[]
  selectedValues: string[]
  placeholder?: string
}

const NodeSelect: React.FC<NodeSelectProps> = ({
  id,
  options,
  selectedValues,
  placeholder,
}) => {
  const dispatch = useAppDispatch()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const selectedValuesRef = useRef<HTMLDivElement>(null)

  const onChange = (str: string[]) => {
    if (
      selectedValues &&
      selectedValues.every((elem, index) => elem === str[index])
    ) {
      dispatch(addNode({ str, id }))
    } else {
      const differences: string = selectedValues
        .filter((item) => !str.includes(item))[0]
        .split(' ')[1]
      dispatch(removeNode(differences))
    }
  }

  const handleOptionClick = (value: string) => {
    const updatedSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value]

    dispatch(setSelectedValues({ id, updatedSelectedValues }))
    onChange(updatedSelectedValues)
  }

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      selectedValuesRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      !selectedValuesRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside, true)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true)
    }
  }, [])

  return (
    <div className={styles.selectContainer}>
      <div
        ref={selectedValuesRef}
        className={`${styles.selectedValues} ${isDropdownOpen ? 'open' : ''}`}
        onClick={handleToggleDropdown}
      >
        <span>
          {selectedValues.length === 0
            ? placeholder
            : selectedValues.join(', ')}
        </span>
      </div>
      {isDropdownOpen && (
        <div ref={dropdownRef} className={styles.selectOptions}>
          {options.map((option) => (
            <label key={option.value} className={styles.selectOption}>
              <input
                type="checkbox"
                value={option.value}
                checked={selectedValues.includes(option.value)}
                onChange={() => handleOptionClick(option.value)}
                className={styles.selectInput}
              />
              {option.label}
            </label>
          ))}
        </div>
      )}
    </div>
  )
}

export default NodeSelect
