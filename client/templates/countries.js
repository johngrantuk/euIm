Template.countries.helpers({
  countries: function() {
    return Countries.find();
  }
});

Template.country.helpers({
  selected: function () {

    if(this.isSelected)
      return "selected";
    else
      return "";
  }
})

Template.country.events({
  'click': function () {

    console.log(this.name + "isSelected: " + this.isSelected);

    Countries.update(this._id, {          // Change to a method.
      $set: {
        isSelected: !this.isSelected
        }
    });

  }
});
