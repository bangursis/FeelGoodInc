({
	fillList : function(component) {
		let action = component.get("c.fillList");
        action.setCallback(this, res => {
			let state = res.getState();            
                
			if(state === "SUCCESS"){
        		component.set("v.records", res.getReturnValue());
        	} else {
				let toast = $A.get("e.force:showToast");
				toast.setParams({            
                    type: 'error',
                    title: 'Smth went wrong!',
                    message: 'Our developers working on it'
                });
                toast.fire();
				}
    			component.set("v.hideSpinner", true);
            });
            $A.enqueueAction(action);
	},
	
	reject: function(component, index){
        let action = component.get("c.reject");
        action.setParam("el", component.get("v.records")[index].Id);
        
        action.setCallback(this, res => {
            let state = res.getState();
            
            if(state === "SUCCESS"){
        		this.remove(component, index);
        	} else {
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
       
    },
	add: function(component, el){
		let body;
        
        $A.createComponent("c:candidateInfo", {}, 
                           function(content, status){
                               if(status = 'SUCCESS'){
                                   body = content;
                                   let obj = component.get("v.records")[el];
                                   body.set("v.Candidate", obj);
                                   body.set("v.isNew", true);
                                   component.find('overlayLib').showCustomModal({
                                       header: "Create a candidate",
                                       body: body,
                                       cssClass: "btn",
                                       showCloseButton: true
				})
			}
		});
    },
        
	remove: function(component, el){
        let records = component.get("v.records");
        let record = records.splice(el, 1);
        component.set("v.records", records);
    }
})