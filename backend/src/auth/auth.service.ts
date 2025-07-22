import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: { role: UserRole; name: string; email: string; password: string }) {
    const { role, name, email, password } = data;
    if (!role || !name || !email || !password) {
      throw new BadRequestException('Missing required fields');
    }
    if (password.length < 8 || !/[A-Z]/.test(password) || !/\d/.test(password)) {
      throw new BadRequestException('Password must be at least 8 chars, 1 uppercase, 1 number');
    }
    const exists = await this.userRepository.findOne({ where: { email } });
    if (exists) throw new ConflictException('E-mail já cadastrado');
    const password_hash = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ role, name, email, password_hash });
    await this.userRepository.save(user);
    return this.generateTokens(user);
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Credenciais inválidas');
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) throw new UnauthorizedException('Credenciais inválidas');
    return this.generateTokens(user);
  }

  async refresh(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, { ignoreExpiration: false });
      const user = await this.userRepository.findOne({ where: { id: payload.sub } });
      if (!user) throw new UnauthorizedException();
      return this.generateTokens(user);
    } catch {
      throw new UnauthorizedException('Refresh token inválido');
    }
  }

  private generateTokens(user: User) {
    const payload = { sub: user.id, role: user.role, name: user.name, email: user.email };
    const token = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    return { token, refreshToken };
  }
}