import { initialOptions } from '../mock/options'
import { IOption } from '../types/interface'

export const modifyOptions = (str?: string): IOption[] => {
  if (!str) {
    return initialOptions
  }

  const modifiedOptions: IOption[] = initialOptions.map((option, index) => {
    return {
      ...option,
      value: `Варіант ${str}-${index + 1}`,
      label: `Варіант ${str}-${index + 1}`,
    }
  })

  return modifiedOptions
}
