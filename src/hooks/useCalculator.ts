import { useState } from 'react';
import { Operation, CalculationRequest } from '../types/calculator';
import { calculateResult } from '../services/calculatorApi';

export const useCalculator = () => {
  const [display, setDisplay] = useState('0');
  const [firstNumber, setFirstNumber] = useState<number>(0);
  const [operation, setOperation] = useState<Operation | null>(null);
  const [newNumber, setNewNumber] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleNumber = (num: string) => {
    setError(null);
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperation = async (op: Operation) => {
    setError(null);
    const currentNumber = parseFloat(display);

    if (op === '=') {
      if (operation) {
        const request: CalculationRequest = {
          firstNumber,
          secondNumber: currentNumber,
          operation,
          currentInput: display,
        };

        try {
          const response = await calculateResult(request);
          if (response.error) {
            setError(response.error);
            setDisplay('0');
          } else {
            setDisplay(response.result.toString());
          }
          setOperation(null);
          setNewNumber(true);
        } catch (err) {
          setError('Calculation error');
        }
      }
    } else {
      setFirstNumber(currentNumber);
      setOperation(op);
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setFirstNumber(0);
    setOperation(null);
    setNewNumber(true);
    setError(null);
  };

  return {
    display,
    error,
    handleNumber,
    handleOperation,
    handleClear,
  };
};