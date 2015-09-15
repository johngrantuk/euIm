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

    ImmigrationValues.insert({
      countryValue: 1,
      countryName: "Austria",
      year05: 15,
      year10: 15.7,
      source: "https://en.wikipedia.org/wiki/List_of_countries_by_immigrant_population"
    });

    ImmigrationValues.insert({
      countryValue: 2,
      countryName: "Belgium",
      year05: 6.9,
      year10: 10.4,
      source: "https://en.wikipedia.org/wiki/List_of_countries_by_immigrant_population"
    });

    ImmigrationValues.insert({
      countryValue: 3,
      countryName: "Bulgaria",
      year05: 1.3,
      year10: 1.2,
      source: "https://en.wikipedia.org/wiki/List_of_countries_by_immigrant_population"
    });

    ImmigrationValues.insert({
      countryValue: 4,
      countryName: "Cyprus",
      year05: 13.89,
      year10: 18.2,
      source: "https://en.wikipedia.org/wiki/List_of_countries_by_immigrant_population"
    });

    ImmigrationValues.insert({
      countryValue: 5,
      countryName: "Czech Republic",
      year05: 4.4,
      year10: 4,
      source: "https://en.wikipedia.org/wiki/List_of_countries_by_immigrant_population"
    });

    ImmigrationValues.insert({
      countryValue: 6,
      countryName: "Germany",
      year05: 11.9,
      year10: 12.31,
      source: "https://en.wikipedia.org/wiki/List_of_countries_by_immigrant_population"
    });

    ImmigrationValues.insert({
      countryValue: 7,
      countryName: "Denmark",
      year05: 7.1,
      year10: 9.9,
      source: "https://en.wikipedia.org/wiki/List_of_countries_by_immigrant_population"
    });

    ImmigrationValues.insert({
      countryValue: 8,
      countryName: "Estonia",
      year05: 15.2,
      year10: 16.4,
      source: "https://en.wikipedia.org/wiki/List_of_countries_by_immigrant_population"
    });

    ImmigrationValues.insert({
      countryValue: 9,
      countryName: "Greece",
      year05: 8.7,
      year10: 8.9,
      source: "https://en.wikipedia.org/wiki/List_of_countries_by_immigrant_population"
    });

    ImmigrationValues.insert({
      countryValue: 10,
      countryName: "Spain",
      year05: 10.8,
      year10: 13.8,
      source: "https://en.wikipedia.org/wiki/List_of_countries_by_immigrant_population"
    });

    ImmigrationValues.insert({
      countryValue: 11,
      countryName: "Finland",
      year05: 3,
      year10: 5.4,
      source: "https://en.wikipedia.org/wiki/List_of_countries_by_immigrant_population"
    });

    ImmigrationValues.insert({
      countryValue: 12,
      countryName: "France",
      year05: 10.2,
      year10: 11.6,
      source: "https://en.wikipedia.org/wiki/List_of_countries_by_immigrant_population"
    });

    ImmigrationValues.insert({
      countryValue: 13,
      countryName: "Hungary",
      year05: 3.1,
      year10: 4.7,
      source: "https://en.wikipedia.org/wiki/List_of_countries_by_immigrant_population"
    });

    ImmigrationValues.insert({
      countryValue: 14,
      countryName: "Ireland",
      year05: 15.9,
      year10: 13.8,
      source: "https://en.wikipedia.org/wiki/List_of_countries_by_immigrant_population"
    });

    ImmigrationValues.insert({
      countryValue: 15,
      countryName: "Italy",
      year05: 4.3,
      year10: 9.4,
      source: "https://en.wikipedia.org/wiki/List_of_countries_by_immigrant_population"
    });

    ImmigrationValues.insert({
      countryValue: 16,
      countryName: "Lithuania",
      year05: 4.8,
      year10: 4.9,
      source: "https://en.wikipedia.org/wiki/List_of_countries_by_immigrant_population"
    });

    ImmigrationValues.insert({
      countryValue: 17,
      countryName: "Luxemborg",
      year05: 37.42,
      year10: 43.3,
      source: "https://en.wikipedia.org/wiki/List_of_countries_by_immigrant_population"
    });

    ImmigrationValues.insert({
      countryValue: 18,
      countryName: "Latvia",
      year05: 19.5,
      year10: 13.8,
      source: "https://en.wikipedia.org/wiki/List_of_countries_by_immigrant_population"
    });

    ImmigrationValues.insert({
      countryValue: 19,
      countryName: "Malta",
      year05: 2.7,
      year10: 8,
      source: "https://en.wikipedia.org/wiki/List_of_countries_by_immigrant_population"
    });

    ImmigrationValues.insert({
      countryValue: 20,
      countryName: "Netherlands",
      year05: 10,
      year10: 11.7,
      source: "https://en.wikipedia.org/wiki/List_of_countries_by_immigrant_population"
    });

    ImmigrationValues.insert({
      countryValue: 21,
      countryName: "Poland",
      year05: 1.8,
      year10: 0.9,
      source: "https://en.wikipedia.org/wiki/List_of_countries_by_immigrant_population"
    });

    ImmigrationValues.insert({
      countryValue: 22,
      countryName: "Portugal",
      year05: 7.2,
      year10: 8.4,
      source: "https://en.wikipedia.org/wiki/List_of_countries_by_immigrant_population"
    });

    ImmigrationValues.insert({
      countryValue: 23,
      countryName: "Romania",
      year05: 0.6,
      year10: 0.9,
      source: "https://en.wikipedia.org/wiki/List_of_countries_by_immigrant_population"
    });

    ImmigrationValues.insert({
      countryValue: 24,
      countryName: "Sweden",
      year05: 12.3,
      year10: 15.9,
      source: "https://en.wikipedia.org/wiki/List_of_countries_by_immigrant_population"
    });

    ImmigrationValues.insert({
      countryValue: 25,
      countryName: "Slovenia",
      year05: 8.3,
      year10: 11.3,
      source: "https://en.wikipedia.org/wiki/List_of_countries_by_immigrant_population"
    });

    ImmigrationValues.insert({
      countryValue: 26,
      countryName: "Slovakia",
      year05: 2.3,
      year10: 1,
      source: "https://en.wikipedia.org/wiki/List_of_countries_by_immigrant_population"
    });

    ImmigrationValues.insert({
      countryValue: 27,
      countryName: "UK",
      year05: 8.9,
      year10: 12.4,
      source: "https://en.wikipedia.org/wiki/List_of_countries_by_immigrant_population"
    });

    ImmigrationValues.insert({
      countryValue: 28,
      countryName: "Turkey",
      year05: 1.8,
      year10: 2.5,
      source: "https://en.wikipedia.org/wiki/List_of_countries_by_immigrant_population"
    });

    ImmigrationValues.insert({
      countryValue: 29,
      countryName: "Croatia",
      year05: 14.5,
      year10: 17.6,
      source: "https://en.wikipedia.org/wiki/List_of_countries_by_immigrant_population"
    });

    ImmigrationValues.insert({
      countryValue: 30,
      countryName: "Macedonia",
      year05: 5.9,
      year10: 6.6,
      source: "https://en.wikipedia.org/wiki/List_of_countries_by_immigrant_population"
    });

    ImmigrationValues.insert({
      countryValue: 31,
      countryName: "Kosovo",
      year05: 1,
      year10: 1,
      source: "https://en.wikipedia.org/wiki/List_of_countries_by_immigrant_population"
    });

    ImmigrationValues.insert({
      countryValue: 32,
      countryName: "Serbia",
      year05: 4.7,
      year10: 5.6,
      source: "https://en.wikipedia.org/wiki/List_of_countries_by_immigrant_population"
    });

    ImmigrationValues.insert({
      countryValue: 33,
      countryName: "Montenegro",
      year05: 4.7,
      year10: 8.2,
      source: "https://en.wikipedia.org/wiki/List_of_countries_by_immigrant_population"
    });

    ImmigrationValues.insert({
      countryValue: 34,
      countryName: "Iceland",
      year05: 7.6,
      year10: 10.7,
      source: "https://en.wikipedia.org/wiki/List_of_countries_by_immigrant_population"
    });

    ImmigrationValues.insert({
      countryValue: 35,
      countryName: "Norway",
      year05: 13.1,
      year10: 13.8,
      source: "https://en.wikipedia.org/wiki/List_of_countries_by_immigrant_population"
    });

  }
});
