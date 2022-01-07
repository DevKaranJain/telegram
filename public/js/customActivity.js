define([
    'postmonger'
], function(
    Postmonger
) {
    'use strict';
    console.log("in the custom activity ");
    var connection = new Postmonger.Session();
    var payload = {};
    var lastStepEnabled = false;
    var steps = [ // initialize to the same value as what's set in config.json for consistency
        { "label": "Enter Auth Token", "key": "step1" },
        { "label": "Create SMS Message", "key": "step2" }
        
    ];
    var currentStep = steps[0].key;

    $(window).ready(onRender);
    
    var eventDefinitionKey;
    var keyArray = [];
    var phoneArray = [];
    var messengerArray = [];
    var selectedPhone; 
    var phoneArray2 = [];

    connection.on('initActivity', initialize);
    connection.on('requestedTokens', onGetTokens);
    connection.on('requestedEndpoints', onGetEndpoints);

    connection.on('clickedNext',  onClickedNext);
    connection.on('clickedBack', onClickedBack);
    connection.on('gotoStep', onGotoStep);
    // connection.on('getvalue', getvalues);

    connection.on('requestedInteraction', function(settings)
    {
        eventDefinitionKey = settings.triggers[0].metaData.eventDefinitionKey;
        console.log( "eventDefinitionKey----->" + eventDefinitionKey);
    });

    connection.on('requestedSchema', function (data) {
   // save schema
        console.log('*** Schema ***', JSON.stringify(data['schema']));
        var attributeArray = data.schema ;
        console.log("Data schema2   " + data.schema);
        console.log("Array of arrtibutes" +  attributeArray);
       for(var attArray in attributeArray)
        {
            console.log(attArray);
            var key1 = attributeArray[attArray].key;
            var phoneValue = attributeArray[attArray].type;
           // if(phoneValue == 'Text'){
             //   messengerArray.push(key1);
            //}
            //if(phoneValue == 'Name')
           // {
           //   phoneArray.push(key1);  
            //}

            keyArray.push(key1);
           
        }
        
        
        console.log("Key Array----------->" + keyArray);
        console.log("Phone Array----------->" + phoneArray);
        console.log("Messenger Array----------->" + messengerArray);
        
       // console.log(document.getElementById('recipient').innerHTML);
       // console.log(document.getElementById('recipient1').innerHTML);
      //  console.log(document.getElementById('authToken').innerHTML);
        
        keyArray.forEach(editSelect);
        phoneArray.forEach(editPhone);
        messengerArray.forEach(editMessenger);
        console.log('calling function to set value');
        //setKeyVal(keyArray);
        console.log('done');
        function editMessenger(item, index){
            var phone = item;
            var res1 = phone.split(".");
            document.getElementById('recipient1').innerHTML +=  '<option value = "{{' + phone + '}}">'+ res1[2] +'</option>' ; 
   
        }
        function editPhone(item, index)
        {
            var phone = item;
            var res1 = phone.split(".");
            document.getElementById('recipient').innerHTML +=  '<option value = "{{' + phone + '}}">'+ res1[2] +'</option>' ; 
        }

        function editSelect(item, index)
        {
           var keyValue = item ;  
         
            var res = keyValue.split(".");
            document.getElementById('authToken').innerHTML +=  '<option value = "{{' + keyValue + '}}">'+ res[2] +'</option>' ; 
            var keyValue2 = '{{' + keyValue + '}}';
            phoneArray2.push(keyValue2);
        }
        // console.log(document.getElementById('ps').innerHTML);
        //document.getElementById("recipient").value = selectedPhone;
        if(phoneArray2.includes(selectedPhone) == true)
        {
          //document.getElementById("recipient").value = selectedPhone;
        }
            
        
      

            
});


    
    function onRender() {
        // JB will respond the first time 'ready' is called with 'initActivity'
        connection.trigger('ready');
        connection.trigger('requestTokens');
        connection.trigger('requestEndpoints');
        connection.trigger('requestInteraction');
        connection.trigger('requestSchema');
    }

  function initialize(data) {
        console.log("Initializing data data: "+ JSON.stringify(data));
        if (data) {
            payload = data;
        }    

        var hasInArguments = Boolean(
            payload['arguments'] &&
            payload['arguments'].execute &&
            payload['arguments'].execute.inArguments &&
            payload['arguments'].execute.inArguments.length > 0
         );

        var inArguments = hasInArguments ? payload['arguments'].execute.inArguments : {};

        console.log('Has In arguments: '+JSON.stringify(inArguments));

        $.each(inArguments, function (index, inArgument) {
            $.each(inArgument, function (key, val) {

                if (key === 'accountSid') {
                    $('#accountSID').val(val);
                }

                if (key === 'authToken') {
                    $('#authToken').val(val);
                }

                 if (key === 'messagingService') {
                     $('#messagingService').val(val);
                 }

                if (key === 'body') {
                    //$('#messageBody').val(val);
                    $('#messageBody').val(val);
                }                                                               

            })
        });

        connection.trigger('updateButton', {
            button: 'next',
            text: 'next',
            visible: true
        });

    }

    function onGetTokens (tokens) {
        // Response: tokens = { token: <legacy token>, fuel2token: <fuel api token> }
        console.log("Tokens function: "+JSON.stringify(tokens));
        //authTokens = tokens;
    }

    function onGetEndpoints (endpoints) {
         //Response: endpoints = { restHost: <url> } i.e. "rest.s1.qa1.exacttarget.com"
        console.log("Get End Points function: "+JSON.stringify(endpoints));
    }
    function onClickedNext (){
                 var errorSlds = '<div class="slds-notify slds-notify_alert slds-theme_alert-texture slds-theme_error" role="alert"><span class="slds-assistive-text">error</span><span class="slds-icon_container slds-icon-utility-error slds-m-right_x-small" title="Description of icon when needed"><svg class="slds-icon slds-icon_x-small" aria-hidden="true"><use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#error"></use></svg></span><h2>Please choose correct userId </h2> <div class="slds-notify__close"><button class="slds-button slds-button_icon slds-button_icon-small slds-button_icon-inverse" title="Close"><svg class="slds-button__icon" aria-hidden="true"><use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#close"></use></svg><span class="slds-assistive-text">Close</span></button></div></div>';
                 var messageBodyerrorSlds = '<div class="slds-notify slds-notify_alert slds-theme_alert-texture slds-theme_error" role="alert"><span class="slds-assistive-text">error</span><span class="slds-icon_container slds-icon-utility-error slds-m-right_x-small" title="Description of icon when needed"><svg class="slds-icon slds-icon_x-small" aria-hidden="true"><use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#error"></use></svg></span><h2>Please select one of them and fill the value .</h2></div>';
     
    
                   console.log('error slds ------------------ '+errorSlds);
                 if(currentStep.key === 'step1')
                 {
                    
                 //  var accountSid = $('#accountSID').val();
                 //    var authToken = $('#authToken').val();
                    var e = document.getElementById("authToken");
                    var strSel =  e.options[e.selectedIndex].text;
                       if(strSel !="subscriberKey" )
                       { 
                         document.getElementById("error").innerHTML= errorSlds;
                         connection.trigger('prevStep');
                       }
                       else
                       {
                         document.getElementById("error").innerHTML= "";
                         connection.trigger('nextStep');
                       }
        
                 } else if ( currentStep.key === 'step2')
                 {
                    console.log('in the step 2 ----------------------------- ');
                    var body = $('#messageBody').val();
                    var asid = $('#accountSid').val(); 
                    var capt = $('#authToken').val(); 
                    
                    console.log("captions coming that --- "+ capt);
                    console.log("body--------"+body);
                    console.log("image link----"+ asid);
                        if(body==='' && asid === undefined){
                             document.getElementById("messageBodyNull").innerHTML = messageBodyerrorSlds;
                                 console.log('body coming null '+ body);
                                 console.log('image linkk'+ asid);
                                  connection.trigger('ready');
                         }else {
                            console.log('coming to else part');
                            connection.trigger('nextStep');
                            save();
                            
                        }
                        
                    
                    // if(body == "" )
                    // {
                    //     // document.getElementById("messageBodyNull").innerHTML = messageBodyerrorSlds;
                    //     // console.log('body coming null '+ body);
                    //      connection.trigger('ready');
                    // }
                   
        
                    //  else 
                    // {
                        
                       //  document.getElementById("richtextvalue").innerHTML =body;
                       //  document.getElementById("test1").innerHTML =body;
                         //document.getElementById("test1").innerHTML =body;
                         //content = document.getElementById("richtext").value;
                       
                  //  }
                    
                }
                //&& steps[3].active === false
                // else if ((currentStep.key === 'step3' )) 
                // {
                //         // console.log("in the step three ");  
                //         // document.getElementById("test1").innerHTML =content;
                //        // var bod = $('#richtextvalue').val();
                //         // if (!bod){
                //         //     console.log("in the if ");
                //         //     document.getElementById("messageBody").innerHTML =bod;
                //         // }
                    

                //     save();
                // }
                else {
                         console.log("else part me aarha h ");
                        connection.trigger('nextStep');
                }
         }
        
      
        function onClickedBack (){
            connection.trigger('prevStep');
    
        }                   
    
        function onGotoStep(step){
            
            showStep(step);
            connection.trigger('ready');
    
        }
    
       function showStep(step , stepIndex) {
            console.log('in the showstep function ');
            if (stepIndex && !step) {
                step = steps[stepIndex-1];
            }
    
    
            currentStep = step;
            console.log('the current step -------------'+currentStep);
            $('.step').hide();
            
            switch(currentStep.key) {
                case 'step1':
                    $('#step1').show();
                    console.log("---------------------------------------------------------------------------------------------------------------->This is step 1");
                     connection.trigger('updateButton', {
                      button: 'next',
                         text: 'next',
                      visible: true
                        //enabled: Boolean(getMessage())
                    });
                    break;
                    case 'step2':
                        $('#step2').show();
                        console.log("---------------------------------------------------------------------------------------------------------------->This is step 2");
                         connection.trigger('updateButton', {
                             button: 'back',
                             visible: true
                         });
                             connection.trigger('updateButton', {
                            button: 'next',
                            text: 'Done',
                            visible: true
                        });
    
                        // connection.trigger('updateButton', {
                        //     button: 'next',
                        //     text: 'Done',
                        //     visible: true
                        // });
                        break;
                       // case 'step3':
                    // $('#step3').show();
                    //     console.log("---------------------------------------------------------------------------------------------------------------->This is step 3");
                    //             connection.trigger('updateButton', {
                    //             button: 'back',
                    //             visible: true
                    //     });
                    //     connection.trigger('updateButton', {
                    //         button: 'next',
                    //         text: 'Done',
                    //         visible: true
                    //         });
                    //     break;
                        // case 'step4':
                        //     $('#step4').show();
                        //     console.log("---------------------------------------------------------------------------------------------------------------->This is step 4");
                       
                        // break;
                    } 
                }
    

    function save() {
         //   console.log($('#imge').val());
        var accountSid = $('#imge').val();
        var authToken = $('#captions').val();
        var messagingService = $('#sele').val();
        var body = $('#messageBody').val();
        //var sele = $('#sele').val();

      //  console.log("vlaue in sele"+ sele);
       // console.log("in the save option "+ body);
        
        payload['arguments'].execute.inArguments = [{
            "accountSid": accountSid,
            "authToken": authToken,
            "messagingService": messagingService,
            "body": body,
          
            "to": "{{Contact.Attribute.telegramActivity.subscriberKey}}" ,//<----This should map to your data extension name and phone number column
           
        }];       
        payload['metaData'].isConfigured = true;
        console.log("Payload on SAVE function: "+JSON.stringify(payload));
        connection.trigger('updateActivity', payload);

    }                    

});