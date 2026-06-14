export interface AIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AICompletionRequest {
  messages: AIMessage[];
  maxTokens?: number;
  temperature?: number;
  metadata?: Record<string, string>;
}

export interface AICompletionResponse {
  content: string;
  model?: string;
  usage?: { promptTokens: number; completionTokens: number };
}

export interface AIAdapter {
  readonly name: string;
  complete(request: AICompletionRequest): Promise<AICompletionResponse>;
  isAvailable(): boolean;
}

export class RuleBasedAIAdapter implements AIAdapter {
  readonly name = 'rule-based';

  isAvailable(): boolean {
    return true;
  }

  async complete(request: AICompletionRequest): Promise<AICompletionResponse> {
    const lastUser = [...request.messages].reverse().find((m) => m.role === 'user');
    return {
      content: `Rule-based response: TaskSetu recommends using structured checklists instead of open chat for "${lastUser?.content ?? 'your task'}".`,
      model: 'rule-based-v1',
    };
  }
}

export function createAIAdapter(_provider?: 'openai' | 'anthropic' | 'rule-based'): AIAdapter {
  return new RuleBasedAIAdapter();
}
