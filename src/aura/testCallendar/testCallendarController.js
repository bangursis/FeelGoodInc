({
    doInit : function(component, event, helper) {
        component.set("v.candidate", $A.get("e.c:viewCandidate"));
    },
	scriptsLoaded : function(component, event, helper) {
        let action= component.get("c.getColloqies");
        let events;
        action.setCallback(this, res => {
            let state = res.getState();
            if(state == 'SUCCESS'){
                jQuery('#calendar').fullCalendar({
                    defaultView: 'month',
            		eventColor:'#ffffff',
            		navLinks: true,
                    header: {
                      left: 'prev today next',
                      center: 'title',
                      right: 'month,agendaWeek'
                    },
            		events: helper.serialize(res.getReturnValue()),
            		eventTextColor:'#16325c',
                      eventClick: function(calEvent, jsEvent, view) {
                    	helper.showCandidate(component, calEvent);                
                      }

                });
        	}
        });
        $A.enqueueAction(action);
        

	}
})