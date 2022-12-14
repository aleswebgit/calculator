import { useState } from 'react'
import { evaluate } from 'mathjs'
import './Calculator.css'

export const operators: string[] = ['+', '-', '*', '/']
export const rows: (number | string)[][] = [
  ['CE', 'C', 'DEL', '/'],
  [7, 8, 9, '*'],
  [4, 5, 6, '-'],
  [1, 2, 3, '+'],
  [0, '.', '=']
]

const Calculator = () => {
  type Value = string
  const [value, setValue] = useState<Value>('')
  const [error, setError] = useState<string>('')
  const [lastNumber, setLastNumber] = useState<string>('')

  const getLastNumber = (cell: string) => {
    let indexOfLastOperator: number = 0
    operators.forEach(operator => {
      const index = value.lastIndexOf(operator)
      if (index > indexOfLastOperator) {
        indexOfLastOperator = index
      }
    })

    indexOfLastOperator === 0
      ? setLastNumber(value + cell)
      : setLastNumber(value.substring(indexOfLastOperator + 1) + cell)
  }

  const createHandlerCell = (cell: Value) => {
    setError('')
    const signEqual: boolean = cell === '='
    const cellIsOperator: boolean = operators.includes(cell)
    const lastOfValue: Value = value[value.length - 1]
    const lastOfValueIsOperator: boolean = operators.includes(lastOfValue)

    getLastNumber(cell)

    if (signEqual && value === '') {
      setValue('')
      return setError('Error: Introduce an operation before clicking equal sign')
    }
    if (signEqual && lastOfValueIsOperator) {
      return setError('Error: Introduce an operation before clicking equal sign')
    }
    if (cell === '.' && (value === '' || lastOfValueIsOperator || lastOfValue === '.')) {
      return setError('Error: Introduce a number before add a decimal')
    }
    if (cell === '.' && lastNumber.includes('.')) {
      setError('Error: your number already has a decimal')
      return
    }
    if (cell === 'DEL') return setValue(value.slice(0, -1))
    if (cell === 'CE') return setValue('')
    if (cell === 'C' && lastOfValueIsOperator) return setValue(value.slice(0, -1))
    if (cell === 'C' && !lastOfValueIsOperator) {
      const valueWhitoutLastNumber: string = value.slice(0, -lastNumber.length)
      return setValue(valueWhitoutLastNumber)
    }
    if (cellIsOperator && lastOfValueIsOperator) {
      setValue(value.slice(0, -1) + cell)
      return
    }
    if (cellIsOperator && value === '') {
      return setError('Error: Introduce a number before add an operator')
    }
    signEqual ? setValue(evaluate(value).toString()) : setValue(value + cell)
  }

  return (
    <>
      <h1>Calculator</h1>
      <p className='error-message' role='error'>
        {error}
      </p>
      <div className="calculator">
        <input readOnly value={value} />
        <div role='grid' className='buttons'>
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} role='row'>
              {row.map(cell => (
                <button
                  onClick={() => createHandlerCell(cell.toString())}
                  key={cell}
                  role='cell'
                  className={cell === '=' ? 'equal' : ''}
                >
                  {cell}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
export default Calculator
