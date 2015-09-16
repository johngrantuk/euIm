Template.variableData.helpers({
  selectedTopic: function() {
    Session.setDefault('selectedTopic', "Please select a topic from options above.");
    return Session.get("selectedTopic");
  },

  selectedVariable: function() {
    Session.setDefault('selectedVariable', "Please select a variable from options above.");
    return Session.get("selectedVariable");
  },

  selectedQuestion: function(){
    return Session.get("question");
  },

  selectedCountries: function(){
    return Countries.find({isSelected: true});
  }
});
