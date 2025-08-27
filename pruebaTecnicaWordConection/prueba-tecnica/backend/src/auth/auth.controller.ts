import { Controller, Post, Body, ValidationPipe, UseGuards, Get, Request, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, AdminRegisterDto } from '../dto/auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body(ValidationPipe) registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body(ValidationPipe) loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }

  @Post('register-admin')
  async registerAdmin(@Body(ValidationPipe) adminRegisterDto: AdminRegisterDto) {
    const secretCode = process.env.ADMIN_SECRET_CODE || 'defaultSecret';

    if (adminRegisterDto.adminSecretCode !== secretCode) {
      throw new BadRequestException('Código secreto inválido');
    }

    return this.authService.registerAdmin(adminRegisterDto);
  }
}
