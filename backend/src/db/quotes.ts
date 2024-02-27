import mongoose from 'mongoose';
import { getUserById } from './users';

const QuoteSchema = new mongoose.Schema({
    text: { type: String, required: true },
});

export const QuoteModel = mongoose.model('Quote', QuoteSchema);


export const getQuotes = () => QuoteModel.find();
export const getQuoteById = (id: string) => QuoteModel.findById(id);
export const createQuote = (values: Record<string, any>) => new QuoteModel(values).save().then((quote) => quote.toObject());
export const updateQuoteById = (id: string, values: Record<string, any>) => QuoteModel.findByIdAndUpdate(id, values, { new: true });
export const deleteQuoteById = (id: string) => QuoteModel.findOneAndDelete({ _id: id });
export const getQuotesByUserId = async (userId: string) => {
    const user = await getUserById(userId);
    return user ? user.quotes : []; 
  };