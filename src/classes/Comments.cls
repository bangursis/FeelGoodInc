public class Comments {
	@AuraEnabled
    public static void addAReply(String jsonReply){
        system.debug(jsonReply);
        Comment__c comment = (Comment__c)Json.deserializeStrict(jsonReply, Comment__c.class);
		
        insert comment;
        System.debug(comment);
    }
}