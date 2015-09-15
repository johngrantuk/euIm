Template.frontPage.helpers({
  dataLoaded: function() {
    return Session.get("isLoading");
  }
});
