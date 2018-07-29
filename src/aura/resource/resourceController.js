({
	fire : function(component, event, helper) {
		helper.fireModal(component);
	},
    handleClick: function(component, event, helper) {
        let name = component.find("name").get("v.value");
        let position = component.find("position").get("v.value");
        let phone = component.find("phone").get("v.value");
        let email = component.find("email").get("v.value");
        let sallary = component.find("sallary").get("v.value");
        let experience = component.find("exp").get("v.value"); 
        
		let id = component.get("v.Employee").Id;
        let HR = component.get("v.Employee").HR__c;
        let status = 'Hired';
     
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
        
        
        $A.enqueueAction(action);
    }
})