// Sample code to show how to send a the status of a Finsess install
// as a message to a Spark Space
// Requires the ciscospark Node package https://www.npmjs.com/package/ciscospark
// and requesy NPM package
// Sample assumes a room called JaneDoeFinesse in a Team called Spark On Prem CC
// Run the sample using the command
// CISCOSPARK_ACCESS_TOKEN=<Your Token> node FinesseAPIInterface.js
// The access token can be found at https://developer.ciscospark.com/


// First define all the required packages
var spark = require('ciscospark');
var request = require('request');

var WorkingSpaceId; // ID of the Spark Space that we are working with

function WriteFinesseSystemInfoToSpace(SpaceId)
{
	console.log ('DEBUG: Entering Function to Send Finesse System Info to room.');

	// using the Cisco Spark Sandbox
	request({
			url: 'https://hq-uccx.abc.inc:8445/finesse/api/SystemInfo',
			agentOptions: {
				rejectUnauthorized: false
			} },
			function (error, response, body) {
	  		console.log('error:', error); // Print the error if one occurred
	  		console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	  		console.log('body:', body); // Print the HTML for the Google homepage.

				// Write the body of the response to the Spark space
				spark.messages.create ({
					text: body,
					roomId: SpaceId
				});
	});

}

// Create a fucntion to find the room
function SearchForMyRoom(ListToSearchIn)
{

	console.log ('DEBUG In ListToSearchIn function.');
	// Get all the rooms/spaces
	spark.rooms.list({teamId: ListToSearchIn}).then (function(SpacesInTeam){

		console.log ('DEBUG: Spaces Found: ', SpacesInTeam.length );
		for (var i=0; i < SpacesInTeam.items.length ; i++ )
		{

			console.log ('DEBUG: Space ', SpacesInTeam.items[i].title );

			// Check for hardcoded space JaneDoeFinesse. Change to your own
			if ( SpacesInTeam.items[i].title === 'JaneDoeFinesse' )
			{
				console.log (' DEBUG: Found the space to post in.');
				WorkingSpaceId = SpacesInTeam.items[i].id;
				WriteFinesseSystemInfoToSpace(WorkingSpaceId);
				return ;
			}
		}
	})
}


//Get all the teams
spark.teams.list({max: 1000}).then (function(MyLists){
	// Teams found
	// How Many?

	console.log ('DEBUG: Lists Found: ', MyLists.length );

	// Find the Team space you want
	for ( var i=0; i < MyLists.items.length ; i ++)
	{
		console.log ('DEBUG: List: ', MyLists.items[i].name);

		if ( MyLists.items[i].name === 'Spark On Prem CC')
		{
			console.log ('DEBUG: List Found. Now find space');
			// Found the List we want, now find the rooms in the list
			var MyListId = MyLists.items[i].id;
			SearchForMyRoom(MyListId);

		}
	}

})
