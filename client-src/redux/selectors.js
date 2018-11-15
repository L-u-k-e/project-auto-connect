export const getBrowser = (state) => state.browser;



export const getLeads = (state) => state.leads;
export const getLeadsListFieldNames = (state) => state.leadsListFieldNames;
export const areLeadsLoaded = (state) => !!state.leads;
export const isLeadsLoadingInProgress = (state) => state.leadsLoadingStatus.loadingInProgress;
export const leadsLoadingErrorMessage = (state) => state.leadsLoadingStatus.loadingError;
export const isThereALeadsLoadingError = (state) => state.leadsLoadingStatus.uploadError !== null;



export const isUserSignedIn = (state) => state.signInStatus.signedIn;




export const isNavDrawerModal = (state) => state.browser.lessThan.lgTablet;
export const isNavDrawerOpen = (state) => !isNavDrawerModal(state) || state.navDrawer.openInModalMode;
