Meteor.startup(function () {

  Countries.remove({});
  Topics.remove({});

  Eqls.getCountries();

  var topicResponse = Eqls.getTopics();

  topicResponse.forEach(function(entry) {
    Topics.insert({
      topicId: entry.TopicId,
      topicValue: entry.TopicValue,
      isSelected: false
    });
  });

  var topicVariables = Eqls.getTopicVariables(2);

  console.log(topicVariables);

});

Meteor.methods({
  UpdateTopicVariables: function(VariableId) {

    console.log("\nUpdateTopicVariables()\n");

    TopicVariables.remove({});

    var topicResponse = Eqls.getTopicVariables(VariableId);

    topicResponse.forEach(function(entry) {

      TopicVariables.insert({
        variableLabel: entry.variableLabel,
        data: entry.data,
        categories: entry.categories
        //categoryLabel: entry.categoryLabel
      });

    });

  }
});
