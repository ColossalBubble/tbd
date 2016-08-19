 function testFunc(input){
  return input[0];
}



 var assert = chai.assert;

  describe('showErrorMessage', function() {

   it('should work', function() {

    var answer=testFunc([1,2,3,4]);
    assert.equal(answer, 1);
  });
});