import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import App from '../src/App'
import Calculator, { operators } from '../src/components/Calculator'

const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

describe('Calculator', () => {
  afterEach(cleanup)

  it('should render', () => {
    render(<Calculator />)
  })

  it('should render title correctly', () => {
    render(<Calculator />)
    screen.getByText('Calculator')
  })

  it('should render in App component', () => {
    render(<App />)
    screen.getByText('Calculator')
  })

  it('should render numbers', () => {
    render(<Calculator />)
    numbers.forEach(number => screen.getByText(number))
  })

  it('should render 5 rows', () => {
    render(<Calculator />)
    const rows = screen.getAllByRole('row')
    expect(rows).toHaveLength(5)
  })

  it('should render operators', () => {
    render(<Calculator />)
    operators.forEach(operator => screen.getByText(operator))
  })

  it('should render equal sign', () => {
    render(<Calculator />)
    screen.getByText('=')
  })

  it('should render dot for decimal', () => {
    render(<Calculator />)
    screen.getByText('.')
  })

  it('should render an input', () => {
    render(<Calculator />)
    screen.getByRole('textbox')
  })

  it('should input is readOnly', () => {
    render(<Calculator />)
    const input = screen.getByRole('textbox')
    expect(input.getAttribute('readOnly')).not.toBe(null)
  })

  it('should render DEL button', () => {
    render(<Calculator />)
    screen.getByText('DEL')
  })

  it('should delete last character when click on DEL', () => {
    render(<Calculator />)
    const five = screen.getByText(5)
    const dot = screen.getByText('.')
    const del = screen.getByText('DEL')
    const input: HTMLInputElement = screen.getByRole('textbox')

    fireEvent.click(five)
    fireEvent.click(dot)
    fireEvent.click(del)
    expect(input.value).toBe('5')
  })

  it('should render CE button', () => {
    render(<Calculator />)
    screen.getByText('CE')
  })

  it('should delete all characters when click on CE', () => {
    render(<Calculator />)
    const five = screen.getByText(5)
    const dot = screen.getByText('.')
    const ce = screen.getByText('CE')
    const input: HTMLInputElement = screen.getByRole('textbox')

    fireEvent.click(five)
    fireEvent.click(dot)
    fireEvent.click(ce)
    expect(input.value).toBe('')
  })

  it('should input show value after user clicking a number', () => {
    render(<Calculator />)
    const one = screen.getByText('1')
    const input: HTMLInputElement = screen.getByRole('textbox')

    fireEvent.click(one)
    expect(input.value).toBe('1')
  })

  it('should input show value after user clicking several numbers', () => {
    render(<Calculator />)
    const one = screen.getByText('1')
    const two = screen.getByText('2')
    const three = screen.getByText('3')
    const input: HTMLInputElement = screen.getByRole('textbox')

    fireEvent.click(one)
    fireEvent.click(two)
    fireEvent.click(three)
    expect(input.value).toBe('123')
  })

  it('should input show value after user clicking a numbers and operator', () => {
    render(<Calculator />)
    const one = screen.getByText('1')
    const two = screen.getByText('2')
    const plus = screen.getByText('+')
    const input: HTMLInputElement = screen.getByRole('textbox')

    fireEvent.click(one)
    fireEvent.click(two)
    fireEvent.click(plus)
    fireEvent.click(two)
    expect(input.value).toBe('12+2')
  })

  it('should return a result after clicking equal sign', () => {
    render(<Calculator />)
    const one = screen.getByText('1')
    const two = screen.getByText('2')
    const plus = screen.getByText('+')
    const equal = screen.getByText('=')
    const input: HTMLInputElement = screen.getByRole('textbox')

    fireEvent.click(one)
    fireEvent.click(two)
    fireEvent.click(plus)
    fireEvent.click(two)
    fireEvent.click(equal)
    expect(input.value).toBe('14')
  })

  it('should change operator after click inmediately other operator', () => {
    render(<Calculator />)
    const seven = screen.getByText('7')
    const eight = screen.getByText('8')
    const plus = screen.getByText('+')
    const minus = screen.getByText('-')
    const input: HTMLInputElement = screen.getByRole('textbox')

    fireEvent.click(seven)
    fireEvent.click(eight)
    fireEvent.click(plus)
    fireEvent.click(minus)
    expect(input.value).toBe('78-')
  })

  it('render a error message box', () => {
    render(<Calculator />)
    screen.getByRole('error')
  })

  it('should show error message when user click equal sign without input', () => {
    render(<Calculator />)
    const equal = screen.getByText('=')
    const error: HTMLInputElement = screen.getByRole('error')

    fireEvent.click(equal)
    expect(error.textContent).toBe('Error: Introduce an operation before clicking equal sign')
  })

  it('should clean error message when user click a cell', () => {
    render(<Calculator />)
    const equal = screen.getByText('=')
    const five = screen.getByText('5')
    const error: HTMLInputElement = screen.getByRole('error')

    fireEvent.click(equal)
    fireEvent.click(five)
    expect(error.textContent).toBe('')
  })

  it('should show error message when user click equal sign with incomplete operation', () => {
    render(<Calculator />)
    const five = screen.getByText('5')
    const plus = screen.getByText('+')
    const equal = screen.getByText('=')
    const error: HTMLInputElement = screen.getByRole('error')

    fireEvent.click(five)
    fireEvent.click(plus)
    fireEvent.click(equal)
    expect(error.textContent).toBe('Error: Introduce an operation before clicking equal sign')
  })

  it('should show error message when click dot without number before', () => {
    render(<Calculator />)
    const dot = screen.getByText('.')
    const error: HTMLInputElement = screen.getByRole('error')

    fireEvent.click(dot)
    expect(error.textContent).toBe('Error: Introduce a number before add a decimal')
  })

  it('should show error message when click dot after a dot or operator', () => {
    render(<Calculator />)
    const five = screen.getByText('5')
    const dot = screen.getByText('.')
    const error: HTMLInputElement = screen.getByRole('error')

    fireEvent.click(five)
    fireEvent.click(dot)
    fireEvent.click(dot)
    expect(error.textContent).toBe('Error: Introduce a number before add a decimal')
  })

  it('should show error message when click dot after a dot or operator', () => {
    render(<Calculator />)
    const five = screen.getByText('5')
    const dot = screen.getByText('.')
    const plus = screen.getByText('+')
    const error: HTMLInputElement = screen.getByRole('error')

    fireEvent.click(five)
    fireEvent.click(plus)
    fireEvent.click(dot)
    expect(error.textContent).toBe('Error: Introduce a number before add a decimal')
  })

  it('should save last number to check if already has a dot and show error', () => {
    render(<Calculator />)
    const six = screen.getByText('6')
    const dot = screen.getByText('.')
    const error: HTMLInputElement = screen.getByRole('error')

    fireEvent.click(six)
    fireEvent.click(dot)
    fireEvent.click(six)
    fireEvent.click(dot)
    expect(error.textContent).toBe('Error: your number already has a decimal')
  })

  it('should save last number to check if already has a dot and show error after operator', () => {
    render(<Calculator />)
    const six = screen.getByText('6')
    const three = screen.getByText('3')
    const dot = screen.getByText('.')
    const plus = screen.getByText('+')
    const error: HTMLInputElement = screen.getByRole('error')

    fireEvent.click(six)
    fireEvent.click(plus)
    fireEvent.click(three)
    fireEvent.click(dot)
    fireEvent.click(six)
    fireEvent.click(dot)
    expect(error.textContent).toBe('Error: your number already has a decimal')
  })

  it('should render C button', () => {
    render(<Calculator />)
    screen.getByText('C')
  })

  it('should clean last number of input when click C button', () => {
    render(<Calculator />)
    const six = screen.getByText('6')
    const three = screen.getByText('3')
    const plus = screen.getByText('+')
    const c = screen.getByText('C')
    const input: HTMLInputElement = screen.getByRole('textbox')

    fireEvent.click(six)
    fireEvent.click(plus)
    fireEvent.click(three)
    fireEvent.click(c)
    expect(input.value).toBe('6+')
  })

  it('should only clean operator on click C if last value is operator', () => {
    render(<Calculator />)
    const two = screen.getByText('2')
    const plus = screen.getByText('+')
    const c = screen.getByText('C')
    const input: HTMLInputElement = screen.getByRole('textbox')

    fireEvent.click(two)
    fireEvent.click(plus)
    fireEvent.click(c)
    expect(input.value).toBe('2')
  })

  it('should show error when click operator with no number before', () => {
    render(<Calculator />)
    const plus = screen.getByText('+')
    const error: HTMLInputElement = screen.getByRole('error')

    fireEvent.click(plus)
    expect(error.textContent).toBe('Error: Introduce a number before add an operator')
  })
})
