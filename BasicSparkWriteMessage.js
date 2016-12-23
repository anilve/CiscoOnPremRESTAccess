// Sample code to show how to send a message from a NodeJs application to a Spark room
// Requires the ciscospark Node package https://www.npmjs.com/package/ciscospark
// Sample assumes a room called AnilMediaSenseTest, but can be changed.
// Run the sample using the command
// CISCOSPARK_ACCESS_TOKEN=<Your Token> node BasicSparkWriteMessage.js
// The access token can be found at https://developer.ciscospark.com/


// First define all the required packages
var spark = require('ciscospark');

//Get all the rooms
// Max 1000 rooms in the array. Change number to your choice
spark.rooms.list({max: 1000})
.then(function(rooms)
{
	console.log ('DEBUG: Rooms Found: ', rooms.length );
    for (var i = 0 ; i < rooms.items.length ; i++)
	{
		// Going through teh rooms one by one
		console.log ('DEBUG: Room: ', rooms.items[i].title);

		// Check if you found the room you are looking for. Change the name of the room to yours
        if ( rooms.items[i].title === 'AnilMediaSenseTest' )
		{
			// Room found
			console.log ('DEBUG: Found Room ' );

            // Now write a message out to this room
			return spark.messages.create(
			{
				text: 'I am running now!',
                roomId: rooms.items[i].id
			});
		}
	};
})
.then(function(message)
{
      // Message was sent. You can get details of the message from the message object
	console.log ('DEBUG: Message Sent');
})
// Catch any errors
.catch(function(reason)
{
	console.log ('ERROR: ', reason);
	process.exit(1);
});
