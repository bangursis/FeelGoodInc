({
	updateIndex : function(component, event, helper) {
        let evt = $A.get("e.c:changeDateIndex");
        evt.setParam("index", event.getSource().get("v.value"));
        evt.fire();
	},
    new : function(component, event){
    	let btns = component.get("v.btns");
    	if(btns == null || btns.length < 1)
        	btns = [];
        let evt = $A.get("e.c:changeDateIndex");
        evt.setParam("index", btns.length);
        evt.fire();
	},
 
 	insertColl : function(component, event){
    	let btns = component.get("v.btns");
    	if (!btns)
            btns = [];
    	let evt = event.getParam("coll");
    	btns.push(evt);
    	component.set("v.btns",btns);
	}
})