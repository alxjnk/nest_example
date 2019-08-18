import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import { ConflictException, InternalServerErrorException, Logger } from "@nestjs/common";
import * as bcrypt from 'bcrypt';


@EntityRepository(User)
export class UserRepositry extends Repository<User> {
    private logger = new Logger('UserRepository')

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password, type } = authCredentialsDto;

        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt();;
        user.password = await this.hashPassword(password, user.salt)
        user.type = type;

        try {
            await user.save();
            this.logger.log(`User created ${JSON.stringify(authCredentialsDto)}`)
        } catch (e) {
            if (e.code === '23505') { //dupliacte uesrname
                throw new ConflictException('Username already exists')
            } else {
                throw new InternalServerErrorException();
            }
        }

    }

    async getUsers(): Promise<User[]> {
        const query = this.createQueryBuilder('user');
        return await query.getMany();
    }

    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const { username, password } = authCredentialsDto;
        const user = await this.findOne({ username })

        if (user && await user.validatePassword(password)) {
            return user.username
        } else {
            return null;
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt)
    }


}