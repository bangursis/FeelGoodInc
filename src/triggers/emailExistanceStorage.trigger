trigger emailExistanceStorage on TemporaryStorage__c (before insert, before update) {
    for(TemporaryStorage__c ts : trigger.new){
        List<SObject> sos = new List<SObject>();
        
        sos.addAll([SELECT ID FROM TemporaryStorage__c WHERE Email__c = :ts.Email__c]);
        sos.addAll([SELECT ID FROM Resource__c WHERE Email__c = :ts.Email__c]);
        
        if(sos.size() > 0)
            ts.addError('Someone with provided email exists');
    }

}