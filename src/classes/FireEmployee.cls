public class FireEmployee {
	@AuraEnabled
    public static void fire(String rId, String text,  String email){
        FgiMessaging.Fire(email, text);
        
        delete new Resource__c( Id = Id.valueOf(rId));
    }
}