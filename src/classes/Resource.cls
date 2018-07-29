public class Resource {
    @AuraEnabled
    public static Resource__c retreiveResource(Id cId){
        return [SELECT Id, Name, Position__c, HR__r.Name, Salary__c, Experience__c, Phone__c, Email__c, Status__c, (SELECT ColloquyDate__c, Form__c FROM Colloquies__r WHERE Resource__c = :cId ORDER BY ColloquyDate__c DESC), (SELECT Body__c, Sender__c, CreatedDate FROM Comments__r WHERE Resource__c = :cId ORDER BY CreatedDate DESC),(SELECT ContentDocumentId FROM ContentDocumentLinks LIMIT 1)  FROM Resource__c WHERE Id = :cId ];
       
    }
}