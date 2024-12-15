import React from 'react';
import { Equal, Plus, Minus, X, Divide, Delete } from 'lucide-react';
import Button from './Button';
import { Operation } from '../../types/calculator';
import { buttonStyles } from '../../utils/styles';

interface KeypadProps {
  onNumberClick: (num: string) => void;
  onOperationClick: (op: Operation) => void;
  onClear: () => void;
}

const Keypad: React.FC<KeypadProps> = ({ onNumberClick, onOperationClick, onClear }) => (
  <div className="grid grid-cols-4 gap-2">
    <Button
      onClick={onClear}
      className={`${buttonStyles.base} ${buttonStyles.clear}`}
      icon={Delete}
    />
    <Button
      onClick={() => onOperationClick('/')}
      className={buttonStyles.operator}
      icon={Divide}
    />

    {[7, 8, 9].map((num) => (
      <Button
        key={num}
        onClick={() => onNumberClick(num.toString())}
        className={buttonStyles.number}
      >
        {num}
      </Button>
    ))}
    <Button
      onClick={() => onOperationClick('*')}
      className={buttonStyles.operator}
      icon={X}
    />

    {[4, 5, 6].map((num) => (
      <Button
        key={num}
        onClick={() => onNumberClick(num.toString())}
        className={buttonStyles.number}
      >
        {num}
      </Button>
    ))}
    <Button
      onClick={() => onOperationClick('-')}
      className={buttonStyles.operator}
      icon={Minus}
    />

    {[1, 2, 3].map((num) => (
      <Button
        key={num}
        onClick={() => onNumberClick(num.toString())}
        className={buttonStyles.number}
      >
        {num}
      </Button>
    ))}
    <Button
      onClick={() => onOperationClick('+')}
      className={buttonStyles.operator}
      icon={Plus}
    />

    <Button
      onClick={() => onNumberClick('0')}
      className={`${buttonStyles.number} col-span-2 w-auto`}
    >
      0
    </Button>
    <Button
      onClick={() => onNumberClick('.')}
      className={buttonStyles.number}
    >
      .
    </Button>
    <Button
      onClick={() => onOperationClick('=')}
      className={`${buttonStyles.operator} bg-green-500 hover:bg-green-600`}
      icon={Equal}
    />
  </div>
);