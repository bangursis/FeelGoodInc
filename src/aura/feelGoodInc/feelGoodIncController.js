({
	doInit : function(component, event, helper) {
        var url = $A.get('$Resource.fgibg');
        component.set('v.img', url);
    },
	renderBody : function(component, event, helper) {
        let cmpToRender = event.getParam("cmpNext");
        component.set("v.cmp", cmpToRender);
	},
	sign: function (component, event, helper) {
		let userId = event.getParam("user");
		component.set("v.user", userId);
	},
	candidate: function (component, event, helper) {
		let candidateId = event.getParam("candidateId");
		component.set("v.candidateId", candidateId);
	},
    redirectModal : function (component, event, helper) {
        component.set("v.cmp", event.getParam("cmp"));
    },
})