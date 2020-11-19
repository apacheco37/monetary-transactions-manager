import db from '../models';

const Users = db.users;

export const getUsers = async () => {
    return await Users.findAll();
}

export const addUser = async (username: string) => {
    return await Users.create({
        username
    });
}
