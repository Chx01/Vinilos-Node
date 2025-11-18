import { z } from 'zod'

const bodySchema = z.object({
    nombre: z.string().nombre(),
    password: z.string().min(8),
})

export default  defineEventHandler(async 
    ( event ) => {
        const { nombre, password } = await readValidatedBody(event, bodySchema.parse)

        if( nombre === 'admin' && password === 'admin1234') {

            await setUserSession(event, {
                user: {
                    name: 'Cristian'
                },
            })
            return {}
        }
        throw createError({
            statusCode: 401,
            message: 'Bad credentials',
        })       
})