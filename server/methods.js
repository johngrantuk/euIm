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
          categoryTotal07: Variable.categoryTotal07,
          categoryTotal11: Variable.categoryTotal11,
          categories: Variable.categories
          }
      });


    });
  }
});
