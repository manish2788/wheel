class FeatureFlag {
  constructor() {}
  /**
   * @returns {Promise<Object>} A promise that resolves to an object containing feature flags.
   */
  fetchAllFeatures() {
    return new Promise(resolve => {
      const sampleFeatures = {
        "extended-summary": true,
        "feedback-dialog": false
      };
      setTimeout(resolve, 100, sampleFeatures);
    }); 
  }
  /**
   * 
   * @param {string} featureName 
   * @returns {Promise<boolean>} A promise that resolves to the feature state (true/false).
   */
  getFeatureState(featureName) {
    const featurePromise = new Promise((resolve, reject) => {      
      this.fetchAllFeatures().then((result) => {
        let featureState = result[featureName];
        if(featureState !== undefined) {
          resolve(featureState);
        }
        else {
          reject("Feature not found");
        }
      }).catch(err => {
        reject("Error fetching features!!");        
      });
    })
    return featurePromise;
  }
}

const featureFlag = new FeatureFlag();

featureFlag.getFeatureState("extended-summary").then(function (isEnabled) {
   console.log(isEnabled);   
}).catch(err => {
  console.log(err);
});