({
	signUp : function(component, event, helper) {
		let lgn = component.find("lgn").get("v.value");
    	let pass = component.find("pass").get("v.value");
    	let rpass = component.find("rpass").get("v.value");
		let em = component.find("email").get("v.value");
    	let action = component.get("c.Register");

        action.setParams({
            email : em,
            login : lgn,
            password : pass
        });

        action.setCallback(this, res => {
            let state = res.getState();

            if (state === 'ERROR'){
            	let toast = $A.get("e.force:showToast");
							toast.setParams({
				                type: 'error',
			                    title: 'OH! Something went wrong!',
								message: res.getError()[0].message,
							});
							toast.fire();
			} else{
				let fgiNext = component.getEvent("fgiNext");
				let sign = $A.get("e.c:sign");
				sign.setParam("user", res.getReturnValue());
				sign.fire();

				fgiNext.setParam("cmpNext", "user");
				fgiNext.fire();
			}
        	});

			if(rpass !== pass){                
                let toast = $A.get("e.force:showToast");
				toast.setParams({
	                type: 'error',
                    title: 'OH! Something went wrong!',
					message: 'You\ve inserted different password',
				});
				toast.fire();
                
            } else{
                $A.enqueueAction(action);
            	}
            }

	}
)