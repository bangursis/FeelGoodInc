({
	SendReply : function(component) {
		let action = component.get("c.addAReply");
        let jsonReply = {};
        let body = component.find("body").get("v.value");
        jsonReply.Body__c = body;
        jsonReply.Sender__c = component.get("v.sender").Resource__r.Name;
        jsonReply.Resource__c = component.get("v.resource").Id;
        
        action.setParams({
            jsonReply : JSON.stringify(jsonReply)
            
        });
        
        action.setCallback(this, res => {
            let state = res.getState();
            if(state == 'SUCCESS'){
            	jsonReply.CreatedDate = new Date();
            	this.pushToList(component, jsonReply);
        	}
        });
        
        $A.enqueueAction(action);
	},
    
    pushToList: function(component, reply) {
        let replies = component.get("v.replies");
        if (replies == null || replies.length < 1)
            replies = [];
        replies.push(reply);
        component.set("v.replies", replies);
    }
})