Meteor.startup(function () {

  if(Countries.find().count() === 0)                          // Load Countries if empty.
    Eqls.getCountries();

  if(Topics.find().count() === 0){                            // Load Topics if empty.
    var topicResponse = Eqls.getTopics();

    topicResponse.forEach(function(entry) {
      Topics.insert({
        topicId: entry.TopicId,
        topicValue: entry.TopicValue,
        isSelected: false
      });
    });
  }

  if(ImmigrationValues.find().count() === 0){                   // Load immigration values if empty.

    for(i = 1;i < 38;i++){
      ImmigrationValues.insert({
        countryValue: i,
        countryName: "Austria",
        year05: 15,
        year10: 15.2,
        source: "https://en.wikipedia.org/wiki/Immigration_to_Europe"
      });
    }

  }
  //var topicVariables = Eqls.getTopicVariables(2);
});

Meteor.methods({
  UpdateTopicVariables: function(TopicId) {                    // Called when a Topic is clicked. Will update the Variable names and questions for a Topic.

    console.log("\nUpdateTopicVariables()\n");

    TopicVariables.remove({});                                 // Clear old Variables.

    var variableResponse = Eqls.getTopicVariables(TopicId);       // Make API call. Will return an object of variables.

    variableResponse.forEach(function(variable) {

      TopicVariables.insert({
        variableLabel: variable.variableLabel,
        question: variable.question,
        variableId: variable.variableId,
        categories: variable.categories
      });

    });

  },

  UpdateVariableData: function(Variable) {                  // Load data for all categories in data.

    console.log("\nUpdateVariableData(): " + Variable.variableId);

    countries = Countries.find();

    countries.forEach(function(country){

      console.log("Updating Country: " + country.name);

      Variable = Eqls.loadVariableData(Variable, country.categoryValue);

      Countries.update(country._id, {
        $set: {
          variableLabel: Variable.variableLabel,
          question: Variable.question,
          variableId: Variable.variableId,
          categories: Variable.categories
          }
      });


    });
  }
});
