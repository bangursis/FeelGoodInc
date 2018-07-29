({
    doInit: function(component, event, helper){
        let cand = component.get("v.Candidate");
		helper.serverCall(component, cand);
    },
    handleUploadFinished : function(component, event, helper){
        let file = {};
        file.ContentDocumentId = event.getParam("files")[0].documentId;
        let arr = [file];
        component.set("v.Candidate.ContentDocumentLinks", arr);
    },
    previewFile :  function(component, event, helper){
        $A.get('e.lightning:openFiles').fire({
            recordIds: [component.get("v.Candidate.ContentDocumentLinks[0]").ContentDocumentId]
        });
    }
})