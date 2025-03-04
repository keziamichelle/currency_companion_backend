import axios from 'axios';
import cheerio from 'cheerio';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { data: html } = await axios.get('https://currencycompanionbackend4.vercel.app/'); // Replace with deployed frontend
    const $ = cheerio.load(html);
    const scrapedData = $('h1').first().text().trim();
    res.status(200).json({ scrapedData });
  } catch (error) {
    console.error('Error scraping website:', error);
    res.status(500).json({ error: 'Failed to scrape website' });
  }
}
