import express from 'express';
import * as UserService from '../services/user.service';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await UserService.getUsers();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({
            error: 'There was an error retrieving users information.',
            message: error
        });
    }
});

router.post('/', async (req, res) => {
    if (!req.body.username) {
        res.status(404).send({
            error: 'Username is missing from the request body.'
        });
    }
    try {
        const user = await UserService.addUser(
            req.body.username
        );
        res.status(201).send({
            message: 'A new user has been created successfully.',
            user
        });
    } catch (error) {
        res.status(500).send({
            error: 'There was an error creating the user.'
        });
    }
});

export default router;
