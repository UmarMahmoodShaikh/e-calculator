import React from 'react';
import Display from './Display';
import Keypad from './Keypad';
import { useCalculator } from '../../hooks/useCalculator';

const Calculator: React.FC = () => {
  const {
    display,
    error,
    handleNumber,
    handleOperation,
    handleClear,
  } = useCalculator();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-[360px]">
        <Display value={display} error={error} />
        <Keypad
          onNumberClick={handleNumber}
          onOperationClick={handleOperation}
          onClear={handleClear}
        />
      </div>
    </div>
  );
};

export default Calculator;