import express from 'express';
import { getQuotes, createQuote, updateQuoteById, getQuotesByUserId } from '../db/quotes';
import User, { getUserById } from '../db/users';


export const getAllQuotes = async (req: express.Request, res: express.Response) => {
    try {
        const quotes = await getQuotes();
        return res.status(200).json(quotes);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};

export const deleteQuoteFromUser = async (userId: string, quoteToDelete: string) => {
  try {
    const result = await User.updateOne(
      { _id: userId },
      { $pull: { quotes: quoteToDelete } }
    );

    if (result.modifiedCount === 0) {
      console.log('No changes made. Quote may not have existed in the user\'s quotes array.');
    } else {
      console.log('Quote successfully deleted.');
    }

    return result;
  } catch (error) {
    console.error('Error deleting the quote:', error);
    throw error; 
  }
};


export const updateQuote = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if (!updateData.text) {
            return res.status(400).send("Quote text is required");
        }

        const updatedQuote = await updateQuoteById(id, updateData);
        if (!updatedQuote) {
            return res.sendStatus(404);
        }
        return res.status(200).json(updatedQuote);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};


export const createNewQuote =  async (req: express.Request, res: express.Response) => {
    try {
        const { userId, quote } = req.body;
        const user = await User.findById(userId);
        if (!user) {
        return res.status(404).json({ message: 'User not found' });
        }
        user.quotes.push(quote);
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
   
export const getQuotesFromUser = async (req: express.Request, res: express.Response) =>{
    try {
        const { id } = req.params;

        const quote = await getQuotesByUserId(id);
        const user = await getUserById(id);
        if (!quote) {
            return res.status(400).json({ message: 'Quotes Not Found '})
        }
        if (!user) {
            return res.status(400).json({ message: 'User not Found'});
        }

        return res.status(200).json(quote).end();
    } catch (error) {
        return res.status(500).json({ error: error.message });

    }
}