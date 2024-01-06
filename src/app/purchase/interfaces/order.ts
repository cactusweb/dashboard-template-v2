import { User } from "src/app/tools/interfaces/user"
import { CryptoPaymentMethod } from "./crypto-payment-method"

type Created = 0;
type Success = 5;

export interface Order {
    Receipt: Record<any,any>,
    description: string,
    
    currency: 'RUB' | 'USD' | 'EUR',
    price: number,
    to_rub: number,

    payment_way: '' | 'Tinkoff' | 'Ameria' | 'Crypto' | 'Stripe'
    tinkoff: { terminal_key: string }
    crypto: CryptoPaymentMethod[]

    id: string
    
    email: string,
    user: string,

    status: Created|Success

    inviter: User | null
}