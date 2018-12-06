export const getBrowser = (state) => state.browser;



export const getLeads = (state) => state.leads;
export const getLeadsListFieldNames = (state) => state.leadsListFieldNames;
export const areLeadsLoaded = (state) => !!state.leads;
export const isLeadsLoadingInProgress = (state) => state.leadsLoadingStatus.loadingInProgress;
export const leadsLoadingErrorMessage = (state) => state.leadsLoadingStatus.loadingError;
export const isThereALeadsLoadingError = (state) => state.leadsLoadingStatus.uploadError !== null;





export const isACallInProgress = (state) => state.callParameters.callingLeads;
export const getMaxConcurrentCalls = (state) => state.callParameters.maxConcurrentCalls;
export const getLeadsIndexCursor = (state) => state.callParameters.leadsIndexCursor;
export const getLeadCallsInProgressInfo = (state) => state.callParameters.leadCallsInProgressInfo;





export const isUserSignedIn = (state) => state.signInStatus.signedIn;
export const isSignInInProgress = (state) => state.signInStatus.signInInProgress;
export const getUserIDToken = (state) => state.signInStatus.idToken;
export const getUserBasicProfile = (state) => state.signInStatus.basicProfile;





export const getAccessCode = (state) => state.clientInfo.accessCode;
export const getClientID = (state) => state.clientInfo.clientID;





export const getQueueStatus = (state) => state.queueState.status;





export const isNavDrawerModal = (state) => state.browser.lessThan.lgTablet;
export const isNavDrawerOpen = (state) => !isNavDrawerModal(state) || state.navDrawer.openInModalMode;





export const getAppNotificationState = state => state.appNotification;
