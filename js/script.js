/****************************************
*       User Agent App Validator        *
*                                       *
* -1. Get navigator UA if input is null *
* -2. Define Passing Criteria           *
* -3. Parse UA to usable objects        *
* -4. Compare is UA is compatible       *
* -5. return true or false              *
*                                       *
* @author: Matthew Heath                *
*     for: CubeSmart Dev Test           * 
*****************************************/



//create a contructor for the validation tests
var dataConstrants = function(pKID,browserName,versionNumber,greaterVersions) 
{
    this.pKID = pKID;
    this.browserName = browserName;
    this.versionNumber = versionNumber;
    this.greaterVersions = greaterVersions;
    
}

//passing validation against requirments
var passValidation1 = new dataConstrants(1, 'MSIE', 9, false);
var passValidation2 = new dataConstrants(2, 'MSIE', 10, false);
var passValidation3 = new dataConstrants(3, 'Chrome', 26, true);
var passValidation4 = new dataConstrants(4, 'Firefox', 22, true);


//clear the UI
init();

//function used to hide UI placeholders when app first starts
function init(){
    document.querySelector('.intro-divider').style.display = 'none';
    document.getElementById('j-decision').style.display = 'none';
    document.getElementById('j-reason').style.display = 'none';
    document.getElementById('j-result').style.display = 'none';
}

/*
 User Agents for testing

 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0)';
 'Mozilla/4.0 (compatible; MSIE 11.0; Windows NT 6.3; Trident/4.0)';
 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.3; Trident/4.0)';
 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.5; rv:10.0.1) Gecko/20100101 Firefox/10.0.1 SeaMonkey/2.7.1';
 'Mozilla/5.0 (Windows NT 6.3; WOW64; rv:48.0) Gecko/20100101 Firefox/48.0';
 'Opera/9.80 (X11; Linux i686; U; en) Presto/2.2.15 Version/10.10';

*/

//DOM event listener for  when the Check button is pressesd
document.getElementById('btnCheck').addEventListener('click', function(){
    //get userAgent from input
    var userAgent = document.getElementById('inputUABlock').value;
    
    //if no user agent is found, use the current browser
    if(userAgent === ''){
        userAgent = navigator.userAgent;        
    }   
    //call our checking function
    identifyBrowser(userAgent);

});
 
//This function recieves a userAgent string, reads the string parsing out
//and comparing the string against keys
//the parsed browser and version is compared against each compatibile version
//depending on the result, a decision is returned true or false
function identifyBrowser(userAgent) {
    
    //define regexps for parsing decisions
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
        
    //Number of characters to display of version
    var elements = 2;
        
        //loop through all the possible browser types
        for (browser in regexps){
            //while there still browsers to check
        while (re = regexps[browser].shift()){
              //if the user agent is found in the list
            if (m = userAgent.match(re)) {
                //parse the version out using elements to limit the version floating point
                version = (m[1].match(new RegExp('[^.]+(?:\.[^.]+){0,' + --elements + '}')))[0];
                //store the browser name in an object
                browserName = browser;
                //store the browser version
                bVersion = version;
  
            }
        }
    }
    
    //function that handles DOM manipulation for UI
    function displayUIResults(){
        document.querySelector('.intro-divider').style.display = 'block';
        document.getElementById('j-decision').style.display = 'inline';
        document.getElementById('j-reason').style.display = 'inline';
        document.getElementById('j-result').style.display = 'block';
        document.getElementById('j-result').textContent = ''+ browserName + ' ' + bVersion; 
    }
    
    //function for display results for the first condition
    function displayResult1(){
         
         decision = true;
         document.getElementById('j-decision').textContent = ''+decision;         
         document.getElementById('j-reason').textContent = 'Passed: valid browser and newer versions are supported.';        
         displayUIResults();
    }
    
       //function for display results for the second condition
    function displayResult2(){
                        
        decision = true;
        document.getElementById('j-decision').textContent = ''+decision;
        document.getElementById('j-reason').textContent = 'Passed: valid browser and versions match requirements';
        displayUIResults();
    
    }
    
    //function for display results for the third condition
    function displayResult3(){
    
        decision = false;
        document.getElementById('j-decision').textContent = ''+decision;                    
        document.getElementById('j-reason').textContent = 'Failed: valid browser but incorrect version';
        displayUIResults();
    }
    
       //function for display results for the fourth condition
    function displayResult4(){
                            
         decision = false;
         document.getElementById('j-decision').textContent = ''+decision;      
         document.getElementById('j-reason').textContent = 'Failed: valid browser, but outdated version';
         displayUIResults();
        
    }
    
    //function for display results for the final condition
    function displayResultFinal(){
                    
      decision = false;
      document.getElementById('j-decision').textContent = ''+decision;  
      document.getElementById('j-reason').textContent = 'Failed: Unsupported Browser';
      displayUIResults();
        
    }
        
   //First check for passing validation of user agent
        //if the two objects are equal
        if(browserName === passValidation1.browserName)
        {
            //checks that the version is greater or equal to eachother
            if(bVersion >= passValidation1.versionNumber){
                //if its version is aloud to be greater then the base requirment
                if(passValidation1.greaterVersions === true){
                   displayResult1();
                    
                 return decision;
            }
            //if its the same for MSIE two version are aloud but no versions above 
            else if(bVersion == passValidation1.versionNumber || bVersion == passValidation2.versionNumber){
                 displayResult2();
    
                 return decision;
            }
            else{
                 displayResult3();    
                
                return decision;
            }
        }          
         displayResult4();
        return decision;       
    }
    
 //Second check for passing validation of user agent
 //if the two objects are equal        
else if(browserName === passValidation2.browserName){
   
      if(bVersion >= passValidation2.versionNumber){
          
            //if its aloud to be greater then
            if(passValidation2.greaterVersions === true){
                
             displayResult1();
                
                return decision;
            }
            //if its the same 
           else if(bVersion == passValidation1.versionNumber || bVersion == passValidation2.versionNumber){
               
               displayResult2();
                
                return decision;
            }
            //then its not aloud to be more so false
            else{
                
                displayResult3();
                
                return decision;                
            }
        }
        displayResult4();
        return decision;
    
}
   //Third check for passing validation of user agent
   //if the two objects are equal 
        if(browserName === passValidation3.browserName)
        {
            if(bVersion >= passValidation3.versionNumber){
                //if its aloud to be greater then
                if(passValidation3.greaterVersions === true){
                displayResult1();
                    
                 return decision;
            }
            //if its the same 
            else if(bVersion === passValidation3.versionNumber){
                  displayResult2();
    
                 return decision;
            }
            else{
                   displayResult3();
                
                return decision;
            }
        }
         displayResult4(); 
         
        return decision;
       
    }
//Fourth check for passing validation of user agent
//if the two objects are equal         
else if(browserName === passValidation4.browserName){

      if(bVersion >= passValidation4.versionNumber){
            //if its aloud to be greater then
            if(passValidation4.greaterVersions === true){
                displayResult1();
         
                return decision;
            }
            //if its the same 
            else if(bVersion === passValidation4.versionNumber){
                displayResult2();
         
                return decision;
            }
            //then its not aloud to be more so false
            else{
               displayResult3();
                return decision;
            }
        }
         displayResult4();
         
          return decision;
}     
else {
    displayResultFinal();
    return decision;
    }
    
return decision;
}