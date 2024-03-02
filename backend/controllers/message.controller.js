// import Conversation from "../models/conversation.model.js";
// import Message from "../models/message.model.js";

// export const sendMessage = async (req, res) => {
//   try {
//     const { message } = req.body;
//     const { id: receiverId } = req.params;
//     const senderId = req.user._id;

//     let conversation = await Conversation.findOne({
//       perticipants: { $all: [senderId, receiverId] },
//     });
//     if (!conversation) {
//       conversation = await Conversation.create({
//         participants: [senderId, receiverId], // Ensure senderId and receiverId are correct
//       });
//     }

//     const newMessage = new Message({
//       senderId,
//       receiverId,
//       message,
//     });
//     if (newMessage) {
//       // Just before saving the newMessage
//       // await newMessage.save();

//       // Push the newMessage's _id to the conversation.messages array
//       conversation.messages.push(newMessage._id);

//       // Save the updated conversation
//       //await conversation.save();
//     }
//     // this will run parallel
//     await Promise.all([conversation.save(), newMessage.save()]);
//     res.status(201).json(newMessage);
//   } catch (error) {
//     console.log("error in message send controller: ", error);
//     res.status(500).json({ error: "internal server error" });
//   }
// };

// export const getMessages = async (req, res) => {
//   try {
//     const { id: userToChatId } = req.params;
//     const senderId = req.user._id;

//     const conversation = await Conversation.findOne({
//       participants: { $all: [senderId, userToChatId] },
//     }).populate("messages");

//     res.status(200).json(conversation.messages);
//   } catch (error) {
//     console.log("error in message send controller: ", error);
//     res.status(500).json({ error: "internal server error" });
//   }
// };

import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId], // Ensure senderId and receiverId are correct
        messages: [], // Initialize messages array for the new conversation
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    await Promise.all([conversation.save(), newMessage.save()]);
    conversation.messages.push(newMessage._id);
    await conversation.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("error in sendMessage controller: ", error);
    res.status(500).json({ error: "internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json([]);
    }

    const messages = conversation.messages;
    res.status(200).json(messages);
  } catch (error) {
    console.log("error in getMessages controller: ", error);
    res.status(500).json({ error: "internal server error" });
  }
};
