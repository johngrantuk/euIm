/*if (Meteor.isServer) {

    Meteor.startup(function () {

      console.log("Settings Test: " + Meteor.settings.twilioAccountSid);

      smtp = {
        username: Meteor.settings.emailUserName,
        password: Meteor.settings.emailPassword,
        server:   Meteor.settings.emailServer,
        port: Meteor.settings.emailPort
      }

      process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;

      if (Meteor.users.find().count() === 0){
        console.log("Startup: Creating Admin Account.");
        Accounts.createUser({username: Meteor.settings.adminUserName, email: Meteor.settings.adminEmail, password: Meteor.settings.adminPassword});
      }

      if(AllBeers.find().count() === 0){
        console.log("Startup: Adding Default Beers.");

        AddBeer("Pentland IPA", "Classic IPA", "3.9");
        AddBeer("Continental Gold", "Golden ale.", "4.8");
        AddBeer("80/", "Scottish Heavy", "4.4");
        AddBeer("Pils", "Czech Lager", "4.7");
        AddBeer("Hollyrood", "Pale Ale", "5");
        AddBeer("Hefe", "Wheat Beer", "5.4");
        AddBeer("First World Problems", "Belgian IPA", "6.2");
        AddBeer("Cascadian East", "APA", "5.4");
        AddBeer("Beach Wear Lager", "Summer Beer", "5.0");
        AddBeer("Peter’s IPA", "New World IPA", "4.7");
        AddBeer("Star of Hope", "Belgian Dubbel", "5.9");
        AddBeer("Perkin Reveler", "Pilgrim Amber Ale", "4.0");
        AddBeer("Arabica Grinding", "Coffee IPA", "5.9");
        AddBeer("Marguerita Red", "US Amber", "4.6");
        AddBeer("Tasty Beer", "Comming soon!", "0");
        AddBeer("Tasty Beer", "Comming soon!", "0");
        AddBeer("Tasty Beer", "Comming soon!", "0");
        AddBeer("Tasty Beer", "Comming soon!", "0");
      }

      if(MobileNos.find().count() === 0){
        console.log("Startup: Adding Phone Number.");

        MobileNos.insert({
          mobileNo: Meteor.settings.adminPhoneNumber,
          submitted: new Date()
        });
      }

    });
}


AddBeer = function(Name, Description, Strength){
  console.log("Add beer")
  AllBeers.insert({
    name: Name,
    strength: Strength,
    description: Description
  });
}
*/
