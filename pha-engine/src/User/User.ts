import bcrypt from 'bcrypt';

export class User {

    public id: number;
    public username: string;
    public password: string;
    public rememberMeToken: string;

    public async matchPassword (password: string) {
        return await bcrypt.compare(password, this.password);
    }
}