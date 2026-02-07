import { UserDto } from "../dto/user.dto";

export type UserStatus = 'idle' | 'playing' | 'getting' | 'waiting';

export type UserLogin = Pick<UserDto, 'id'> & { password: string };

export type UserPlayer = UserDto & { status: UserStatus }; 