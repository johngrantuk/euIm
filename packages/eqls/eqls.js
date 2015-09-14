Eqls = {};

Eqls.randomColor = function  () {
    var max = 0xffffff;
    return '#' + Math.round( Math.random() * max ).toString( 16 );
}

Eqls.getCountries = function(){
  if(!Meteor.settings.apiKey)
    throw new Meteor.Error(500, 'Please provide an API key in Meteor.settings');

  var countryResponse = Meteor.http.get(
    "https://api.ukdataservice.ac.uk/V1/datasets/EQLS/topics/1/variables?user_key=" + Meteor.settings.apiKey,
    {
      timeout: 5000,
    }
  );

  if(countryResponse.statusCode === 200){

    countryResponse.data.Variables[0].Categories.forEach(function(entry) {

      Countries.insert({
        name: entry.CategoryLabel,
        categoryId: entry.CategoryId,
        categoryValue: entry.CategoryValue,
        variableId: entry.VariableId,
        isSelected: true,
        variableLabel: "Unknown",
        question: "Unknown",
        variableId: "Unknown",
        categories: [],
        color: Eqls.randomColor()
        });
    });


  }else{
    throw new Meteor.Error(500, "EQLS call failed with error: " + countryResponse.status_txt);
  }

}

Eqls.getTopics = function(){
  if(!Meteor.settings.apiKey)
    throw new Meteor.Error(500, 'Please provide an API key in Meteor.settings');

  var topicResponse = Meteor.http.get(
    "https://api.ukdataservice.ac.uk/V1/datasets/EQLS/topics?user_key=" + Meteor.settings.apiKey,
    {
      timeout: 5000,
    }
  );

  if(topicResponse.statusCode === 200){

    return topicResponse.data.Topics;

  }else{
    throw new Meteor.Error(500, "EQLS call failed with error: " + topicResponse.status_txt);
  }

}

Eqls.getTopicVariables = function(TopicId){                           // Returns variable names, questions and IDs for a topic.

  if(!Meteor.settings.apiKey)
    throw new Meteor.Error(500, 'Please provide an API key in Meteor.settings');

  var variableResponse = Meteor.http.get(
    "https://api.ukdataservice.ac.uk/V1/datasets/EQLS/topics/" + TopicId + "/variables?user_key=" + Meteor.settings.apiKey,
    {
      timeout: 5000,
    }
  );

  if(variableResponse.statusCode === 200){                                 // Succesfull call.

    var variables = [];

    variableResponse.data.Variables.forEach(function(variable) {              // Iterate each topic variable and store basic info and it's cateogries.

      var topicVariable = {
        variableLabel: variable.VariableLabel,
        variableId: variable.VariableId,
        question: variable.Question,
        categories: variable.Categories
      };

      variables.push(topicVariable);

    });

    return variables;

  }else{
    throw new Meteor.Error(500, "EQLS call failed with error: " + variableResponse.status_txt);
  }

}

Eqls.getVariableData = function(VariableId, CountryValue){

  console.log("Eqls.getVariableData(): " + VariableId + ", " + CountryValue);

  var dataResponse = Meteor.http.get(
    "https://api.ukdataservice.ac.uk/V1/datasets/EQLS/TimeseriesFrequency?user_key="  + Meteor.settings.apiKey + "&variableId=" + VariableId + "&filter=2%3A" + CountryValue,
    {
      timeout: 5000,
    }
  );

  if(dataResponse.statusCode === 200){

    var dataArray = [];

    dataResponse.data.TimeSeries.forEach(function(data) {              // Iterate each topic variable and store basic info and it's cateogries.

      dataArray.push({
        year: data.Year,
        freq: data.WeightedFrequency,
        value: data.Value
      });

    });

    return dataArray;

  }else{
    throw new Meteor.Error(500, "EQLS call failed with error: " + topicResponse.status_txt);
  }

}

Eqls.loadVariableData = function(Variable, CountryValue){

  console.log("Eqls.loadVariableData(): " + CountryValue);

  variableData = Eqls.getVariableData(Variable.variableId, CountryValue);            // Get the actual data for the Variable.

  Variable.categories.forEach(function(category) {                     // Iterate each category for topic.

      category.categoryData = [];                                     // Clear old category data.

      variableData.forEach(function(dataEntry) {                      // Check the variableData for data for this category.

        if(dataEntry.value == category.CategoryValue)                 // Check if data matches the catgory.
            category.categoryData.push({                              // If it does then add to category data.
              year: dataEntry.year,
              freq: dataEntry.freq
            });

      });
  });

  return Variable;
}

Eqls.getTopicVariablesOld = function(TopicId){

  if(!Meteor.settings.apiKey)
    throw new Meteor.Error(500, 'Please provide an API key in Meteor.settings');

  var topicResponse = Meteor.http.get(
    "https://api.ukdataservice.ac.uk/V1/datasets/EQLS/topics/" + TopicId + "/variables?user_key=" + Meteor.settings.apiKey,
    {
      timeout: 5000,
    }
  );

  if(topicResponse.statusCode === 200){

    var variables = [];
    var categories =[];
    var categoryData = [];

    topicResponse.data.Variables.forEach(function(entry) {              // Iterate each topic variable and store basic info and it's cateogries.

      variableData = Eqls.getVariableData(entry.VariableId);            // Get the actual data for the Variable.

      categories =[];

      entry.Categories.forEach(function(category) {                     // Iterate each category for topic.

        categoryData = [];

        variableData.forEach(function(dataEntry) {                      // Check the variableData for data for this category.

          if(dataEntry.value == category.CategoryValue)                 // Check if data matches the catgory.
            categoryData.push({                                         // If it does then add to category data.
              year: dataEntry.year,
              freq: dataEntry.freq
            });

        });

        categories.push({
          categoryLabel: category.CategoryLabel,
          categoryValue: category.CategoryValue,
          categoryData: categoryData
        });

      });


      var topicVariable = {
        variableLabel: entry.VariableLabel,
        variableId: entry.VariableId,
        question: entry.Question,
        categories: categories
      };

      variables.push(topicVariable);

    });

    return variables;

  }else{
    throw new Meteor.Error(500, "EQLS call failed with error: " + topicResponse.status_txt);
  }

}
