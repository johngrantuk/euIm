Template.topics.helpers({
  topics: function() {
    return Topics.find();
  }
});

Template.topic.events({
  'click': function () {
    Session.set("selectedTopic", this.topicId);
    $('#collapseTwo').collapse('hide');
    $('#collapseThree').collapse('show');

    Meteor.call('UpdateTopicVariables', this.topicId, function(error, result) {});

  }
});

Template.variables.helpers({
  variables: function() {

    return TopicVariables.find();
  }
});

Template.variables.events({
  'click': function () {

    $('#collapseThree').collapse('hide');
    $('#collapseFour').collapse('show');
    Meteor.call('UpdateVariableData', this, function(error, result) {

      var series = [];
      var question = "?";
      countries = Countries.find({}, {limit: 3});

      countries.forEach(function(country){

        country.categories.forEach(function(category){

          var data = [];

          immigrationData = ImmigrationValues.findOne({countryValue: country.categoryValue});

          category.categoryData.forEach(function(record){

            console.log(record.year);
            if(record.year == 2007)
              immigration = immigrationData.year05;
            else if(record.year == 2011)
              immigration = immigrationData.year10;
            else
              immigration = 1;

            data.push([record.freq, record.year, immigration]);
          });


          series.push({
            name: country.name + ": " + category.CategoryLabel,
            color: country.color,
            data: data,
            tooltip: {
              headerFormat: '<b>{series.name},</b>',
              pointFormat: '<b> {point.x}</b>'
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
         title: {
             text: question
         },
         legend: {
            enabled: false
        },
         series: series
      }

      Session.set("GraphObj", chartObj);

    });

  }

})
