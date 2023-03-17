function sendWelcomeMail(customer) {
  //Zugriff auf die SendInBlue API
  var SibApiV3Sdk = require("sib-api-v3-sdk");
  var defaultClient = SibApiV3Sdk.ApiClient.instance;

  var apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey = "hier wird der API Key hinterlegt";

  var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  // hier werden die Daten für die Mail definiert
  sendSmtpEmail = {
    to: [
      {
        email: customer.email,
        name: customer.name + " " + customer.surname,
      },
    ],
    //hier wird die ID der Vorlage angegeben
    templateId: 59,
    params: {
      name: customer.name,
      surname: customer.surname,
    },
    headers: {
      "X-Mailin-custom":
        "custom_header_1:custom_value_1|custom_header_2:custom_value_2",
    },
  };
  // hier wird die Mail versendet
  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data) {
      console.log("API called successfully. Returned data: " + data);
    },
    function (error) {
      console.error(error);
    }
  );
}
