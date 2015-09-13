Eqls = {};

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

    var countries = [];

    countryResponse.data.Variables[0].Categories.forEach(function(entry) {
      //console.log(entry.CategoryLabel);
      countries.push(entry.CategoryLabel);
      Countries.insert({
        name: entry.CategoryLabel,
        categoryId: entry.CategoryId,
        categoryValue: entry.categoryValue,
        variableId: entry.VariableId,
        isSelected: true
      });
    });

    return countries;

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

Eqls.getTopicVariables = function(TopicId){
  console.log("TEST " + TopicId);

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
        categories: categories
      };

      variables.push(topicVariable);

    });

    return variables;

  }else{
    throw new Meteor.Error(500, "EQLS call failed with error: " + topicResponse.status_txt);
  }

}

Eqls.getVariableData = function(VariableId){

  var dataResponse = Meteor.http.get(
    "https://api.ukdataservice.ac.uk/V1/datasets/EQLS/TimeseriesFrequency?user_key="  + Meteor.settings.apiKey + "&variableId=" + VariableId + "&filter=2%3A1",
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
