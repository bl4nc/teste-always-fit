const jwt = require('jsonwebtoken')

interface decodeResponseInterface {
    success: boolean
    data?: any
    message?: string | unknown
}
class JWT {

    async Encode(payload: any) {
        const token = await jwt.sign(payload, process.env.JWT_SECRET)
        return token
    }


    async Decode(token: string | undefined): Promise<decodeResponseInterface> {
        token = (token ?? '').replace('bearer','').replace('Bearer','').replace(' ','')
        try {
            const decode = await jwt.verify(token, process.env.JWT_SECRET)
            return {
                success: true,
                data: decode
            }
        } catch (error) {
            return {
                success: false,
                message: error
            }
        }
    }
}

export { JWT };