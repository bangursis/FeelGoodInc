public class FgiMessaging {
    public static void Reject(String Name, String email){
        Messaging.SingleEmailMessage message = new Messaging.SingleEmailMessage();
        message.toAddresses = new String[] {email};
        message.optOutPolicy = 'FILTER';
        message.subject = 'Feel Good Inc.: Inverview Results';
        message.plainTextBody = 'Dear ' + Name
            +'\n We appreciate your tendency and hope to see you again as soon as possible, but for the moment we do not need your skills and talents.'
            +'\n With best regards Feel Good Inc.';
        Messaging.SingleEmailMessage[] messages =   new List<Messaging.SingleEmailMessage> {message};
        Messaging.SendEmailResult[] results = Messaging.sendEmail(messages);
    }

    public static void Approved(String Name, String email){
        Messaging.SingleEmailMessage message = new Messaging.SingleEmailMessage();
        message.toAddresses = new String[] {email};
        message.optOutPolicy = 'FILTER';
        message.subject = 'Feel Good Inc.: Inverview Results';
        message.plainTextBody = 'Dear ' + Name
            +'\n We are glad to solemnly declare, that we are interested in you! Our hr will contact you as soon as possible!'
            +'\n With best regards Feel Good Inc.';
        Messaging.SingleEmailMessage[] messages =   new List<Messaging.SingleEmailMessage> {message};
        Messaging.SendEmailResult[] results = Messaging.sendEmail(messages);
    }

    public static void Hired(String Name, String email){
        Messaging.SingleEmailMessage message = new Messaging.SingleEmailMessage();
        message.toAddresses = new String[] {email};
        message.optOutPolicy = 'FILTER';
        message.subject = 'Feel Good Inc. wants you';
        message.plainTextBody = 'Dear ' + Name
            +'\n Our congrats! Since now your are our employee and your soul belongs to us!.'
            +'\n With best regards Feel Good Inc.';
        Messaging.SingleEmailMessage[] messages =   new List<Messaging.SingleEmailMessage> {message};
        Messaging.SendEmailResult[] results = Messaging.sendEmail(messages);
    }
    
    public static void Fire(String email, string Text){
        Messaging.SingleEmailMessage message = new Messaging.SingleEmailMessage();
        message.toAddresses = new String[] {email};
        message.optOutPolicy = 'FILTER';
        message.subject = 'Fire notifyin\'';
        message.plainTextBody = Text;
        Messaging.SingleEmailMessage[] messages =   new List<Messaging.SingleEmailMessage> {message};
        Messaging.SendEmailResult[] results = Messaging.sendEmail(messages);
    }
}