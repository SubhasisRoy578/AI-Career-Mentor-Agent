import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
@Injectable()
export class RequestLoggingInterceptor implements NestInterceptor { intercept(_context: ExecutionContext, next: CallHandler): Observable<unknown> { return next.handle(); } }
