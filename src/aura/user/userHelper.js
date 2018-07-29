({
	updateUser : function(component, usr, name, phone, email) {
		let action = component.get("c.updateUser");
        action.setParams({
            userId: usr,
            name: name,
            phone: phone, 
            email: email
        })
        
        action.setCallback(this, res => {
            let state = res.getState();
            if(state === 'SUCCESS'){
            	let toast = $A.get("e.force:showToast");
				toast.setParams({
	                type: 'success',
					title: 'User is succesfully updated'
				});
				toast.fire();
        	} else {
            	let toast = $A.get("e.force:showToast");
				toast.setParams({
	                type: 'error',
					title: 'Oops! Smth went wrong'
				});
				toast.fire();
			}
        });

		$A.enqueueAction(action);
	}
})