public class Colloqies {
    @AuraEnabled
    public static List<Colloquy__c> getColloqies(){

        return [SELECT Resource__r.Name,Resource__c, Form__c, ColloquyDate__c FROM Colloquy__c];
    }

}