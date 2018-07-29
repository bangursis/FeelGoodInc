trigger manageUserCreation on AppUser__c (before insert, before update) {
  List<Id> usersId  = new List<Id>();

  for(AppUser__c user : trigger.new){
    Resource__c resource = [SELECT Status__c, Position__c FROM Resource__c WHERE Id = :user.Resource__c LIMIT 1];

    if(resource.Status__c.toLowerCase() != 'hired')
      user.addError('Sorry, but our webresource is for insiders only');

    if(resource.Position__c.toLowerCase() == 'admin' || resource.Position__c.toLowerCase() == 'hr'){
      user.Role__c = resource.Position__c.toLowerCase();
    } else{
        user.Role__c = 'standard';
      }
  }
}