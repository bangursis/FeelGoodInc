({
	join : function(component, event, helper) {
		let action = component.get("c.addToStorage");
        
        let name = component.find("name").get("v.value");
        let phone = component.find("phone").get("v.value");
        let email = component.find("email").get("v.value");
        let position = component.find("position").get("v.value");
        
        action.setParams({
            inName: name,
            phone: phone,
            email: email,
            position: position
        });
		action.setCallback(this, res => {
	        let state = res.getState();
            let toast = $A.get("e.force:showToast");
                
			if(state === "SUCCESS"){
    
				toast.setParams({            
		        type: 'success',
                title: 'Thx for your interest!',
				message: 'We appreciate your desires & will contact you ASAP'
		    });
            toast.fire();
            
			} else {
		        toast.setParams({
	                type: 'error',
                    title: 'OH! Something went wrong!',
					message: 'Invalid data',
				});
				toast.fire();
				}
            });
            $A.enqueueAction(action);

	}
})