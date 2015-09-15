Template.topics.helpers({
  topics: function() {
    return Topics.find();
  }
});

Template.topic.events({
  'click': function () {
    Session.set("selectedTopic", this.topicValue);

    $('#collapseTwo').collapse('hide');


    Meteor.call('UpdateTopicVariables', this.topicId, function(error, result) {

      $('#collapseThree').collapse('show');
      Session.set("isLoading", false);
    });

  }
});

Template.variables.helpers({
  variables: function() {

    return TopicVariables.find();
  }
});

Template.variables.events({
  'click': function () {

    Session.set("selectedVariable", this.variableLabel);
    $('#collapseThree').collapse('hide');
    Session.set("isLoading", true);

    Meteor.call('UpdateVariableData', this, function(error, result) {                       // Loads the data for selected variable.

      var series = [];
      var question = "?";

      countries = Countries.find({}, {limit: 3});                                           // Find countries that are selected.

      countries.forEach(function(country){                                                  // Iterate each country.

        //console.log(country.name);

        immigrationData = ImmigrationValues.findOne({countryValue: country.categoryValue}); // Find the immigration data for the country.

        country.categories.forEach(function(category){                                      // For country iterate each category.

          //console.log(category.CategoryLabel);
          var data = [];                                                                    // Empty data array.
          var total = 1;                                                                    // Total value for calculating %.

          category.categoryData.forEach(function(record){                                   // For category iterate each data entry. year/freq

            //console.log(record.year);

            if(record.year == 2007){                                                        // Check for matching immigration data.
              immigration = immigrationData.year05;
              total = country.categoryTotal07;
            }
            else if(record.year == 2011){
              immigration = immigrationData.year10;
              total = country.categoryTotal11;
            }
            else{
              //console.log("1: ")                                                            // Default immigration to 1 if no data.
              immigration = 1;
            }

            percentage = (record.freq/total) * 100;

            data.push([percentage, record.year, immigration]);                             // Add freq, year and immigration to data array.
          });

          series.push({                                                                     // Push data into series.
            name: category.CategoryLabel,
            color: country.color,
            data: data,
            tooltip: {
              headerFormat: '<b>' + country.name + '</b>',
              pointFormat: '<br>{series.name} {point.x:.2f}% of respondents<br>Immigration:{point.z}% of population'
            }
          })

          question = country.question;

        });

      });

      var chartObj = {

        chart: {
             type: 'bubble',
             zoomType: 'xy'
         },
         yAxis: {
           title: {
             text: "Year"
           }
         },
         xAxis: {
           title: {
             text: "Percent of Responses"
           }
         },
         title: {
             text: question
         },
         legend: {
            enabled: false
        },
         series: series
      }

      $('#collapseFour').collapse('show');
      Session.set("GraphObj", chartObj);
      Session.set("isLoading", false);
    });
  }

})

Template.variableData.helpers({
  selectedTopic: function() {
    Session.setDefault('selectedTopic', "Please select a topic from options above.");
    return Session.get("selectedTopic");
  },

  selectedVariable: function() {
    Session.setDefault('selectedVariable', "Please select a variable from options above.");
    return Session.get("selectedVariable");
  }
});
