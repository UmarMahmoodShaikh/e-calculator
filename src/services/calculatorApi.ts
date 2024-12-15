import { CalculationRequest, CalculationResponse } from '../types/calculator';

export const calculateResult = async (
  request: CalculationRequest
): Promise<CalculationResponse> => {
  try {
    if (!request.operation || request.secondNumber === null) {
      return { result: Number(request.currentInput) };
    }

    let result: number;
    switch (request.operation) {
      case '+':
        result = request.firstNumber + request.secondNumber;
        break;
      case '-':
        result = request.firstNumber - request.secondNumber;
        break;
      case '*':
        result = request.firstNumber * request.secondNumber;
        break;
      case '/':
        if (request.secondNumber === 0) {
          throw new Error('Division by zero');
        }
        result = request.firstNumber / request.secondNumber;
        break;
      default:
        throw new Error('Invalid operation');
    }

    return { result };
  } catch (error) {
    return {
      result: 0,
      error: error instanceof Error ? error.message : 'Calculation error',
    };
  }
};