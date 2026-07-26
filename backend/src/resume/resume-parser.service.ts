import { Injectable } from '@nestjs/common';

export type ParsedResume = { name?: string; email?: string; phone?: string; education: string[]; skills: string[]; experience: string[]; projects: string[]; certifications: string[]; languages: string[]; links: string[]; summary?: string };

@Injectable()
export class ResumeParserService {
  parse(buffer: Buffer): { text: string; data: ParsedResume } {
    const text = this.extractText(buffer);
    return { text, data: this.structure(text) };
  }

  private extractText(buffer: Buffer) {
    return buffer.toString('utf8').replace(/\0/g, ' ').replace(/[^\x09\x0A\x0D\x20-\x7E]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 30000);
  }

  private structure(text: string): ParsedResume {
    const lines = text.split(/(?<=\.)\s+|\n/).map((line) => line.trim()).filter(Boolean);
    const email = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0];
    const phone = text.match(/(?:\+?\d[\d\s().-]{7,}\d)/)?.[0];
    const links = Array.from(new Set(text.match(/https?:\/\/\S+|linkedin\.com\/\S+|github\.com\/\S+/gi) ?? []));
    const firstLine = lines.find((line) => line.length > 2 && line.length < 80 && !line.includes('@'));
    return {
      name: firstLine,
      email,
      phone,
      education: this.pick(lines, ['education', 'university', 'college', 'degree', 'bachelor', 'master']),
      skills: this.splitSkills(this.pick(lines, ['skills', 'technologies', 'tools']).join(', ')),
      experience: this.pick(lines, ['experience', 'intern', 'engineer', 'developer', 'worked', 'built']),
      projects: this.pick(lines, ['project', 'portfolio', 'github']),
      certifications: this.pick(lines, ['certification', 'certificate', 'certified']),
      languages: this.pick(lines, ['languages']).flatMap((line) => this.splitSkills(line)),
      links,
      summary: lines.slice(0, 3).join(' '),
    };
  }

  private pick(lines: string[], keywords: string[]) { return lines.filter((line) => keywords.some((keyword) => line.toLowerCase().includes(keyword))).slice(0, 12); }
  private splitSkills(value: string) { return Array.from(new Set(value.split(/[,•|]/).map((item) => item.replace(/skills:?|technologies:?|tools:?/i, '').trim()).filter((item) => item.length > 1))).slice(0, 40); }
}
