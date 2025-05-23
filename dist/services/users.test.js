import usersRepository from '../repositories/users.js';
import { usersService } from './users.js';
jest.mock('../repositories/users.ts');
describe('UserService', () => {
    beforeAll(() => {
        const mockeduserData = {
            name: 'John',
            email: 'John@doe.com',
            role: 'ADMIN',
        };
        usersRepository.create = jest.fn().mockResolvedValue(mockeduserData);
    });
    it('should create a user and return a success message', async () => {
        expect(await usersService.createUser({
            name: 'John',
            email: 'John@doe.com',
            role: 'ADMIN',
        })).toEqual({
            user: { name: 'John', email: 'John@doe.com', role: 'ADMIN' },
            message: 'User created successfully',
        });
    });
});
