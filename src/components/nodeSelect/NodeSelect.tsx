import React, { useState, useRef, useEffect } from 'react'
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const selectedValuesRef = useRef<HTMLDivElement>(null)

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
        className={styles.selectedValues}
        onClick={handleToggleDropdown}
      >
        <span>
          {selectedValues.length === 0
            ? placeholder
            : selectedValues.join(', ')}
        </span>
        <span className={`arrow ${isDropdownOpen ? 'open' : ''}`}>&#9662;</span>
      </div>
      {isDropdownOpen && (
        <div ref={dropdownRef} className={styles.selectOptions}>
          {options.map((option) => (
            <label key={option.value} className={styles.selectOption}>
              <input
                type="checkbox"
                value={option.value}
                checked={selectedValues.includes(option.value)}
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
