import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AiProviderService {
  private readonly logger = new Logger(AiProviderService.name);
  constructor(private readonly config: ConfigService) {}

  async generateJson<T>(prompt: string): Promise<T> {
    const provider = this.config.get<string>('AI_PROVIDER', 'openai').toLowerCase();
    const apiKey = this.config.get<string>('AI_API_KEY');
    if (!apiKey) throw new ServiceUnavailableException('AI provider is not configured.');
    try {
      if (provider === 'gemini') return this.callGemini<T>(prompt, apiKey);
      return this.callOpenAiCompatible<T>(prompt, apiKey);
    } catch (error) {
      this.logger.error('AI provider request failed', error instanceof Error ? error.stack : String(error));
      throw new ServiceUnavailableException('AI career analysis is temporarily unavailable.');
    }
  }

  private async callOpenAiCompatible<T>(prompt: string, apiKey: string): Promise<T> {
    const baseUrl = this.config.get<string>('AI_BASE_URL', 'https://api.openai.com/v1');
    const model = this.config.get<string>('AI_MODEL', 'gpt-4o-mini');
    const response = await fetch(`${baseUrl}/chat/completions`, { method: 'POST', headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ model, temperature: 0.2, response_format: { type: 'json_object' }, messages: [{ role: 'system', content: 'Return only valid JSON.' }, { role: 'user', content: prompt }] }) });
    if (!response.ok) throw new Error(`AI request failed with ${response.status}`);
    const payload = await response.json() as { choices?: { message?: { content?: string } }[] };
    return this.parse<T>(payload.choices?.[0]?.message?.content);
  }

  private async callGemini<T>(prompt: string, apiKey: string): Promise<T> {
    const model = this.config.get<string>('AI_MODEL', 'gemini-1.5-flash');
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseMimeType: 'application/json', temperature: 0.2 } }) });
    if (!response.ok) throw new Error(`Gemini request failed with ${response.status}`);
    const payload = await response.json() as { candidates?: { content?: { parts?: { text?: string }[] } }[] };
    return this.parse<T>(payload.candidates?.[0]?.content?.parts?.[0]?.text);
  }

  private parse<T>(content?: string): T {
    if (!content) throw new Error('AI response was empty');
    return JSON.parse(content) as T;
  }
}
