import { Router } from 'express';
import { validateData } from '../../middlewares/validationMiddleware';
import { createUserSchema, loginSchema, usersTable } from '../../db/usersSchema';
import bcrypt from 'bcryptjs';
import { db } from '../../db';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { rest } from 'lodash';
import bcript from 'bcryptjs';



const router = Router();

router.post('/register', validateData(createUserSchema), async (req, res) => {
    
    try {
        //console.log(req.cleanBody);
    const data = req.cleanBody;
    data.password = await bcrypt.hash(data.password, 10);
    const [user] = await db.insert(usersTable).values(data).returning();
    
    res.status(201).json(user);
    
   } catch (error) {
    
        res.status(500).json({"message": "Something was wrong"})
   }

    
    
})

router.post('/login', validateData(loginSchema), async (req, res) => {
    try {
        const { email, password } = req.cleanBody;
        
        const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email));

        if (!user) {
            res.status(401).json({ error: "Authentication failed" });
            return;
        }

        const matched = await bcrypt.compare(password, user.password);
        
        if (!matched) {
            res.status(401).json({ error : "Authentication failed" });
            return;
        }

        //Create a JWT token
        const token = jwt.sign({ userId: user.id, role: user.role }, 'your-secret', { expiresIn: '30d' });

        res.status(200).json({ user, token})

        console.log(email, password);
        
    } catch (error) {
        res.status(500).json({ "message": "Something was wrong" })
    }
})

export default router;