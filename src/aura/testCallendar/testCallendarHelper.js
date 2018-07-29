({
	serialize : function(arr) {
        let events = [];
        arr.forEach(it => {
            let event = {};
			event.title = it.Resource__r.Name;
			event.start = it.ColloquyDate__c;
			event.allDay = true;
			event.id = it.Resource__c;
			events.push(event);
        });
    	return events;
	},
	showCandidate : function(component, event) {
		let viewCandidate = component.get("v.candidate");
		viewCandidate.setParam("candidateId", event.id);
	    viewCandidate.fire();  
    	
		let next =  component.getEvent("fgiNext");
    	next.setParam("cmpNext", "candidate");
        next.fire();
	}
})