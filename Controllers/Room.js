import Room from "../Models/Room.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
    try {
      // Create a new room object using the request body
      const newRoom = new Room(req.body);
  
      // Save the new room to the database
      const savedRoom = await newRoom.save();
  
      // Respond with the saved room object
      res.status(201).json(savedRoom);
    } catch (error) {
      // Pass any errors to the error handling middleware
      next(error);
    }
  };

export const updateRoom = async (req, res, next) => {
    try {
        const updateRoom = await Room.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updateRoom);
    } catch (err) {
        next(err);
    }
};

export const updateRoomAvailability = async (req, res, next) => {
    try {
        await Room.updateOne(
            { "roomNumbers._id": req.params.id },
            {
                $push: {
                    "roomNumbers.$.unavailableDates": req.body.dates
                },
            }
        );
        res.status(200).json("Room status has been updated.");
    } catch (err) {
        next(err);
    }
};

export const deleteRoom = async (req, res, next) => {
    try {
        await Room.findByIdAndDelete(req.params.id);
        res.status(200).json("Room deleted");
    } catch (err) {
        next(err);
    }
}

export const getRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.id)
        res.status(200).json(room)
    } catch (err) {
        next(err)
    }
}

export const getAllRoom = async (req, res, next) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (err) {
        next(err)
    }
}

// export const getRoombyAttribute = async (req, res, next) => {
//     try {
//       const { startDate, endDate, adultCount, childrenCount } = req.query;
  
//       // Query rooms based on provided criteria
//       const availableRooms = await Room.find({
//         "roomNumbers.unavailableDates": {
//           $not: {
//             $elemMatch: {
//               $gte: new Date(startDate),
//               $lte: new Date(endDate),
//             },
//           },
//         },
//         adult: { $gte: adultCount },
//         children: { $gte: childrenCount },
//       });
  
//       res.json(availableRooms);
//     } catch (error) {
//       console.error("Error searching rooms:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   }

  export const getRoombyAttribute = async (req, res, next) => {
    try {
        const { startDate, endDate, adultCount, childrenCount, roomCount } = req.query;

        // Query rooms based on provided criteria
        const availableRooms = await Room.find({
            "roomNumbers.unavailableDates": {
                $not: {
                    $elemMatch: {
                        $gte: new Date(startDate),
                        $lte: new Date(endDate),
                    },
                },
            },
            adult: { $gte: adultCount },
            children: { $gte: childrenCount },
            rooms: { $gte: roomCount } // Query for rooms based on the provided room count
        });

        res.json(availableRooms);
    } catch (error) {
        console.error("Error searching rooms:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

