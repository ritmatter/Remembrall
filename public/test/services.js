describe('Services: Authentication Service', function () {
  beforeEach(module('remembrallApp'));

  var Auth, $httpBackend;
  beforeEach(inject(function(_Auth_, _$httpBackend_) {
    Auth = _Auth_;
    $httpBackend = _$httpBackend_;
  }));


});
