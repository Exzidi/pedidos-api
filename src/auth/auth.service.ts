import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuarioService } from '../modules/usuario/usuario.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const hash = await bcrypt.hash(dto.password, 10);
    const user = await this.usuarioService.create({
      ...dto,
      password: hash,
    });
    const { password: _password, ...result } = user;
    return result;
  }

  async validateUser(email: string, pass: string) {
    const user = await this.usuarioService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    const match = await bcrypt.compare(pass, user.password);
    if (!match) throw new UnauthorizedException('Credenciales inválidas');

    const { password: _password, ...result } = user;
    return result;
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto.email, dto.password);
    const payload = {
      sub: user.id,
      email: user.email,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
