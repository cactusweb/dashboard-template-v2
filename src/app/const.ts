import { environment } from "src/environments/environment";

const ownerName: string = environment.ownerName;

export type req = {
    url: string,
    method: 'GET' | 'POST' | 'DELETE' | 'PUT'
};

type reqMap = Record< string, req >;

export const Requests: reqMap = {
    getUser: { url: `/@me`, method: 'GET' },

    getLicense: { url: `/license/${ownerName}`, method: 'GET' },
    resetLicense: { url: `/license/${ownerName}/reset`, method: 'GET' },
    
    getDrop: { url: `/drop/authenticate`, method: 'POST' },
    purchaseFree: { url: `/drop/:param/free`, method: 'POST' },
    postOrderEmail: { url: '/order/:param', method: 'PUT' },


    getReferral: { url: '/referral/authenticate', method: 'POST' },
    getReferralPrizes: { url: `/referral/${ownerName}`, method: 'GET' },


    joinServer: { url: `/license/${ownerName}/join-server`, method: 'GET' },

    bindLicense: { url: `/license/bind`, method: 'POST' },
    unbindLicense: { url: `/license/${ownerName}/unbind`, method: 'GET' },

    stopSub: { url: `/license/${ownerName}/subscription`, method: 'DELETE' },
    startSub: { url: `/license/${ownerName}/subscription`, method: 'GET' },
}