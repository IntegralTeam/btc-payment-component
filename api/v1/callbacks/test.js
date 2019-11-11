module.exports = async (testArg) => {
  try {
	  console.log(`THIS IS TEST CALLBACK 1 WITH PASSED ARGUMENT:`);
	  console.log(testArg);
  }
  catch (err){
    console.log(err);
  }
};