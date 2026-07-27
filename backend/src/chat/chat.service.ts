import { Injectable, NotFoundException } from '@nestjs/common';
import { ConversationRole } from '@prisma/client';
import { AiProviderService } from '../ai/providers/ai-provider.service';
import { PrismaService } from '../common/prisma.service';
import { StartConversationDto, ContinueConversationDto } from './dto/chat.dto';

type ChatJson = { reply: string; title?: string; suggestions?: string[] };
@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService, private ai: AiProviderService) {}
  async start(userId: string, dto: StartConversationDto) {
    const context = await this.context(userId);
    const result = await this.ai.generateJson<ChatJson>(`You are an expert AI career mentor. Use this user context: ${JSON.stringify(context)}. Reply in Markdown JSON as {"reply":"...","title":"...","suggestions":[...]}. User: ${dto.message}`);
    return this.prisma.conversation.create({ data: { userId, title: dto.title || result.title || 'Career mentor chat', messages: { create: [{ role: ConversationRole.USER, content: dto.message }, { role: ConversationRole.ASSISTANT, content: result.reply, metadata: { suggestions: result.suggestions ?? [] } }] } }, include: { messages: { orderBy: { createdAt: 'asc' } } } });
  }
  async continue(userId: string, id: string, dto: ContinueConversationDto) {
    const conversation = await this.prisma.conversation.findFirst({ where: { id, userId }, include: { messages: { orderBy: { createdAt: 'asc' }, take: 20 } } });
    if (!conversation) throw new NotFoundException('Conversation not found.');
    const context = await this.context(userId);
    const result = await this.ai.generateJson<ChatJson>(`Continue this career mentor conversation. User context: ${JSON.stringify(context)}. History: ${JSON.stringify(conversation.messages.map(m => ({ role: m.role, content: m.content })))}. Return JSON {"reply":"...","suggestions":[...]}. New user message: ${dto.message}`);
    await this.prisma.message.create({ data: { conversationId: id, role: ConversationRole.USER, content: dto.message } });
    await this.prisma.message.create({ data: { conversationId: id, role: ConversationRole.ASSISTANT, content: result.reply, metadata: { suggestions: result.suggestions ?? [] } } });
    return this.prisma.conversation.update({ where: { id }, data: { updatedAt: new Date() }, include: { messages: { orderBy: { createdAt: 'asc' } } } });
  }
  list(userId: string, search?: string) { return this.prisma.conversation.findMany({ where: { userId, ...(search ? { title: { contains: search, mode: 'insensitive' } } : {}) }, orderBy: { updatedAt: 'desc' }, include: { messages: { orderBy: { createdAt: 'asc' }, take: 1 } } }); }
  async get(userId: string, id: string) { const c = await this.prisma.conversation.findFirst({ where: { id, userId }, include: { messages: { orderBy: { createdAt: 'asc' } } } }); if (!c) throw new NotFoundException('Conversation not found.'); return c; }
  async remove(userId: string, id: string) { await this.get(userId, id); return this.prisma.conversation.delete({ where: { id } }); }
  private async context(userId: string) { const [user, careerProfile, careerAnalysis, skillGap, roadmap, resume, ats] = await Promise.all([this.prisma.user.findUnique({ where: { id: userId }, select: { fullName:true, education:true, university:true, currentSkills:true, careerGoal:true, experienceLevel:true } }), this.prisma.careerProfile.findUnique({ where: { userId } }), this.prisma.careerAnalysis.findFirst({ where:{userId}, orderBy:{createdAt:'desc'} }), this.prisma.skillGapAnalysis.findFirst({ where:{userId}, orderBy:{createdAt:'desc'} }), this.prisma.learningRoadmap.findFirst({ where:{userId}, orderBy:{createdAt:'desc'} }), this.prisma.resume.findFirst({ where:{userId}, orderBy:{createdAt:'desc'} }), this.prisma.resumeAnalysis.findFirst({ where:{userId}, orderBy:{createdAt:'desc'} })]); return { user, careerProfile, careerAnalysis, skillGap, roadmap, resume, ats }; }
}
