public class DateEditor {
	@AuraEnabled
    public static Colloquy__c UpsertColloquy(String JsonColl){
        Colloquy__c coll = (Colloquy__c)JSON.deserializeStrict(JsonColl, Colloquy__c.class);
        upsert coll;
        return coll;
    }
}