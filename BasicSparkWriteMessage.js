// First define all the required packages
var spark = require('ciscospark');

//Get all the rooms
// Max 1000 rooms in the array
spark.rooms.list({max: 1000})
.then(function(rooms)
{
	console.log ('DEBUG: Rooms Found: ', rooms.length );
        for (var i = 0 ; i < rooms.items.length ; i++)
	{
		// Going through teh rooms one by one
		console.log ('DEBUG: Room: ', rooms.items[i].title);

		// Check if you found the room you are looking for
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
	console.log ('DEBUG: Message Sent');
})
// Catch any errors
.catch(function(reason)
{
	console.log ('ERROR: ', reason);
	process.exit(1);
});
