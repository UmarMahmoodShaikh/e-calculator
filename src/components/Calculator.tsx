import React, { useState } from 'react';
import { Equal, Plus, Minus, X, Divide, Delete } from 'lucide-react';
import { Operation, CalculationRequest } from '../types/calculator';
import { calculateResult } from '../services/calculatorApi';

const Calculator: React.FC = () => {
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

  const buttonClass = "w-16 h-16 m-1 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-xl font-semibold transition-colors";
  const operatorClass = "w-16 h-16 m-1 rounded-full bg-orange-400 hover:bg-orange-500 text-white flex items-center justify-center transition-colors";

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-[360px]">
        <div className="bg-gray-100 p-4 rounded-xl mb-4">
          <div className="text-right text-3xl font-bold text-gray-800 h-12 overflow-hidden">
            {display}
          </div>
          {error && (
            <div className="text-right text-red-500 text-sm mt-1">{error}</div>
          )}
        </div>

        <div className="grid grid-cols-4 gap-2">
          <button onClick={handleClear} className={`${buttonClass} col-span-3 w-auto bg-red-400 hover:bg-red-500 text-white`}>
            <Delete className="w-6 h-6" />
          </button>
          <button onClick={() => handleOperation('/')} className={operatorClass}>
            <Divide className="w-6 h-6" />
          </button>

          {[7, 8, 9].map((num) => (
            <button key={num} onClick={() => handleNumber(num.toString())} className={buttonClass}>
              {num}
            </button>
          ))}
          <button onClick={() => handleOperation('*')} className={operatorClass}>
            <X className="w-6 h-6" />
          </button>

          {[4, 5, 6].map((num) => (
            <button key={num} onClick={() => handleNumber(num.toString())} className={buttonClass}>
              {num}
            </button>
          ))}
          <button onClick={() => handleOperation('-')} className={operatorClass}>
            <Minus className="w-6 h-6" />
          </button>

          {[1, 2, 3].map((num) => (
            <button key={num} onClick={() => handleNumber(num.toString())} className={buttonClass}>
              {num}
            </button>
          ))}
          <button onClick={() => handleOperation('+')} className={operatorClass}>
            <Plus className="w-6 h-6" />
          </button>

          <button onClick={() => handleNumber('0')} className={`${buttonClass} col-span-2 w-auto`}>
            0
          </button>
          <button onClick={() => handleNumber('.')} className={buttonClass}>
            .
          </button>
          <button onClick={() => handleOperation('=')} className={`${operatorClass} bg-green-500 hover:bg-green-600`}>
            <Equal className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;