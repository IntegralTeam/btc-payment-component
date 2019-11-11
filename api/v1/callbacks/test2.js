module.exports = async (testArg) => {
  try {
	  console.log(`THIS IS TEST CALLBACK 2 WITH PASSED ARGUMENT:`);
	  console.log(testArg);
  }
  catch (err){
    console.log(err);
  }
};