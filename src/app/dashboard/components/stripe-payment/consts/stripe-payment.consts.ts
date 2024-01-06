import { ReqMap } from 'src/app/tools/interfaces/req-map';
import { environment } from 'src/environments/environment';

const ownerName: string = environment.ownerName;

export const StripePaymentRequests: ReqMap = {
  getPortalLink: {
    url: `/license/${ownerName}/stripe-portal`,
    method: 'GET',
  },

  getCustomerCreatingLink: {
    url: `/license/${ownerName}/stripe/subscribe`,
    method: 'GET',
  },
};
