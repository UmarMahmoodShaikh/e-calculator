export type Operation = '+' | '-' | '*' | '/' | '=';

export interface CalculationRequest {
  firstNumber: number;
  secondNumber: number | null;
  operation: Operation | null;
  currentInput: string;
}

export interface CalculationResponse {
  result: number;
  error?: string;
}