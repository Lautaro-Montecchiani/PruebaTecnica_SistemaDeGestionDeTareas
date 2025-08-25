import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User, UserRole } from '../entities/user.entity';
import { RegisterDto, LoginDto } from '../dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password } = registerDto;
    const existing = await this.userRepository.findOne({ where: { email } });
    if (existing) throw new BadRequestException('Email ya registrado');
    const hashed = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ email, password: hashed, role: UserRole.USER });
    const saved = await this.userRepository.save(user);
    const { password: _, ...result } = saved;
    return { user: result, token: this.jwtService.sign({ sub: saved.id, email: saved.email, role: saved.role }) };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) throw new UnauthorizedException('Credenciales inválidas');
    const { password: _, ...result } = user;
    return { user: result, token: this.jwtService.sign({ sub: user.id, email: user.email, role: user.role }) };
  }

  async validateUser(userId: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id: userId } });
  }
}
