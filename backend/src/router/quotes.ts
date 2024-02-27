import express from 'express'
import { isAuthenticated, isOwner } from '../middlewares';
import { getAllQuotes, deleteQuoteFromUser, updateQuote, createNewQuote, getQuotesFromUser } from '../controllers/quotes';
// import Quote from '../db/quotes'

export default (router: express.Router) => {
router.get('/api/quotes', isAuthenticated, getAllQuotes);
router.post('/api/quotes', createNewQuote);
router.get('/api/quotes/:id', getQuotesFromUser);
router.delete('/api/quotes/:id', async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    const { quote } = req.body; 
  
    try {
      const result = await deleteQuoteFromUser(id, quote);
  
      if (result.modifiedCount === 0) {
        return res.status(404).json({ message: 'Quote not found or already deleted' });
      }
  
      res.json({ message: 'Quote successfully deleted' });
    } catch (error) {
      console.error('Error deleting the quote:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

}