({
	fireModal : function(component) {
	let body;
        
        $A.createComponent("c:firing", {}, 
                           function(content, status){
                               if(status = 'SUCCESS'){
                                   body = content;
                                   body.set("v.Resource", component.get("v.Employee"));
                                   component.find('overlayLib').showCustomModal({
                                       header: "Do you wanna to fire " + component.get("v.Employee").Name + "?",
                                       body: body,
                                       cssClass: "btn",
                                       showCloseButton: true
				})
			}
		});
		
	}
})