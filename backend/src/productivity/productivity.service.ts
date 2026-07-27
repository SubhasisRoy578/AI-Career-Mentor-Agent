import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { GoalDto, JobDto, MilestoneDto, NotificationDto } from './dto/productivity.dto';
@Injectable()
export class ProductivityService{constructor(private prisma:PrismaService){}
createJob(userId:string,d:JobDto){return this.prisma.jobApplication.create({data:{...d,userId, appliedAt:d.appliedAt?new Date(d.appliedAt):undefined}})}
listJobs(userId:string,search?:string,status?:any){return this.prisma.jobApplication.findMany({where:{userId,...(status?{status}:{}),...(search?{OR:[{company:{contains:search,mode:'insensitive'}},{role:{contains:search,mode:'insensitive'}}]}:{})},orderBy:{updatedAt:'desc'}})}
async updateJob(userId:string,id:string,d:JobDto){await this.ownedJob(userId,id);return this.prisma.jobApplication.update({where:{id},data:{...d,appliedAt:d.appliedAt?new Date(d.appliedAt):undefined}})}
async deleteJob(userId:string,id:string){await this.ownedJob(userId,id);return this.prisma.jobApplication.delete({where:{id}})}
resources(type?:string){return this.prisma.careerResource.findMany({where:type?{type}:{},orderBy:{createdAt:'desc'}})}
createGoal(userId:string,d:GoalDto){return this.prisma.goal.create({data:{...d,userId,deadline:d.deadline?new Date(d.deadline):undefined}})}
listGoals(userId:string){return this.prisma.goal.findMany({where:{userId},include:{milestones:true},orderBy:{updatedAt:'desc'}})}
async updateGoal(userId:string,id:string,d:GoalDto){await this.ownedGoal(userId,id);return this.prisma.goal.update({where:{id},data:{...d,deadline:d.deadline?new Date(d.deadline):undefined},include:{milestones:true}})}
async deleteGoal(userId:string,id:string){await this.ownedGoal(userId,id);return this.prisma.goal.delete({where:{id}})}
async addMilestone(userId:string,goalId:string,d:MilestoneDto){await this.ownedGoal(userId,goalId);return this.prisma.goalMilestone.create({data:{...d,goalId,dueDate:d.dueDate?new Date(d.dueDate):undefined}})}
notifications(userId:string){return this.prisma.notification.findMany({where:{userId},orderBy:{createdAt:'desc'}})}
notify(userId:string,d:NotificationDto){return this.prisma.notification.create({data:{...d,userId,type:'SYSTEM',dueAt:d.dueAt?new Date(d.dueAt):undefined}})}
async readNotification(userId:string,id:string){const n=await this.prisma.notification.findFirst({where:{id,userId}});if(!n)throw new NotFoundException();return this.prisma.notification.update({where:{id},data:{read:true}})}
async ownedJob(userId:string,id:string){const x=await this.prisma.jobApplication.findFirst({where:{id,userId}});if(!x)throw new NotFoundException('Job application not found.');return x}
async ownedGoal(userId:string,id:string){const x=await this.prisma.goal.findFirst({where:{id,userId}});if(!x)throw new NotFoundException('Goal not found.');return x}}
