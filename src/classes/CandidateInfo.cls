public class CandidateInfo {
	@AuraEnabled
    public static List<Resource__c> getHrs(){
        return [SELECT Id, Name FROM Resource__c WHERE Position__c = 'HR' AND Status__c = 'Hired'];
    }
    @AuraEnabled
    public static Resource__c updateCand(String name, String position, String HR, String phone, String email, String status, Decimal sallary, Decimal experience,Id rId){
    	List<Resource__c> rss = [SELECT Id, Name,Position__c,HR__c,Phone__c,Email__c,Status__c,Salary__c,Experience__c   FROM Resource__c WHERE Id = :rId LIMIT 1];
        
        if (rss == null || rss.size() < 1){
            rss = new List<Resource__c>();
            rss.add(new Resource__c());
        }
        
        for(Resource__c rs : rss){     
            rs.Name = name;
            rs.Position__c = position;
            rs.HR__c = HR;
            rs.Phone__c = phone;
            rs.Email__c = email;
            rs.Status__c = status;
			rs.Salary__c = sallary;
			rs.Experience__c = experience;
            }
            
                
        upsert rss;
        return rss[0];
    }
}