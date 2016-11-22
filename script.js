/****************************************
*       User Agent App Validator        *
*                                       *
* -1. Get navigator UA if input is null *
*  2. Define Passing Criteria           *
*  3. Parse UA to usable objects        *
*  4. Compare is UA is compatible       *
*  5. return true or false              *
*                                       *
*                                       *
*****************************************/


//create a constructor to prototype valid versions of browsers


var dataConstrants = function(pKID,browserName,versionNumber,greaterVersions) 
{
    this.pKID = pKID;
    this.browserName = browserName;
    this.versionNumber = versionNumber;
    this.greaterVersions = greaterVersions;
    
}

var passCriteria1 = new dataConstrants(1, 'MSIE', 9, false);
var passCriteria2 = new dataConstrants(2, 'MSIE', 10.0, false);
var passCriteria3 = new dataConstrants(3, 'Chrome', 26, true);
var passCriteria4 = new dataConstrants(4, 'Firefox', 22, true);

//create the passing criteria to test against


function identifyBrowser(userAgent, elements) {

    
    var regexps = {
            'Chrome': [ /Chrome\/(\S+)/ ],
            'Firefox': [ /Firefox\/(\S+)/ ],
            'MSIE': [ /MSIE (\S+);/ ],
            'Opera': [
                /Opera\/.*?Version\/(\S+)/,     /* Opera 10 */
                /Opera\/(\S+)/                  /* Opera 9 and older */
            ],
            'Safari': [ /Version\/(\S+).*?Safari\// ]
        };
        
    var re, m, browser, version, decision;
    var browserName, bVersion;
 
    if (userAgent === undefined)
        userAgent = navigator.userAgent;
 
    if (elements === undefined)
        elements = 2;
    else if (elements === 0)
        elements = 1337;
 
    for (browser in regexps){
        while (re = regexps[browser].shift()){
            if (m = userAgent.match(re)) {
                version = (m[1].match(new RegExp('[^.]+(?:\.[^.]+){0,' + --elements + '}')))[0];
                browserName = browser;
                bVersion = version;
                console.log('browserName ' + browserName);
                console.log('bVersion ' + bVersion);
               //return browser + ' ' + version;
            }
        }
    }

console.log('browserName TEST ' + browserName);
console.log('bVersion TEST ' + bVersion);
//if the browserName equals the first criteria name
console.log('passCriteria1: ' + passCriteria1.browserName);
console.log('passCriteria1: ' + passCriteria1.versionNumber);
console.log('passCriteria2 version: ' + passCriteria2.versionNumber);
    
if(browserName === passCriteria1.browserName)
    {
        if(bVersion >= passCriteria1.versionNumber){
            //if its aloud to be greater then
            if(passCriteria1.greaterVersions === true){
                 console.log('Passed because correct browser and greater versions aloud');
                 return decision = true;
            }
            //if its the same 
            else if(bVersion === passCriteria1.versionNumber || bVersion === passCriteria2.versionNumber){  
                 console.log('Passed because  browser and  versions are the same');
                 return decision = true;
            }
            else{
                console.log('Failed because correct browser but wrong version');
                return decision = false;
            }
        }
        console.log('Failed because correct browser, outdated version');
        return decision = false;
    }
else if(browserName === passCriteria2.browserName){
    console.log('passCriteria2: ' + passCriteria2.browserName);
    console.log('passCriteria2: ' + passCriteria2.versionNumber);
      if(bVersion >= passCriteria2.versionNumber){
            //if its aloud to be greater then
            if(passCriteria2.greaterVersions === true){
                console.log('Passed because correct browser and greater versions aloud');
               return decision = true;
            }
            //if its the same 
           else if(bVersion === passCriteria1.versionNumber || bVersion === passCriteria2.versionNumber){
                console.log('Passed because  browser and  versions are the same');
                return decision = true;
            }
            //then its not aloud to be more so false
            else{
                console.log('Failed because correct browser but wrong version');
                return decision = false;
            }
        }
    console.log(' Failed because correct browser, outdated version');
    return decision = false;
}
else if(browserName === passCriteria3.browserName){
        console.log('passCriteria3: ' + passCriteria3.browserName);
        console.log('passCriteria3: ' + passCriteria3.versionNumber);
      if(bVersion >= passCriteria3.versionNumber){
            //if its aloud to be greater then
            if(passCriteria3.greaterVersions === true){
                console.log('Passed because correct browser and greater versions aloud');
                return decision = true;
            }
            //if its the same 
            else if(bVersion === passCriteria3.versionNumber){
                console.log('Passed because  browser and  versions are the same');
                return decision = true;
            }
            //then its not aloud to be more so false
            else{
                 console.log('Failed because correct browser but wrong version');
                return decision = false;
            }
        }
    console.log(' Failed because correct browser, outdated version');
    return decision = false;
}
else if(browserName === passCriteria4.browserName){
    console.log('passCriteria4: ' + passCriteria4.browserName);
    console.log('passCriteria4: ' + passCriteria4.versionNumber);
      if(bVersion >= passCriteria4.versionNumber){
            //if its aloud to be greater then
            if(passCriteria4.greaterVersions === true){
                console.log('Passed because correct browser and greater versions aloud');
                return decision = true;
            }
            //if its the same 
            else if(bVersion === passCriteria4.versionNumber){
                console.log('Passed because  browser and  versions are the same');
                return decision = true;
            }
            //then its not aloud to be more so false
            else{
                 console.log('Failed because correct browser but wrong version');
                return decision = false;
            }
        }
     console.log('Failed because correct browser, outdated version');
    return decision = false;
} 
else {
    console.log('Failed because no correct browser, no need to check version');
    return decision = false;
    }
    console.log('Final Decision: ' + decision);
    return decision;
}

var userAgent = navigator.userAgent;
console.log('User Agent: ' + userAgent);
var iEAgentF = 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0)';
var iEAgentPF = 'Mozilla/4.0 (compatible; MSIE 11.0; Windows NT 6.3; Trident/4.0)';
var iEAgentP = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.3; Trident/4.0)';
var fireFoxAgentF = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.5; rv:10.0.1) Gecko/20100101 Firefox/10.0.1 SeaMonkey/2.7.1';
var fireFoxAgentP = 'Mozilla/5.0 (Windows NT 6.3; WOW64; rv:48.0) Gecko/20100101 Firefox/48.0';
var operaAgent = 'Opera/9.80 (X11; Linux i686; U; en) Presto/2.2.15 Version/10.10';

console.log('This current browser, supported? ' + identifyBrowser(userAgent,2));
console.log('**************************************************** ');
console.log(' ');
console.log('This Internet Explorer 8.0, supported? ' + identifyBrowser(iEAgentF,2));
console.log('**************************************************** ');
console.log(' ');
console.log('Internet Explorer 11.0, supported? ' + identifyBrowser(iEAgentPF,2));
console.log('**************************************************** ');
console.log(' ');
console.log('Internet Explorer 10.0, supported? ' + identifyBrowser(iEAgentP,2));
console.log('**************************************************** ');
console.log(' ');
console.log('FireFox 10.0, supported? ' + identifyBrowser(fireFoxAgentF,2));
console.log('**************************************************** ');
console.log(' ');
console.log('FireFox 48.0, supported? ' + identifyBrowser(fireFoxAgentP,2));
console.log('**************************************************** ');
console.log(' ');
console.log('Opera 10.10, supported? ' + identifyBrowser(operaAgent,2));



