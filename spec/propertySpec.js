const Property = require("../lib/property");

describe('Property', function () {

  beforeEach(function () {
    property = new Property();
  })

  it('has a static method all', function () {
    expect(Property.all).toBeDefined();
  })
})