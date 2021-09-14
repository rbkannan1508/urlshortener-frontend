export const loadState = () => {
    try {
      const serialState = sessionStorage.getItem('state');
      if (serialState === null) {
        return undefined;
      }
      return JSON.parse(serialState);
    } catch (err) {
      return undefined;
    }
};

export const saveState = (state) => {
    try {
      const serialState = JSON.stringify(state);
      sessionStorage.setItem('state', serialState);
    } catch(err) {
        console.log(err);
    }
};

export const clearState = () => {
    try {
        sessionStorage.removeItem('state');
    } catch(err) {
        console.log(err);
    }
};