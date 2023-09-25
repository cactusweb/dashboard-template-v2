export type req = {
  url: string;
  method: 'GET' | 'POST' | 'DELETE' | 'PUT';
};

export const RyodanRequests: Record<string, req> = {
  getApplications: {
    url: '/applications',
    method: 'GET',
  },
  getApplicationById: {
    url: '/applications/:param',
    method: 'GET',
  },
  postApplication: {
    url: '/applications',
    method: 'POST',
  },

  getReports: {
    url: '/reports',
    method: 'GET',
  },
  getReportById: {
    url: '/reports/:param',
    method: 'GET',
  },
  postReport: {
    url: '/reports',
    method: 'POST',
  },
  putReport: {
    url: '/reports/:param',
    method: 'PUT',
  },

  getApplicationTargets: {
    url: '/applications/targets',
    method: 'GET',
  },

  getWallets: {
    url: '/metamask',
    method: 'GET',
  },

  deleteWallet: {
    url: '/metamask/:id',
    method: 'DELETE',
  },

  receiveWallets: {
    url: '/metamask',
    method: 'POST',
  },

  postFile: {
    url: '/file',
    method: 'POST',
  },
  deleteFile: {
    url: '/file',
    method: 'DELETE',
  },
};
