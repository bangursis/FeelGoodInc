trigger approvedNotify on Resource__c (after insert) {
  for(Resource__c resource : trigger.new){
      if(resource.Status__c.toLowerCase() != 'hired')
        FgiMessaging.Approved(resource.Name, resource.Email__c);
  }
}