({
	handleClick : function(component, event, helper) {
        
		let lgn = component.find("lgn").get("v.value");
    	let pass = component.find("pass").get("v.value");

		let action = component.get("c.login");
		action.setParams({
			lgn: lgn,
			pass: pass
		});

		action.setCallback(this, res =>{
			let state = res.getState();

			if(state === 'SUCCESS'){

				let fgiNext = component.getEvent("fgiNext");
				let sign = $A.get("e.c:sign");
				sign.setParam("user", res.getReturnValue());
				sign.fire();
            
            
				fgiNext.setParam("cmpNext", "user");
				fgiNext.fire();
			} else if(state === 'ERROR'){
				let toast = $A.get("e.force:showToast");
				toast.setParams({
                    type: 'error',
                    title: 'Smth went wrong!',
                    message: res.getError()[0].message
                });
                toast.fire();
			}

		});

		$A.enqueueAction(action);
	}
})