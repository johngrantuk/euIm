Template.topics.helpers({
  topics: function() {
    return Topics.find();
  }
});

Template.topic.events({
  'click': function () {
    Session.set("selectedTopic", this.topicId);

    Meteor.call('UpdateTopicVariables', this.topicId, function(error, result) {


    });

  }
});

Template.variables.helpers({
  variables: function() {

    return TopicVariables.find();
  }
});
