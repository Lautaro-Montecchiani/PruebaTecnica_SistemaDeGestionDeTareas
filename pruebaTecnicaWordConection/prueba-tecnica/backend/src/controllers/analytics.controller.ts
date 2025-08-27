import { Controller, Get, Query, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('analytics')
@UseGuards(JwtAuthGuard)
export class AnalyticsController {
  @Get('personal')
  getPersonalAnalytics(@Request() req: any, @Query('timeframe') timeframe: string) {
    // Datos de ejemplo, deberías reemplazar por lógica real
    return {
      personalStats: {
        total: 10,
        completed: 6,
        pending: 3,
        inProgress: 1,
        overdue: 0,
        completionRate: 60,
      },
    };
  }

  @Get('admin')
  getAdminAnalytics(@Request() req: any, @Query() query: any) {
    // Datos de ejemplo, deberías reemplazar por lógica real
    return {
      personalStats: {
        total: 20,
        completed: 15,
        pending: 3,
        inProgress: 2,
        overdue: 0,
        completionRate: 75,
      },
      // Puedes agregar más datos de equipos/usuarios aquí
    };
  }
}
