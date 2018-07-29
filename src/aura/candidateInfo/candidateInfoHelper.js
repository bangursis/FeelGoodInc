({
	updater : function(component) {
        let name = component.find("name").get("v.value");
        let position = component.find("position").get("v.value");
        let HR = component.find("hr").get("v.value");
        let phone = component.find("phone").get("v.value");
        let email = component.find("email").get("v.value");
        let status = component.find("status").get("v.value");
        let sallary = component.find("salary").get("v.value");
        let experience = component.find("exp").get("v.value");   
		let id = component.get("v.Candidate").Id;
        
        console.log(component.get("v.Hrs")[0]);
        console.log(component.find("hr").get("v.value"));
        
        if(!HR || HR.length < 1)
            HR = component.get("v.isNew")? component.get("v.Hrs")[0].Id :component.get("v.Candidate").HR__c;
        if (!status || status.length < 1)
            status = component.get("v.Candidate").Status__c;
     
        let action = component.get("c.updateCand");
        
        action.setParams({
            name: name,
            position: position,
            HR: HR,
            phone: phone,
            email: email,
            status: status ,
            sallary: parseInt(sallary),
            experience: parseInt(experience),
            rId: id
        });
        
        action.setCallback(this, res => {
            let state = res.getState();
            let isNew = component.get("v.isNew");
            if( state = 'SUCCESS'){
            	if(isNew){
            		this.redirect(component, res.getReturnValue());
            		component.find("overlayLib").notifyClose();
            		
				}	
				else{
                    this.showToast();
                    if(res.getReturnValue().Status__c.toLowerCase() == 'hired'){
                                let evt = $A.get("e.c:hire");
                                evt.setParam("Resource", res.getReturnValue());
                                evt.fire();
                    }
				}
            		
        		    			
			} else{ 
                let evt = $A.get("e.force:showToast");
                evt.setParams({
                    type: 'error',
                    title: 'Error',
                    message: 'Incorrect values'
                });
                
                evt.fire 				
			}
        })
        $A.enqueueAction(action);
	},
    redirect : function(component, res) {
       
		let evt = $A.get("e.c:viewCandidate");
		evt.setParam("candidateId", res.Id);            
	    evt.fire();  
        
        let redirectModal = $A.get("e.c:redirectModal");
        redirectModal.setParam("cmp", "candidate");
		redirectModal.fire();
	},
    
    showToast : function() {
        let evt = $A.get("e.force:showToast");
        evt.setParams({
            type: 'success',
            title: 'Success',
            message: 'User is updated!'
        });
        
        evt.fire
    },
	checkDisabled :function(component){
        let bool = true;
        let arr = [component.find("name"), component.find("position"),  component.find("email")];
        
        bool = arr.reduce((acc, cur) => { return acc && cur.get('v.validity').valid && cur.get("v.value").length > 0}, bool);
        
        component.set("v.disabled", !bool);
    }
})