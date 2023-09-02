import { LicenseActivations } from "./license-activations"
import { LicenseDs } from "./license-ds"
import { LicensePayment } from "./license-payment"
import { LicenseReferral } from "./license-referral"

export interface License {
    id: string,
    
    bought_at: number,
    created_at: number,
    expires_in: number,
    
    payment: LicensePayment,
    
    key: string,
    
    unbindable: boolean,

    activations: LicenseActivations

    type: 'renewal' | 'lifetime' | 'trial' | 'trial-renewal',

    discord: LicenseDs,

    referral: LicenseReferral | null,

    description: string,
}
