({
    handleClick: function(component, event, helper){
        helper.redirect(component, event.getSource().get("v.name"));
    },
    signOut: function(component, event, helper){
      let signOut = $A.get("e.c:sign");
      signOut.setParam("user", null);
      signOut.fire();

      helper.redirect(component, event.getSource().get("v.name"));
    }
})