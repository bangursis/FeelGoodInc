public class AppUsers {
    @AuraEnabled
    public static List<AppUser__c> retreiveUsers(){
        return [SELECT Id, CreatedDate, Login__c, Resource__r.Name, Role__c FROM AppUser__c ORDER BY Role__c ];
    }
}