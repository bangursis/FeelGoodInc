public class Candidats {
	@AuraEnabled
    public static List<Resource__c> retreiveCandidats(){
        return [SELECT Id, Name, Position__c, HR__r.Name, Salary__c, Experience__c, Phone__c, Email__c, Status__c, (SELECT ContentDocumentId FROM ContentDocumentLinks LIMIT 1) FROM Resource__c WHERE Status__c <> 'Hired' ORDER BY CreatedDate DESC];
       
    }
    @AuraEnabled
    public static void deleteCand(String rId){
        delete [SELECT ID from Resource__c WHERE Id = :Id.valueOf(rId)];
    }
}